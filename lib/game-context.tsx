"use client"

import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
  useRef,
  type ReactNode,
} from "react"
import type { PlayerData, Quest, Mode, CompletedQuest } from "./types"
import { QUESTS, MODE_TO_CATEGORY } from "./quests"
import { ACHIEVEMENTS } from "./achievements"
import {
  loadPlayer,
  savePlayer,
  defaultPlayer,
  applyXp,
  computeStreak,
  todayKey,
  requiredXpForLevel,
} from "./game"
import { playSound } from "./sound"

export interface Notification {
  id: string
  type: "quest" | "achievement" | "level" | "daily"
  title: string
  subtitle?: string
}

interface GameContextValue {
  player: PlayerData
  ready: boolean
  requiredXp: number
  notifications: Notification[]
  generateQuest: (mode: Mode) => Quest
  acceptQuest: (quest: Quest) => void
  abandonQuest: () => void
  completeActiveQuest: () => void
  completeDailyQuest: (questId: number) => void
  toggleSound: () => void
  exportProfile: () => void
  importProfile: (json: string) => boolean
  resetProfile: () => void
  dismissNotification: (id: string) => void
}

const GameContext = createContext<GameContextValue | null>(null)

function randomQuest(mode: Mode, excludeId?: number): Quest {
  const category = MODE_TO_CATEGORY[mode]
  let pool = category ? QUESTS.filter((q) => q.category === category) : QUESTS
  if (excludeId && pool.length > 1) {
    pool = pool.filter((q) => q.id !== excludeId)
  }
  return pool[Math.floor(Math.random() * pool.length)]
}

function pickDailyQuests(): number[] {
  const ids = new Set<number>()
  while (ids.size < 3) {
    ids.add(QUESTS[Math.floor(Math.random() * QUESTS.length)].id)
  }
  return Array.from(ids)
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<PlayerData>(defaultPlayer)
  const [ready, setReady] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const soundRef = useRef(true)
  const playerRef = useRef<PlayerData>(player)

  // Keep a synchronous mirror of the latest player so completion handlers
  // can compute next state once (avoids StrictMode double-invoke side effects).
  useEffect(() => {
    playerRef.current = player
  }, [player])

  // Load on mount + reset daily board if needed
  useEffect(() => {
    const p = loadPlayer()
    const today = todayKey()
    if (!p.daily || p.daily.date !== today) {
      p.daily = {
        date: today,
        questIds: pickDailyQuests(),
        completedIds: [],
        bonusClaimed: false,
      }
    }
    soundRef.current = p.soundEnabled
    playerRef.current = p
    setPlayer(p)
    setReady(true)
  }, [])

  // Persist whenever player changes (after ready)
  useEffect(() => {
    if (ready) savePlayer(player)
  }, [player, ready])

  const pushNotification = useCallback((n: Omit<Notification, "id">) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    setNotifications((prev) => [...prev, { ...n, id }])
    setTimeout(() => {
      setNotifications((prev) => prev.filter((x) => x.id !== id))
    }, 4200)
  }, [])

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((x) => x.id !== id))
  }, [])

  const checkAchievements = useCallback(
    (p: PlayerData): string[] => {
      const newly: string[] = []
      for (const a of ACHIEVEMENTS) {
        if (!p.achievements.includes(a.id) && a.check(p)) {
          newly.push(a.id)
        }
      }
      return newly
    },
    [],
  )

  const generateQuest = useCallback((mode: Mode) => randomQuest(mode), [])

  const acceptQuest = useCallback(
    (quest: Quest) => {
      if (soundRef.current) playSound("accept")
      setPlayer((prev) => ({ ...prev, activeQuest: quest }))
    },
    [],
  )

  const abandonQuest = useCallback(() => {
    setPlayer((prev) => ({ ...prev, activeQuest: null }))
  }, [])

  // Pure: computes next state + the side effects to run exactly once.
  const finalizeCompletion = useCallback(
    (
      prev: PlayerData,
      quest: Quest,
      bonusXp = 0,
    ): { next: PlayerData; notes: Notification[]; sounds: string[] } => {
      const completion: CompletedQuest = {
        quest,
        completedAt: new Date().toISOString(),
        xpEarned: quest.xp,
      }
      const newStreak = computeStreak(prev.lastActiveDate, prev.streak)
      const totalXp = quest.xp + bonusXp
      const { level, xp, leveledUp } = applyXp(prev.level, prev.xp, totalXp)

      let next: PlayerData = {
        ...prev,
        level,
        xp,
        streak: newStreak,
        lastActiveDate: todayKey(),
        completedQuests: [completion, ...prev.completedQuests],
      }

      const newly = checkAchievements(next)
      if (newly.length) {
        next = { ...next, achievements: [...next.achievements, ...newly] }
      }

      const notes: Notification[] = [
        { id: "", type: "quest", title: "QUEST COMPLETED", subtitle: `+${quest.xp} XP` },
      ]
      const sounds: string[] = []
      if (leveledUp) {
        sounds.push("level")
        notes.push({
          id: "",
          type: "level",
          title: "LEVEL UP!",
          subtitle: `You reached level ${level}`,
        })
      }
      newly.forEach((id) => {
        const a = ACHIEVEMENTS.find((x) => x.id === id)
        if (a) {
          sounds.push("achievement")
          notes.push({
            id: "",
            type: "achievement",
            title: "ACHIEVEMENT UNLOCKED",
            subtitle: a.title,
          })
        }
      })

      return { next, notes, sounds }
    },
    [checkAchievements],
  )

  const emit = useCallback(
    (notes: Notification[], sounds: string[]) => {
      sounds.forEach((s) => {
        if (soundRef.current) playSound(s as Parameters<typeof playSound>[0])
      })
      notes.forEach((n) => pushNotification({ type: n.type, title: n.title, subtitle: n.subtitle }))
    },
    [pushNotification],
  )

  const completeActiveQuest = useCallback(() => {
    const prev = playerRef.current
    if (!prev.activeQuest) return
    if (soundRef.current) playSound("complete")
    const quest = prev.activeQuest
    const { next, notes, sounds } = finalizeCompletion(prev, quest)
    const updated = { ...next, activeQuest: null }
    playerRef.current = updated
    setPlayer(updated)
    emit(notes, sounds)
  }, [finalizeCompletion, emit])

  const completeDailyQuest = useCallback(
    (questId: number) => {
      const prev = playerRef.current
      if (!prev.daily) return
      if (prev.daily.completedIds.includes(questId)) return
      const quest = QUESTS.find((q) => q.id === questId)
      if (!quest) return
      if (soundRef.current) playSound("complete")

      const completedIds = [...prev.daily.completedIds, questId]
      const result = finalizeCompletion(prev, quest)
      let next = result.next
      const notes = result.notes
      const sounds = result.sounds
      let daily = { ...next.daily!, completedIds }

      // All three daily quests done -> bonus
      if (completedIds.length === daily.questIds.length && !daily.bonusClaimed) {
        daily = { ...daily, bonusClaimed: true }
        const boosted = applyXp(next.level, next.xp, 500)
        next = { ...next, level: boosted.level, xp: boosted.xp }
        if (!next.achievements.includes("daily-champion")) {
          next = { ...next, achievements: [...next.achievements, "daily-champion"] }
        }
        sounds.push("level")
        notes.push({ id: "", type: "daily", title: "DAILY CHAMPION", subtitle: "+500 XP bonus!" })
      }

      const updated = { ...next, daily }
      playerRef.current = updated
      setPlayer(updated)
      emit(notes, sounds)
    },
    [finalizeCompletion, emit],
  )

  const toggleSound = useCallback(() => {
    setPlayer((prev) => {
      const soundEnabled = !prev.soundEnabled
      soundRef.current = soundEnabled
      if (soundEnabled) playSound("accept")
      return { ...prev, soundEnabled }
    })
  }, [])

  const exportProfile = useCallback(() => {
    const blob = new Blob([JSON.stringify(player, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sidequest-profile.json"
    a.click()
    URL.revokeObjectURL(url)
  }, [player])

  const importProfile = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json)
      const merged = { ...defaultPlayer(), ...parsed }
      const today = todayKey()
      if (!merged.daily || merged.daily.date !== today) {
        merged.daily = {
          date: today,
          questIds: pickDailyQuests(),
          completedIds: [],
          bonusClaimed: false,
        }
      }
      soundRef.current = merged.soundEnabled
      setPlayer(merged)
      return true
    } catch {
      return false
    }
  }, [])

  const resetProfile = useCallback(() => {
    const p = defaultPlayer()
    p.daily = {
      date: todayKey(),
      questIds: pickDailyQuests(),
      completedIds: [],
      bonusClaimed: false,
    }
    setPlayer(p)
  }, [])

  const value: GameContextValue = {
    player,
    ready,
    requiredXp: requiredXpForLevel(player.level),
    notifications,
    generateQuest,
    acceptQuest,
    abandonQuest,
    completeActiveQuest,
    completeDailyQuest,
    toggleSound,
    exportProfile,
    importProfile,
    resetProfile,
    dismissNotification,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error("useGame must be used within GameProvider")
  return ctx
}

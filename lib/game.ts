import type { PlayerData } from "./types"

export const STORAGE_KEY = "sidequest_player_v1"

export function requiredXpForLevel(level: number): number {
  return level * 500
}

export function defaultPlayer(): PlayerData {
  return {
    level: 1,
    xp: 0,
    streak: 0,
    lastActiveDate: null,
    completedQuests: [],
    achievements: [],
    activeQuest: null,
    daily: null,
    soundEnabled: true,
  }
}

export function todayKey(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

export function loadPlayer(): PlayerData {
  if (typeof window === "undefined") return defaultPlayer()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultPlayer()
    const parsed = JSON.parse(raw)
    return { ...defaultPlayer(), ...parsed }
  } catch {
    return defaultPlayer()
  }
}

export function savePlayer(p: PlayerData) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
  } catch {
    // ignore
  }
}

// Apply XP and return new level/xp, plus how many levels gained
export function applyXp(level: number, xp: number, amount: number) {
  let newXp = xp + amount
  let newLevel = level
  let leveledUp = false
  while (newXp >= requiredXpForLevel(newLevel)) {
    newXp -= requiredXpForLevel(newLevel)
    newLevel += 1
    leveledUp = true
  }
  return { level: newLevel, xp: newXp, leveledUp }
}

// Returns the updated streak based on last active date
export function computeStreak(lastActiveDate: string | null, currentStreak: number): number {
  const today = todayKey()
  if (lastActiveDate === today) return currentStreak
  const yesterday = todayKey(new Date(Date.now() - 86400000))
  if (lastActiveDate === yesterday) return currentStreak + 1
  return 1
}

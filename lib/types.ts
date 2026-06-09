export type Category =
  | "Fitness"
  | "Productivity"
  | "Social"
  | "Mindfulness"
  | "Adventure"
  | "Dopamine Detox"
  | "Learning"
  | "Home"
  | "Creativity"
  | "Finance"

export type Rarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY" | "MYTHIC"

export type Mode =
  | "ALL"
  | "FITNESS"
  | "PRODUCTIVITY"
  | "SOCIAL"
  | "MINDFULNESS"
  | "ADVENTURE"
  | "DETOX"
  | "LEARNING"
  | "HOME"
  | "CREATIVITY"
  | "FINANCE"

export interface Quest {
  id: number
  title: string
  description: string
  category: Category
  rarity: Rarity
  xp: number
  difficulty: number // 1-5
}

export interface CompletedQuest {
  quest: Quest
  completedAt: string // ISO date
  xpEarned: number
}

export interface DailyBoard {
  date: string // YYYY-MM-DD
  questIds: number[]
  completedIds: number[]
  bonusClaimed: boolean
}

export interface PlayerData {
  level: number
  xp: number
  streak: number
  lastActiveDate: string | null // YYYY-MM-DD
  completedQuests: CompletedQuest[]
  achievements: string[]
  activeQuest: Quest | null
  daily: DailyBoard | null
  soundEnabled: boolean
}

export interface Achievement {
  id: string
  title: string
  description: string
  check: (p: PlayerData) => boolean
}

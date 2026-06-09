import type { Achievement, PlayerData } from "./types"

function categoryCount(p: PlayerData, category: string) {
  return p.completedQuests.filter((c) => c.quest.category === category).length
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-quest",
    title: "First Quest",
    description: "Complete your very first quest.",
    check: (p) => p.completedQuests.length >= 1,
  },
  {
    id: "level-5",
    title: "Level 5",
    description: "Reach level 5.",
    check: (p) => p.level >= 5,
  },
  {
    id: "level-10",
    title: "Level 10",
    description: "Reach level 10.",
    check: (p) => p.level >= 10,
  },
  {
    id: "level-25",
    title: "Level 25",
    description: "Reach level 25.",
    check: (p) => p.level >= 25,
  },
  {
    id: "quests-10",
    title: "10 Quests Completed",
    description: "Complete 10 quests.",
    check: (p) => p.completedQuests.length >= 10,
  },
  {
    id: "quests-25",
    title: "25 Quests Completed",
    description: "Complete 25 quests.",
    check: (p) => p.completedQuests.length >= 25,
  },
  {
    id: "quests-50",
    title: "50 Quests Completed",
    description: "Complete 50 quests.",
    check: (p) => p.completedQuests.length >= 50,
  },
  {
    id: "quests-100",
    title: "100 Quests Completed",
    description: "Complete 100 quests.",
    check: (p) => p.completedQuests.length >= 100,
  },
  {
    id: "streak-7",
    title: "7-Day Streak",
    description: "Maintain a 7 day streak.",
    check: (p) => p.streak >= 7,
  },
  {
    id: "streak-30",
    title: "30-Day Streak",
    description: "Maintain a 30 day streak.",
    check: (p) => p.streak >= 30,
  },
  {
    id: "touch-grass",
    title: "Touch Grass",
    description: "Complete 5 Adventure quests.",
    check: (p) => categoryCount(p, "Adventure") >= 5,
  },
  {
    id: "productivity-master",
    title: "Productivity Master",
    description: "Complete 10 Productivity quests.",
    check: (p) => categoryCount(p, "Productivity") >= 10,
  },
  {
    id: "detox-hero",
    title: "Detox Hero",
    description: "Complete 5 Dopamine Detox quests.",
    check: (p) => categoryCount(p, "Dopamine Detox") >= 5,
  },
  {
    id: "scholar",
    title: "Scholar",
    description: "Complete 10 Learning quests.",
    check: (p) => categoryCount(p, "Learning") >= 10,
  },
  {
    id: "explorer",
    title: "Explorer",
    description: "Complete 10 Adventure quests.",
    check: (p) => categoryCount(p, "Adventure") >= 10,
  },
  {
    id: "daily-champion",
    title: "Daily Champion",
    description: "Complete all 3 daily quests in one day.",
    check: () => false, // granted manually
  },
]

export const ACHIEVEMENT_MAP = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a]))

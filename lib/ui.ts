import type { Rarity, Category } from "./types"
import {
  Dumbbell,
  ListChecks,
  Users,
  Brain,
  Compass,
  Smartphone,
  BookOpen,
  Home,
  Palette,
  Wallet,
  type LucideIcon,
} from "lucide-react"

export const RARITY_COLOR: Record<Rarity, string> = {
  COMMON: "var(--rarity-common)",
  RARE: "var(--rarity-rare)",
  EPIC: "var(--rarity-epic)",
  LEGENDARY: "var(--rarity-legendary)",
  MYTHIC: "var(--rarity-mythic)",
}

export const RARITY_ORDER: Rarity[] = ["COMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC"]

export const CATEGORY_ICON: Record<Category, LucideIcon> = {
  Fitness: Dumbbell,
  Productivity: ListChecks,
  Social: Users,
  Mindfulness: Brain,
  Adventure: Compass,
  "Dopamine Detox": Smartphone,
  Learning: BookOpen,
  Home: Home,
  Creativity: Palette,
  Finance: Wallet,
}

export const CATEGORY_COLOR: Record<Category, string> = {
  Fitness: "#ff8a5d",
  Productivity: "#5db8ff",
  Social: "#5dffb5",
  Mindfulness: "#c07bff",
  Adventure: "#e0a24a",
  "Dopamine Detox": "#ff6b9d",
  Learning: "#7be0ff",
  Home: "#9aa8a0",
  Creativity: "#ffd25d",
  Finance: "#5dffd2",
}

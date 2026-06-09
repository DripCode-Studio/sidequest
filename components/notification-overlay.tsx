"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useGame } from "@/lib/game-context"
import { Trophy, Star, Zap, CalendarCheck } from "lucide-react"

const ICONS = {
  quest: Zap,
  achievement: Trophy,
  level: Star,
  daily: CalendarCheck,
} as const

const ACCENTS = {
  quest: "var(--accent)",
  achievement: "#ffd25d",
  level: "var(--primary)",
  daily: "var(--accent)",
} as const

export function NotificationOverlay() {
  const { notifications, dismissNotification } = useGame()

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {notifications.map((n) => {
          const Icon = ICONS[n.type]
          const color = ACCENTS[n.type]
          return (
            <motion.button
              key={n.id}
              layout
              initial={{ opacity: 0, y: -24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              onClick={() => dismissNotification(n.id)}
              className="pointer-events-auto flex w-full max-w-sm items-center gap-3 bg-card px-4 py-3 text-left"
              style={{ boxShadow: `0 0 0 2px var(--background), 0 0 0 4px ${color}, 0 0 22px -4px ${color}` }}
            >
              <motion.span
                animate={{ rotate: [0, -12, 12, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="flex h-9 w-9 shrink-0 items-center justify-center"
                style={{ color, boxShadow: `0 0 0 2px ${color}` }}
              >
                <Icon className="h-5 w-5" />
              </motion.span>
              <div className="min-w-0">
                <div className="font-pixel text-[10px] uppercase leading-relaxed" style={{ color }}>
                  {n.title}
                </div>
                {n.subtitle && (
                  <div className="mt-1 font-mono text-lg text-foreground">{n.subtitle}</div>
                )}
              </div>
            </motion.button>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

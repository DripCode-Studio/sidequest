"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useGame } from "@/lib/game-context"
import type { Mode, Quest } from "@/lib/types"
import { QuestCard } from "./quest-card"
import { PixelButton } from "./pixel-button"
import { Dices, RefreshCw, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const MODES: Mode[] = [
  "ALL",
  "FITNESS",
  "PRODUCTIVITY",
  "SOCIAL",
  "MINDFULNESS",
  "ADVENTURE",
  "DETOX",
  "LEARNING",
  "HOME",
  "CREATIVITY",
  "FINANCE",
]

export function QuestGenerator() {
  const { player, generateQuest, acceptQuest } = useGame()
  const [mode, setMode] = useState<Mode>("ALL")
  const [rolled, setRolled] = useState<Quest | null>(null)
  const [rolling, setRolling] = useState(false)
  const hasActive = !!player.activeQuest

  function roll(reroll = false) {
    setRolling(true)
    const next = generateQuest(mode)
    // brief shuffle effect
    setTimeout(() => {
      setRolled(next)
      setRolling(false)
    }, reroll ? 180 : 260)
  }

  return (
    <section aria-labelledby="generator-heading" className="space-y-4">
      <h2 id="generator-heading" className="font-pixel text-[10px] uppercase tracking-wider text-primary">
        ◆ Quest Generator
      </h2>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Quest mode filter">
        {MODES.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "font-pixel text-[8px] uppercase tracking-wider px-2.5 py-2 transition-all border",
              mode === m
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground",
            )}
            aria-pressed={mode === m}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="bg-card p-4 bg-grid" style={{ boxShadow: "0 0 0 2px var(--border)" }}>
        <AnimatePresence mode="wait">
          {rolled && !rolling ? (
            <motion.div
              key={rolled.id}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22 }}
            >
              <QuestCard quest={rolled} />
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-40 flex-col items-center justify-center gap-3 text-center"
            >
              <motion.div
                animate={rolling ? { rotate: [0, 90, 180, 270, 360] } : {}}
                transition={{ duration: 0.45, ease: "linear" }}
              >
                <Dices className="h-10 w-10 text-primary" />
              </motion.div>
              <p className="font-mono text-lg text-muted-foreground">
                {rolling ? "Rolling the dice..." : "Generate a quest to begin your journey"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 flex flex-wrap gap-2">
          {!rolled ? (
            <PixelButton onClick={() => roll(false)} disabled={rolling} className="flex items-center gap-2">
              <Dices className="h-3.5 w-3.5" /> Generate
            </PixelButton>
          ) : (
            <>
              <PixelButton
                variant="accent"
                onClick={() => {
                  if (rolled) acceptQuest(rolled)
                  setRolled(null)
                }}
                disabled={hasActive}
                className="flex items-center gap-2"
                title={hasActive ? "Finish your active quest first" : "Accept this quest"}
              >
                <Check className="h-3.5 w-3.5" /> Accept
              </PixelButton>
              <PixelButton variant="ghost" onClick={() => roll(true)} disabled={rolling} className="flex items-center gap-2">
                <RefreshCw className="h-3.5 w-3.5" /> Re-roll
              </PixelButton>
            </>
          )}
        </div>

        {hasActive && rolled && (
          <p className="mt-3 font-mono text-base text-destructive">
            ! You already have an active quest. Complete or abandon it first.
          </p>
        )}
      </div>
    </section>
  )
}

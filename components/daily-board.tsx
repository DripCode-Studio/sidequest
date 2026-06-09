"use client"

import { motion } from "framer-motion"
import { useGame } from "@/lib/game-context"
import { QUESTS } from "@/lib/quests"
import { QuestCard } from "./quest-card"
import { PixelButton } from "./pixel-button"
import { Check, CalendarDays } from "lucide-react"

export function DailyBoard() {
  const { player, completeDailyQuest } = useGame()
  const daily = player.daily
  if (!daily) return null

  const quests = daily.questIds.map((id) => QUESTS.find((q) => q.id === id)!).filter(Boolean)
  const doneCount = daily.completedIds.length
  const allDone = doneCount === daily.questIds.length

  return (
    <section aria-labelledby="daily-heading" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 id="daily-heading" className="font-pixel text-[10px] uppercase tracking-wider text-primary">
          ◆ Daily Quest Board
        </h2>
        <span className="flex items-center gap-2 font-mono text-base text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          {doneCount}/{daily.questIds.length}
        </span>
      </div>

      {allDone && (
        <div
          className="bg-secondary p-3 text-center font-pixel text-[10px] text-accent text-glow"
          style={{ boxShadow: "0 0 0 2px var(--accent)" }}
        >
          DAILY CHAMPION — +500 XP CLAIMED
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-3">
        {quests.map((quest) => {
          const completed = daily.completedIds.includes(quest.id)
          return (
            <motion.div
              key={quest.id}
              whileHover={completed ? {} : { y: -3 }}
              className="flex flex-col gap-2"
            >
              <QuestCard quest={quest} compact dimmed={completed} />
              <PixelButton
                variant={completed ? "ghost" : "accent"}
                onClick={() => completeDailyQuest(quest.id)}
                disabled={completed}
                className="flex items-center justify-center gap-2"
              >
                <Check className="h-3.5 w-3.5" /> {completed ? "Done" : "Complete"}
              </PixelButton>
            </motion.div>
          )
        })}
      </div>
      <p className="font-mono text-base text-muted-foreground">
        // New quests appear every day at midnight. Clear all 3 for a bonus.
      </p>
    </section>
  )
}

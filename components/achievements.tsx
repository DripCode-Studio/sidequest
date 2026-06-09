"use client"

import { motion } from "framer-motion"
import { useGame } from "@/lib/game-context"
import { ACHIEVEMENTS } from "@/lib/achievements"
import { Lock, Award } from "lucide-react"
import { cn } from "@/lib/utils"

export function Achievements() {
  const { player } = useGame()
  const unlockedCount = player.achievements.length

  return (
    <section aria-labelledby="achievements-heading" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 id="achievements-heading" className="font-pixel text-[10px] uppercase tracking-wider text-primary">
          ◆ Achievements
        </h2>
        <span className="font-mono text-base text-muted-foreground">
          {unlockedCount}/{ACHIEVEMENTS.length}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((a, i) => {
          const unlocked = player.achievements.includes(a.id)
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              className={cn("flex items-center gap-3 bg-card p-3 transition-all", !unlocked && "opacity-55")}
              style={{ boxShadow: unlocked ? "0 0 0 2px var(--accent)" : "0 0 0 2px var(--border)" }}
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center"
                style={{
                  color: unlocked ? "var(--accent)" : "var(--muted-foreground)",
                  boxShadow: `0 0 0 2px ${unlocked ? "var(--accent)" : "var(--border)"}`,
                }}
              >
                {unlocked ? <Award className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
              </span>
              <div className="min-w-0">
                <div
                  className={cn("font-pixel text-[9px] uppercase leading-relaxed", unlocked ? "text-accent" : "text-foreground")}
                >
                  {a.title}
                </div>
                <div className="mt-1 font-mono text-base leading-snug text-muted-foreground">{a.description}</div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

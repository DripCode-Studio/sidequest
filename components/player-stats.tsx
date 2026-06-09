"use client"

import { motion } from "framer-motion"
import { useGame } from "@/lib/game-context"
import { Star, Zap, Flame, Trophy } from "lucide-react"

function StatTile({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  color: string
}) {
  return (
    <div className="flex items-center gap-3 bg-card p-3" style={{ boxShadow: "0 0 0 2px var(--border)" }}>
      <span className="flex h-9 w-9 items-center justify-center" style={{ color, boxShadow: `0 0 0 2px ${color}` }}>
        {icon}
      </span>
      <div className="min-w-0">
        <div className="font-mono text-sm uppercase text-muted-foreground">{label}</div>
        <div className="font-pixel text-xs text-foreground" style={{ color }}>
          {value}
        </div>
      </div>
    </div>
  )
}

export function PlayerStats() {
  const { player, requiredXp } = useGame()
  const pct = Math.min(100, Math.round((player.xp / requiredXp) * 100))

  return (
    <section aria-labelledby="stats-heading" className="space-y-4">
      <h2 id="stats-heading" className="font-pixel text-[10px] uppercase tracking-wider text-primary">
        ◆ Player Stats
      </h2>

      {/* XP bar */}
      <div className="bg-card p-4" style={{ boxShadow: "0 0 0 2px var(--border)" }}>
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center font-pixel text-sm text-primary-foreground"
              style={{ background: "var(--primary)", boxShadow: "0 0 0 2px var(--background), 0 0 0 4px var(--primary)" }}
            >
              {player.level}
            </div>
            <div>
              <div className="font-mono text-base uppercase text-muted-foreground">Level</div>
              <div className="font-pixel text-[10px] text-foreground">RANK {player.level}</div>
            </div>
          </div>
          <div className="text-right font-mono text-lg text-accent text-glow">
            {player.xp} / {requiredXp} XP
          </div>
        </div>

        <div
          className="relative mt-4 h-5 w-full overflow-hidden bg-muted"
          style={{ boxShadow: "inset 0 0 0 2px var(--border)" }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Experience progress"
        >
          <motion.div
            className="h-full bg-accent"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            style={{ boxShadow: "0 0 12px var(--accent)" }}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-base text-foreground mix-blend-difference">
            {pct}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile icon={<Star className="h-4 w-4" />} label="Level" value={player.level} color="var(--primary)" />
        <StatTile icon={<Zap className="h-4 w-4" />} label="Total XP" value={player.xp} color="var(--accent)" />
        <StatTile icon={<Flame className="h-4 w-4" />} label="Streak" value={`${player.streak}d`} color="#ff8a5d" />
        <StatTile
          icon={<Trophy className="h-4 w-4" />}
          label="Quests"
          value={player.completedQuests.length}
          color="#ffd25d"
        />
      </div>
    </section>
  )
}

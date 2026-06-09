"use client"

import { forwardRef } from "react"
import type { Quest } from "@/lib/types"
import { RARITY_COLOR, CATEGORY_ICON, CATEGORY_COLOR } from "@/lib/ui"
import { cn } from "@/lib/utils"

interface QuestCardProps {
  quest: Quest
  compact?: boolean
  dimmed?: boolean
  className?: string
}

export const QuestCard = forwardRef<HTMLDivElement, QuestCardProps>(function QuestCard(
  { quest, compact, dimmed, className },
  ref,
) {
  const rarityColor = RARITY_COLOR[quest.rarity]
  const Icon = CATEGORY_ICON[quest.category]
  const catColor = CATEGORY_COLOR[quest.category]

  return (
    <div
      ref={ref}
      className={cn(
        "relative bg-card p-4 transition-all",
        dimmed && "opacity-50",
        className,
      )}
      style={{
        boxShadow: `0 0 0 2px var(--background), 0 0 0 4px ${rarityColor}, 0 0 18px -6px ${rarityColor}`,
      }}
    >
      {/* corner pips */}
      <span className="pointer-events-none absolute left-0 top-0 h-2 w-2" style={{ background: rarityColor }} />
      <span className="pointer-events-none absolute right-0 top-0 h-2 w-2" style={{ background: rarityColor }} />
      <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2" style={{ background: rarityColor }} />
      <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2" style={{ background: rarityColor }} />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center"
            style={{ boxShadow: `0 0 0 2px ${catColor}`, color: catColor }}
          >
            <Icon className="h-4 w-4" />
          </span>
          <span className="font-mono text-base uppercase tracking-wide" style={{ color: catColor }}>
            {quest.category}
          </span>
        </div>
        <span
          className="font-pixel text-[8px] px-2 py-1 uppercase"
          style={{ color: "var(--background)", background: rarityColor }}
        >
          {quest.rarity}
        </span>
      </div>

      <h3
        className={cn(
          "mt-3 font-pixel uppercase leading-relaxed text-pretty text-foreground",
          compact ? "text-[10px]" : "text-xs",
        )}
      >
        {quest.title}
      </h3>

      {!compact && (
        <p className="mt-2 font-mono text-lg leading-snug text-muted-foreground text-pretty">
          {quest.description}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-1" aria-label={`Difficulty ${quest.difficulty} of 5`}>
          <span className="font-mono text-sm text-muted-foreground">DIFF</span>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="h-2.5 w-2.5"
              style={{ background: i < quest.difficulty ? "var(--primary)" : "var(--muted)" }}
            />
          ))}
        </div>
        <span className="font-pixel text-[10px] text-accent text-glow">+{quest.xp} XP</span>
      </div>
    </div>
  )
})

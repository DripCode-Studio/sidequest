"use client"

import { useMemo, useState } from "react"
import { useGame } from "@/lib/game-context"
import { CATEGORIES } from "@/lib/quests"
import { CATEGORY_ICON, CATEGORY_COLOR } from "@/lib/ui"
import { History as HistoryIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" }) +
    " " +
    d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
}

export function History() {
  const { player } = useGame()
  const [filter, setFilter] = useState<string>("ALL")

  const filtered = useMemo(() => {
    const list = player.completedQuests
    if (filter === "ALL") return list
    return list.filter((c) => c.quest.category === filter)
  }, [player.completedQuests, filter])

  return (
    <section aria-labelledby="history-heading" className="space-y-4">
      <h2 id="history-heading" className="font-pixel text-[10px] uppercase tracking-wider text-primary">
        ◆ Quest History
      </h2>

      <div className="flex flex-wrap gap-2" role="group" aria-label="History filter">
        {["ALL", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "font-mono text-base uppercase px-2.5 py-1 transition-all border",
              filter === c
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground",
            )}
            aria-pressed={filter === c}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div
          className="flex min-h-24 flex-col items-center justify-center gap-2 bg-card p-6 text-center"
          style={{ boxShadow: "0 0 0 2px var(--border)" }}
        >
          <HistoryIcon className="h-7 w-7 text-muted-foreground" />
          <p className="font-mono text-lg text-muted-foreground">No completed quests yet.</p>
        </div>
      ) : (
        <ul className="divide-y divide-border bg-card" style={{ boxShadow: "0 0 0 2px var(--border)" }}>
          {filtered.slice(0, 50).map((c, i) => {
            const Icon = CATEGORY_ICON[c.quest.category]
            const color = CATEGORY_COLOR[c.quest.category]
            return (
              <li key={`${c.quest.id}-${c.completedAt}-${i}`} className="flex items-center gap-3 p-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center" style={{ color, boxShadow: `0 0 0 2px ${color}` }}>
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-mono text-lg text-foreground">{c.quest.title}</div>
                  <div className="font-mono text-sm text-muted-foreground">{formatDate(c.completedAt)}</div>
                </div>
                <span className="shrink-0 font-pixel text-[9px] text-accent text-glow">+{c.xpEarned}</span>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

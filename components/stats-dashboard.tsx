"use client"

import { useMemo } from "react"
import { useGame } from "@/lib/game-context"
import { CATEGORIES } from "@/lib/quests"
import { CATEGORY_COLOR } from "@/lib/ui"
import { todayKey } from "@/lib/game"

const WEEKS = 16 // ~ last 16 weeks
const DAYS = WEEKS * 7

function buildHeatmap(dates: string[]) {
  const counts = new Map<string, number>()
  for (const iso of dates) {
    const key = iso.slice(0, 10)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  const cells: { date: string; count: number }[] = []
  const today = new Date()
  // align to end of current week
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const key = todayKey(d)
    cells.push({ date: key, count: counts.get(key) ?? 0 })
  }
  return cells
}

function heatColor(count: number) {
  if (count === 0) return "var(--muted)"
  if (count === 1) return "rgba(93,255,181,0.35)"
  if (count === 2) return "rgba(93,255,181,0.6)"
  if (count <= 4) return "rgba(93,255,181,0.8)"
  return "var(--accent)"
}

export function StatsDashboard() {
  const { player } = useGame()

  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const c of CATEGORIES) map[c] = 0
    for (const c of player.completedQuests) map[c.quest.category] = (map[c.quest.category] ?? 0) + 1
    return map
  }, [player.completedQuests])

  const maxCat = Math.max(1, ...Object.values(categoryCounts))
  const totalXp = player.completedQuests.reduce((s, c) => s + c.xpEarned, 0)

  const heatmap = useMemo(
    () => buildHeatmap(player.completedQuests.map((c) => c.completedAt)),
    [player.completedQuests],
  )

  // group cells into columns (weeks)
  const columns: { date: string; count: number }[][] = []
  for (let i = 0; i < heatmap.length; i += 7) {
    columns.push(heatmap.slice(i, i + 7))
  }

  return (
    <section aria-labelledby="dashboard-heading" className="space-y-4">
      <h2 id="dashboard-heading" className="font-pixel text-[10px] uppercase tracking-wider text-primary">
        ◆ Statistics
      </h2>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Category chart */}
        <div className="bg-card p-4" style={{ boxShadow: "0 0 0 2px var(--border)" }}>
          <h3 className="font-pixel text-[9px] uppercase text-foreground">Quests by Category</h3>
          <div className="mt-4 space-y-2">
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat]
              const pct = Math.round((count / maxCat) * 100)
              const color = CATEGORY_COLOR[cat]
              return (
                <div key={cat} className="flex items-center gap-2">
                  <span className="w-28 shrink-0 truncate font-mono text-base text-muted-foreground">{cat}</span>
                  <div className="h-4 flex-1 bg-muted">
                    <div
                      className="h-full transition-all"
                      style={{ width: `${pct}%`, background: color, minWidth: count > 0 ? "8px" : "0" }}
                    />
                  </div>
                  <span className="w-6 shrink-0 text-right font-mono text-base text-foreground">{count}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Heatmap */}
        <div className="bg-card p-4" style={{ boxShadow: "0 0 0 2px var(--border)" }}>
          <h3 className="font-pixel text-[9px] uppercase text-foreground">Completion Heatmap</h3>
          <div className="mt-4 flex gap-1 overflow-x-auto pb-2">
            {columns.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((cell) => (
                  <div
                    key={cell.date}
                    className="h-3 w-3 shrink-0"
                    style={{ background: heatColor(cell.count) }}
                    title={`${cell.date}: ${cell.count} quest${cell.count === 1 ? "" : "s"}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 font-mono text-sm text-muted-foreground">
            <span>less</span>
            {[0, 1, 2, 4, 5].map((n) => (
              <span key={n} className="h-3 w-3" style={{ background: heatColor(n) }} />
            ))}
            <span>more</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3">
            <div>
              <div className="font-mono text-sm uppercase text-muted-foreground">Total XP Earned</div>
              <div className="font-pixel text-xs text-accent text-glow">{totalXp}</div>
            </div>
            <div>
              <div className="font-mono text-sm uppercase text-muted-foreground">Best Streak</div>
              <div className="font-pixel text-xs text-primary">{player.streak}d</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

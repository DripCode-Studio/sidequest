"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { toPng } from "html-to-image"
import { useGame } from "@/lib/game-context"
import { QuestCard } from "./quest-card"
import { PixelButton } from "./pixel-button"
import { Check, X, ImageDown, Swords } from "lucide-react"

export function ActiveQuest() {
  const { player, completeActiveQuest, abandonQuest } = useGame()
  const cardRef = useRef<HTMLDivElement>(null)
  const [saving, setSaving] = useState(false)
  const active = player.activeQuest

  async function share() {
    if (!cardRef.current) return
    setSaving(true)
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: "#001b13",
        style: { margin: "0" },
      })
      const a = document.createElement("a")
      a.href = dataUrl
      a.download = `sidequest-${active?.id ?? "card"}.png`
      a.click()
    } catch {
      // ignore
    } finally {
      setSaving(false)
    }
  }

  return (
    <section aria-labelledby="active-heading" className="space-y-4">
      <h2 id="active-heading" className="font-pixel text-[10px] uppercase tracking-wider text-primary">
        ◆ Active Quest
      </h2>

      <AnimatePresence mode="wait">
        {active ? (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-4"
          >
            <div className="p-1">
              <QuestCard ref={cardRef} quest={active} />
            </div>
            <div className="flex flex-wrap gap-2">
              <PixelButton variant="accent" onClick={completeActiveQuest} className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5" /> Complete
              </PixelButton>
              <PixelButton variant="ghost" onClick={share} disabled={saving} className="flex items-center gap-2">
                <ImageDown className="h-3.5 w-3.5" /> {saving ? "Saving..." : "Share"}
              </PixelButton>
              <PixelButton variant="danger" onClick={abandonQuest} className="flex items-center gap-2">
                <X className="h-3.5 w-3.5" /> Abandon
              </PixelButton>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-32 flex-col items-center justify-center gap-3 bg-card p-6 text-center"
            style={{ boxShadow: "0 0 0 2px var(--border)" }}
          >
            <Swords className="h-8 w-8 text-muted-foreground" />
            <p className="font-mono text-lg text-muted-foreground">
              No active quest. Generate and accept one to embark.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

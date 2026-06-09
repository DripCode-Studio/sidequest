"use client"

import { useRef } from "react"
import { useGame } from "@/lib/game-context"
import { Volume2, VolumeX, Download, Upload, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const { player, toggleSound, exportProfile, importProfile, resetProfile } = useGame()
  const fileRef = useRef<HTMLInputElement>(null)

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const ok = importProfile(String(reader.result))
      if (!ok) alert("Invalid profile file.")
    }
    reader.readAsText(file)
    e.target.value = ""
  }

  const iconBtn =
    "flex h-9 w-9 items-center justify-center bg-secondary text-foreground transition-colors hover:bg-muted border border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"

  return (
    <header className="relative border-b-2 border-border bg-grid">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-pixel text-xs text-accent text-glow-strong">{">"}</span>
            <h1 className="font-pixel text-lg leading-relaxed text-primary text-glow sm:text-2xl">
              SIDEQUEST
            </h1>
          </div>
          <p className="mt-2 font-mono text-lg text-muted-foreground">
            // real-life quest board v1.0
          </p>
        </div>

        <div className="flex items-center gap-2" role="toolbar" aria-label="Profile controls">
          <button
            className={cn(iconBtn, player.soundEnabled && "text-accent")}
            onClick={toggleSound}
            aria-label={player.soundEnabled ? "Mute sound" : "Enable sound"}
            title={player.soundEnabled ? "Sound on" : "Sound off"}
          >
            {player.soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          <button className={iconBtn} onClick={exportProfile} aria-label="Export profile" title="Export profile">
            <Download className="h-4 w-4" />
          </button>
          <button
            className={iconBtn}
            onClick={() => fileRef.current?.click()}
            aria-label="Import profile"
            title="Import profile"
          >
            <Upload className="h-4 w-4" />
          </button>
          <button
            className={iconBtn}
            onClick={() => {
              if (confirm("Reset all progress? This cannot be undone.")) resetProfile()
            }}
            aria-label="Reset profile"
            title="Reset profile"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="sr-only"
            onChange={handleImport}
            aria-hidden="true"
          />
        </div>
      </div>
    </header>
  )
}

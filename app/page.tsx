"use client"

import { GameProvider, useGame } from "@/lib/game-context"
import { Header } from "@/components/header"
import { PlayerStats } from "@/components/player-stats"
import { QuestGenerator } from "@/components/quest-generator"
import { ActiveQuest } from "@/components/active-quest"
import { DailyBoard } from "@/components/daily-board"
import { Achievements } from "@/components/achievements"
import { History } from "@/components/history"
import { StatsDashboard } from "@/components/stats-dashboard"
import { NotificationOverlay } from "@/components/notification-overlay"

function Divider() {
  return (
    <div className="my-8 flex items-center gap-3" aria-hidden="true">
      <span className="h-0.5 flex-1 bg-border" />
      <span className="font-pixel text-[8px] text-muted-foreground">◆◆◆</span>
      <span className="h-0.5 flex-1 bg-border" />
    </div>
  )
}

function GameScreen() {
  const { ready } = useGame()

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="font-pixel text-xs text-accent text-glow animate-pulse">LOADING...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen crt-scanlines scanline-sweep">
      <NotificationOverlay />
      <div className="crt-flicker">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <PlayerStats />
            <QuestGenerator />
          </div>

          <Divider />
          <ActiveQuest />

          <Divider />
          <DailyBoard />

          <Divider />
          <StatsDashboard />

          <Divider />
          <Achievements />

          <Divider />
          <History />

          <footer className="mt-12 border-t-2 border-border pt-6 text-center">
            <p className="font-mono text-base text-muted-foreground">
              SIDEQUEST // saved locally on this device // go touch grass
            </p>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <GameProvider>
      <GameScreen />
    </GameProvider>
  )
}

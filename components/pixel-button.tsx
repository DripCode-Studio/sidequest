"use client"

import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

type Variant = "primary" | "accent" | "ghost" | "danger"

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:brightness-110 active:translate-y-0.5 shadow-[4px_4px_0_0_#7a5520]",
  accent:
    "bg-accent text-accent-foreground hover:brightness-110 active:translate-y-0.5 shadow-[4px_4px_0_0_#1f7a52]",
  ghost:
    "bg-secondary text-foreground hover:bg-muted border border-border active:translate-y-0.5",
  danger:
    "bg-destructive text-background hover:brightness-110 active:translate-y-0.5 shadow-[4px_4px_0_0_#7a2020]",
}

export function PixelButton({ variant = "primary", className, children, ...props }: PixelButtonProps) {
  return (
    <button
      className={cn(
        "font-pixel text-[10px] uppercase tracking-wider px-4 py-3 leading-none transition-all duration-100",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:shadow-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Press_Start_2P, VT323, Pixelify_Sans } from 'next/font/google'
import './globals.css'

const pressStart = Press_Start_2P({
  variable: '--font-press-start',
  weight: '400',
  subsets: ['latin'],
})
const vt323 = VT323({
  variable: '--font-vt323',
  weight: '400',
  subsets: ['latin'],
})
const pixelify = Pixelify_Sans({
  variable: '--font-pixelify',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'SideQuest — Real Life RPG Quest Board',
  description:
    'Receive small real-life quests to level up your health, productivity, social life, mindfulness, and growth. A retro RPG quest board.',
}

export const viewport = {
  themeColor: '#001B13',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${pressStart.variable} ${vt323.variable} ${pixelify.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

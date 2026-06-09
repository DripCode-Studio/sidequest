type SoundType = "accept" | "complete" | "level" | "achievement"

let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  return ctx
}

function blip(freq: number, start: number, duration: number, type: OscillatorType = "square") {
  const audio = getCtx()
  if (!audio) return
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, audio.currentTime + start)
  gain.gain.setValueAtTime(0.0001, audio.currentTime + start)
  gain.gain.exponentialRampToValueAtTime(0.18, audio.currentTime + start + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + start + duration)
  osc.connect(gain)
  gain.connect(audio.destination)
  osc.start(audio.currentTime + start)
  osc.stop(audio.currentTime + start + duration)
}

const PATTERNS: Record<SoundType, Array<[number, number, number]>> = {
  // [freq, startOffset, duration]
  accept: [
    [523, 0, 0.08],
    [659, 0.08, 0.1],
  ],
  complete: [
    [523, 0, 0.08],
    [659, 0.08, 0.08],
    [784, 0.16, 0.14],
  ],
  level: [
    [523, 0, 0.09],
    [659, 0.09, 0.09],
    [784, 0.18, 0.09],
    [1046, 0.27, 0.22],
  ],
  achievement: [
    [784, 0, 0.09],
    [988, 0.09, 0.09],
    [1318, 0.18, 0.2],
  ],
}

export function playSound(type: SoundType) {
  const audio = getCtx()
  if (!audio) return
  if (audio.state === "suspended") audio.resume()
  for (const [freq, start, dur] of PATTERNS[type]) {
    blip(freq, start, dur)
  }
}

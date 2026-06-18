export interface BorderGlowSettings {
  animated: boolean
  backgroundColor: string
  borderRadius: number
  colors: [string, string, string]
  coneSpread: number
  edgeSensitivity: number
  fillOpacity: number
  glowColor: string
  glowIntensity: number
  glowRadius: number
}

export const borderGlowDefaults: BorderGlowSettings = {
  animated: false,
  backgroundColor: '#070f07',
  borderRadius: 28,
  colors: ['#c084fc', '#f472b6', '#38bdf8'],
  coneSpread: 25,
  edgeSensitivity: 30,
  fillOpacity: 0.5,
  glowColor: '40 80 80',
  glowIntensity: 1,
  glowRadius: 40,
}

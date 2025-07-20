import { BasePalette, Palette } from "@/types"
import chroma from "chroma-js"

export const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

export function generatePalette(starterPalette: Palette): BasePalette | null {
  const newPalette: BasePalette = {
    name: starterPalette.name,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {},
  }

  for (const level of levels) {
    newPalette.colors[level] = []
  }

  console.log(starterPalette)

  for (const color of starterPalette.colors) {
    const scale = generateScale(color.color, 10).reverse()
    for (const i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i]).css().replace("rgb", "rgba").replace(")", ",1.0)"),
      })
    }
  }

  return newPalette
}

export function getRange(hexColor: string) {
  const end = "#fff"
  return [chroma(hexColor).darken(1.4).hex(), hexColor, end]
}

export function generateScale(hexColor: string, numberOfColors: number) {
  return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors)
}

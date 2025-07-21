import ColorBox from "@/components/color-box/color-box"
import Navbar from "@/components/nav/navbar"
import PaletteFooter from "@/components/palette/palette-footer"
import { Format, Palette as PaletteData } from "@/types"
import { generatePalette } from "@/utils/paletteUtils"
import "rc-slider/assets/index.css"
import { useState } from "react"
import { makeStyles } from "tss-react/mui"
// import Navbar from "../navbar/Navbar"
// import { Format } from "../utils/colorHelper"
// import PaletteFooter from "./PaletteFooter"

interface Props {
  palette: PaletteData
}

export default function Palette({ palette: starterPalette }: Props) {
  const [level, setLevel] = useState(500)
  const [format, setFormat] = useState<Format>("hex")
  const { classes } = useStyles()

  const palette = generatePalette(starterPalette)
  if (!palette) return null

  const colorBoxes = palette.colors[level].map((color) => (
    <ColorBox
      key={color.id}
      background={color[format]}
      name={color.name}
      moreUrl={`/palette/${palette.id}/${color.id}`}
    />
  ))
  return (
    <div className={classes.palette}>
      <div className={"slider"}>
        <Navbar level={level} onChange={changeLevel} handleChange={changeFormat} />
      </div>

      <div className={classes.paletteColors}>{colorBoxes}</div>
      <PaletteFooter paletteName={palette.name} emoji={palette.emoji} />
    </div>
  )

  function changeFormat(value: Format) {
    setFormat(value)
  }

  function changeLevel(newLevel: number | number[]) {
    if (!Array.isArray(newLevel)) setLevel(newLevel)
  }
}

const useStyles = makeStyles()({
  palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  paletteColors: {
    height: "90%",
  },
})

import styleIf from "@/utils/styleIf"
import { Link } from "@inertiajs/react"
import chroma from "chroma-js"
import classNames from "classnames"
import { useState } from "react"
import { makeStyles } from "tss-react/mui"

interface ColorBoxProps {
  background: string
  name: string
  customClasses?: string
  moreUrl?: string
  viewingSinglePalette?: boolean
}

export default function ColorBox({
  name,
  background,
  customClasses,
  moreUrl,
  viewingSinglePalette = false,
}: ColorBoxProps) {
  const [showOverlay, setShowOverlay] = useState(false)
  const isDark = chroma(background).luminance() <= 0.06
  const isLight = chroma(background).luminance() >= 0.7
  const { classes } = useStyles({
    show: showOverlay,
    isDark,
    isLight,
    viewingSinglePalette,
  })

  return (
    <div
      onClick={changeCopyState}
      style={{ background }}
      className={classNames(customClasses, classes.colorBox)}
    >
      <div style={{ background }} className={classes.copyOverlay} />
      <div className={classes.copyMsg}>
        <h1>{"COPIED"}</h1>
        <p className={classes.backgroundText}>{background}</p>
      </div>
      <div>
        <div className={classes.boxContent}>
          <span>{name}</span>
        </div>
        <button className={classes.copyButton}>{"Copy"}</button>
      </div>
      {moreUrl && (
        <Link href={moreUrl} onClick={(e) => e.stopPropagation()}>
          <span className={classes.seeMore}>{"More"}</span>
        </Link>
      )}
    </div>
  )

  async function changeCopyState() {
    setShowOverlay(true)
    setTimeout(() => setShowOverlay(false), 1500)
    await navigator.clipboard.writeText(background)
  }
}

interface StyleProps {
  show: boolean
  isDark: boolean
  isLight: boolean
  viewingSinglePalette: boolean
}

const useStyles = makeStyles<StyleProps>()(
  (theme, { show, viewingSinglePalette, isLight, isDark }) => ({
    colorBox: {
      width: "20%",
      height: viewingSinglePalette ? "50%" : "25%",
      margin: "0 auto",
      display: "inline-block",
      cursor: "pointer",
      position: "relative",
      marginBottom: "-3.5px",
      "&:hover button": {
        opacity: 1,
        transition: "0.5s",
      },
      [theme.breakpoints.down("lg")]: {
        width: "25%",
        height: viewingSinglePalette ? "33.3333%" : "50%",
      },
      [theme.breakpoints.down("md")]: {
        width: "50%",
        height: viewingSinglePalette ? "20%" : "10%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        height: viewingSinglePalette ? "10%" : "10%",
      },
    },
    copyButton: {
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      border: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      color: isLight ? "rgba(0,0,0,0.5)" : "white",
      textTransform: "uppercase",
      opacity: 0,
    },
    seeMore: {
      background: "rgba(255, 255, 255, 0.3)",
      position: "absolute",
      border: "none",
      right: "0px",
      bottom: "0px",
      color: isLight ? "rgba(0,0,0,0.5)" : "white",
      width: "60px",
      height: "30px",
      textAlign: "center",
      lineHeight: "30px",
      textTransform: "uppercase",
    },
    boxContent: {
      position: "absolute",
      width: "100%",
      left: "0px",
      bottom: "0px",
      padding: "10px",
      color: isDark ? "white" : "black",
      textTransform: "uppercase",
      fontSize: "12px",
    },
    copyOverlay: {
      opacity: 0,
      zIndex: 0,
      height: "100%",
      width: "100%",
      transition: "transform 0.6s ease-in-out",
      transform: "scale(0.1)",
      ...styleIf(show, {
        opacity: 1,
        transform: "scale(50)",
        zIndex: 10,
        position: "absolute",
      }),
    },
    copyMsg: {
      position: "fixed",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "3rem",
      transform: "scale(0.1)",
      opacity: 0,
      color: isLight ? "rbga(0,0,0,0.5)" : "white",
      flexDirection: "column",
      "& h1": {
        fontWeight: 400,
        textShadow: "1px 2px black",
        background: "rgba(255, 255, 255, 0.3)",
        width: "100%",
        textAlign: "center",
        marginBottom: 0,
        padding: "1rem",
        textTransform: "uppercase",
        [theme.breakpoints.down("xs")]: {
          fontSize: "5rem",
        },
      },
      ...styleIf(show, {
        opacity: 1,
        transform: "scale(1)",
        zIndex: 25,
        transition: "all 0.4s ease-in-out",
        transitionDelay: "0.3s",
      }),
    },
    backgroundText: {
      fontSize: "2rem",
      fontWeight: 100,
      color: isLight ? "rgba(0,0,0,0.5)" : "white",
    },
  })
)

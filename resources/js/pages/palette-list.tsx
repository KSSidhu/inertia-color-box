import DeletePaletteDialog from "@/components/palette/delete-palette-dialog"
import MiniPalette from "@/components/palette/mini-palette"
import useDisclosure from "@/hooks/use-disclosure"
import bg from "@/lib/assets/bg.svg"
import { Palette } from "@/types"
import { Button } from "@mui/material"
import { useState } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { makeStyles } from "tss-react/mui"

interface Props {
  palettes: Palette[]
  can: {
    createPalette: boolean
  }
}

function PaletteList({ palettes, can }: Props) {
  const [deletingId, setDeletingId] = useState("")
  const { classes } = useStyles()
  const { onOpen, isOpen, onClose } = useDisclosure()

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.header}>{"React Colors"}</h1>
          {can.createPalette ? (
            <Button href={"/palette/new"} variant={"contained"}>
              {"Create New Palette"}
            </Button>
          ) : (
            <Button href={"/login"} variant={"contained"}>
              {"Login"}
            </Button>
          )}
        </nav>
        {palettes.length && (
          <TransitionGroup className={classes.palettes}>
            {palettes.map((palette) => (
              <CSSTransition key={palette.id} classNames={"fade"} timeout={500}>
                <MiniPalette {...palette} onDelete={setDeleteId} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </div>
      <DeletePaletteDialog
        isOpen={isOpen}
        onClose={closeDialog}
        deletingId={deletingId}
      />
    </div>
  )

  function setDeleteId(id: string) {
    setDeletingId(id)
    onOpen()
  }

  function closeDialog() {
    setDeletingId("")
    onClose()
  }
}

const useStyles = makeStyles()((theme) => ({
  "@global": {
    ".fade-exit": {
      opacity: 1,
    },
    ".fade-exit-active": {
      opacity: 0,
      transition: "opacity 500ms ease-out",
    },
  },
  root: {
    backgroundColor: "#2F30AA",
    backgroundImage: `url(${bg})`,
    /* background by SVGBackgrounds.com */
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "scroll",
    padding: theme.spacing(3),
  },
  header: {
    fontSize: "2rem",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    [theme.breakpoints.down("xl")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "75%",
    },
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "2.5rem",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 50%)",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(1, 100%)",
      gridGap: "1rem",
    },
  },
}))

export default PaletteList

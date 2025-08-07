import ColorPickerForm from "@/components/color-form/color-picker-form"
import DraggableColorList from "@/components/draggable/draggable-color-list"
import PaletteFormNav from "@/components/palette/palette-form.nav"
import { PaletteFormProvider } from "@/context/palette-form-context"
import { Palette, Visibility } from "@/types"
import defaultColors from "@/utils/defaultColors"
import { DragEndEvent, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { useForm } from "@inertiajs/react"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import { Button, Divider, Drawer, IconButton, Typography } from "@mui/material"
import classNames from "classnames"
import { InertiaFormProps } from "node_modules/@inertiajs/react/types/useForm"
import { useState } from "react"
import { makeStyles } from "tss-react/mui"

export const drawerWidth = 400

export type NewColor = {
  name: string
  color: string
}

const MAX_COLORS = 20
type PaletteState = Omit<Palette, "id"> & {
  visibility: Visibility
}
export type PaletteFormState = InertiaFormProps<PaletteState>

export default function PaletteForm() {
  const { classes } = useStyles()
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const form = useForm<PaletteState>({
    name: "",
    colors: [],
    emoji: "",
    visibility: "private",
  })

  const paletteIsFull = form.data.colors.length >= MAX_COLORS

  return (
    <PaletteFormProvider>
      <div className={classes.root}>
        <PaletteFormNav
          form={form}
          open={open}
          onDrawerOpen={handleDrawerOpen}
          onSubmit={handleSubmit}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.colorPickerContainer}>
            <Typography variant={"h4"} gutterBottom>
              {"Design Your Palette"}
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant={"contained"}
                className={classes.button}
                color={"error"}
                onClick={clearPalette}
              >
                {"Clear Palette"}
              </Button>
              <Button
                variant={"contained"}
                color={"primary"}
                className={classes.button}
                disabled={paletteIsFull}
                onClick={addRandomColor}
              >
                {"Random Color"}
              </Button>
            </div>
            <ColorPickerForm form={form} paletteIsFull={paletteIsFull} />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            form={form}
            deleteColor={deleteColor}
            handleDragEnd={handleDragEnd}
            handleDragCancel={handleDragCancel}
            handleDragStart={handleDragStart}
          />
        </main>
      </div>
    </PaletteFormProvider>
  )

  function clearPalette() {
    form.setData({
      ...form.data,
      colors: [],
    })
  }

  function addRandomColor() {
    const allColors = defaultColors
    let rand
    let randomColor: NewColor = {
      name: "",
      color: "",
    }
    // Keep checking through colors until we get a non-used one
    let isDup = true
    while (isDup) {
      rand = Math.floor(Math.random() * allColors.length)
      randomColor = allColors[rand]
      isDup = form.data.colors.some((color) => color.name === randomColor.name)
    }

    if (randomColor.color.length)
      form.setData({
        ...form.data,
        colors: [...form.data.colors, randomColor],
      })
    // setColors((prevColors) => [...prevColors, randomColor])
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = form.data.colors
        .map((color) => color.name)
        .indexOf(active.id.toString())
      const newIndex = form.data.colors
        .map((color) => color.name)
        .indexOf((over?.id || "").toString())

      const newColors = arrayMove(form.data.colors, oldIndex, newIndex)

      form.setData({
        ...form.data,
        colors: newColors,
      })
    }

    setActiveId(null)
  }

  function handleDragCancel() {
    setActiveId(null)
  }

  function deleteColor(colorName: string) {
    form.setData({
      ...form.data,
      colors: form.data.colors.filter((color) => color.name !== colorName),
    })
  }

  function handleDrawerOpen() {
    setOpen(true)
  }

  function handleDrawerClose() {
    setOpen(false)
  }

  function handleSubmit() {
    // if (!form.data.emoji || !form.data.name) {
    //   console.log("Missing emoji or palette name")
    //   return
    // }

    form.post("/create")
  }
}

const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
  buttons: {
    width: "100%",
  },
  button: {
    width: "50%",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...(theme.mixins.toolbar as React.CSSProperties),
    justifyContent: "flex-end",
  },
  colorPickerContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))

import { PaletteFormState } from "@/pages/palette-form"
import { Button, FormLabel } from "@mui/material"
import { FormEvent, useEffect, useState } from "react"
import { ChromePicker, ColorResult } from "react-color"
import { makeStyles } from "tss-react/mui"
import { Input } from "../ui/input"

interface ColorPickerFormProps {
  paletteIsFull: boolean
  form: PaletteFormState
}

export default function ColorPickerForm({ paletteIsFull, form }: ColorPickerFormProps) {
  const [newColorName, setNewColorName] = useState("")
  const [currentColor, setCurrentColor] = useState("teal")
  const [errorMessage, setErrorMessage] = useState("")
  const { classes } = useStyles()

  useEffect(() => {
    setErrorMessage("")
  }, [newColorName])

  return (
    <div className={classes.root}>
      <ChromePicker
        className={classes.picker}
        color={currentColor}
        onChangeComplete={handleColorChange}
      />
      <FormLabel error={Boolean(errorMessage.length)}>{"Color Name"}</FormLabel>
      <Input
        name={"newColorName"}
        type={"text"}
        value={newColorName}
        onChange={handleNameChange}
      />
      {Boolean(errorMessage.length) && (
        <span className={classes.error}>{errorMessage}</span>
      )}
      <Button
        className={classes.addColor}
        variant={"contained"}
        // type={"submit"}
        onClick={handleAddColor}
        color={"primary"}
        style={{ backgroundColor: currentColor }}
        disabled={paletteIsFull}
      >
        {paletteIsFull ? "Palette Full" : "Save Color"}
      </Button>
    </div>
  )

  function handleAddColor() {
    if (!newColorName.trim().length) {
      setErrorMessage("Color name is required")
      return
    }

    const uniqueColorName = form.data.colors.every(
      (color) => color.name.toLowerCase() !== newColorName.toLowerCase()
    )
    if (!uniqueColorName) {
      setErrorMessage("Color name must be unique")
      return
    }

    const uniqueColor = form.data.colors.every((color) => color.color !== currentColor)
    if (!uniqueColor) {
      setErrorMessage("Cannot add an existing color")
      return
    }

    form.setData({
      ...form.data,
      colors: [
        ...form.data.colors,
        {
          name: newColorName,
          color: currentColor,
        },
      ],
    })
    setNewColorName("")
  }

  function handleNameChange(evt: FormEvent<HTMLInputElement>) {
    if (evt.currentTarget.name === "newColorName")
      setNewColorName(evt.currentTarget.value)
  }

  function handleColorChange(newColor: ColorResult) {
    setCurrentColor(newColor.hex)
  }
}

const useStyles = makeStyles()((theme) => ({
  root: {
    width: "100%",
  },
  picker: { width: "100% !important", marginTop: "2rem" },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem",
  },
  colorInput: {
    width: "100%",
    height: "70px",
  },
  error: {
    color: theme.palette.error.light,
  },
}))

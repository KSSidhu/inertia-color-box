import { PaletteFormState } from "@/pages/palette-form"
import { Button, FormLabel } from "@mui/material"
import { FormEvent, useState } from "react"
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
  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <ChromePicker
        className={classes.picker}
        color={currentColor}
        onChangeComplete={handleColorChange}
      />
      <FormLabel>{"Color Name"}</FormLabel>
      <Input
        name={"newColorName"}
        type={"text"}
        value={newColorName}
        onChange={handleNameChange}
      />
      {/*      <ValidatorForm onSubmit={handleAddColor} instantValidate={false}>
        <TextValidator
          name={"newColorName"}
          value={newColorName}
          className={classes.colorInput}
          onChange={handleNameChange}
          placeholder={"Color Name"}
          variant={"filled"}
          margin={"normal"}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Color name is required",
            "Color name must be unique",
            "Cannot add an existing color",
          ]}
        />
      </ValidatorForm> */}

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
    if (!newColorName.trim().length) return

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

const useStyles = makeStyles()({
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
})

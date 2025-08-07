import { stepType, usePaletteForm } from "@/context/palette-form-context"
import { Visibility } from "@/types"
import { usePage } from "@inertiajs/react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material"
import { FormEvent } from "react"
import { PaletteFormState } from "./palette-form"

interface PaletteMetaFormProps {
  onSubmit: () => void
  form: PaletteFormState
}

export default function PaletteMetaForm({ form, onSubmit }: PaletteMetaFormProps) {
  const { step, onClose } = usePaletteForm()
  const { errors } = usePage().props

  return (
    <>
      <Dialog open={checkStep("emoji")} onClose={onClose}>
        <DialogTitle id={"form-dialog-title"}>{"Choose a Palette Emoji"}</DialogTitle>

        {/* <Picker  onSelect={handleEmojiSelect} theme={"light"} /> */}
      </Dialog>
      <Dialog
        open={checkStep("form")}
        onClose={onClose}
        aria-labelledby={"form-dialog-title"}
      >
        <DialogTitle id={"form-dialog-title"}>{"Enter a Palette Name"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Please enter a unique name for your palette."}
          </DialogContentText>
          <TextField
            id={"palette-name"}
            error={Boolean(errors.name?.length)}
            value={form.data.name}
            helperText={errors.name}
            onChange={handleNameChange}
          />

          <RadioGroup
            defaultValue={form.data.visibility}
            onChange={handleVisibilityChange}
          >
            <FormControlLabel value={"private"} control={<Radio />} label={"Private"} />
            <FormControlLabel
              value={"public"}
              control={<Radio />}
              label={"Public"}
            />{" "}
          </RadioGroup>

          <DialogActions>
            <Button onClick={onClose} color={"primary"}>
              {"Cancel"}
            </Button>
            <Button
              variant={"contained"}
              color={"primary"}
              type={"submit"}
              onClick={handleSubmit}
            >
              {"Save Palette"}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )

  function checkStep(formStep: stepType) {
    return step === formStep
  }

  function handleNameChange(
    evt: FormEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) {
    if (!evt?.currentTarget.value) return
    // setNewPaletteName(evt.currentTarget.value)
    form.setData({
      ...form.data,
      name: evt.currentTarget.value,
    })
  }

  function handleSubmit() {
    onSubmit()
    if (errors) {
      return
    }
    onClose()
  }

  function handleVisibilityChange(_: React.ChangeEvent<HTMLInputElement>, value: string) {
    form.setData({
      ...form.data,
      visibility: value as Visibility,
    })
  }
}

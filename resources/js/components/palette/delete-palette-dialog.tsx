import { useForm } from "@inertiajs/react"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material"
import { blue, red } from "@mui/material/colors"
import { makeStyles } from "tss-react/mui"

interface Props {
  deletingId?: string
  isOpen: boolean
  onClose: () => void
}

export default function DeletePaletteDialog({ deletingId, isOpen, onClose }: Props) {
  const { classes } = useStyles()
  const form = useForm<{ paletteId: string }>({
    paletteId: deletingId || "",
  })

  return (
    <Dialog open={isOpen}>
      <DialogTitle>{"Delete this palette?"}</DialogTitle>
      <List>
        <Button onClick={removePalette} className={classes.confirm}>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
              <CheckIcon />
            </Avatar>
          </ListItemAvatar>
          <span>{"Delete"}</span>
        </Button>
        <ListItemButton onClick={onClose}>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
              <CloseIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>{"Cancel"}</ListItemText>
        </ListItemButton>
      </List>
    </Dialog>
  )

  function removePalette() {
    if (!deletingId) return
    // Don't preserve state to force reload
    form.delete(`/palette/${deletingId}`, {
      preserveState: false,
    })
    onClose()
  }
}

const useStyles = makeStyles()((theme) => ({
  confirm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(2),
    width: "100%",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      cursor: "pointer",
    },
  },
}))

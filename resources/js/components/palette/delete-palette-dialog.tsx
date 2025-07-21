import { Link } from "@inertiajs/react"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import {
  Avatar,
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

  return (
    <Dialog open={isOpen}>
      <DialogTitle>{"Delete this palette?"}</DialogTitle>
      <List>
        <Link
          onClick={removePalette}
          href={`/palette/${deletingId}`}
          method={"delete"}
          className={classes.confirm}
        >
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
              <CheckIcon />
            </Avatar>
          </ListItemAvatar>
          <span>{"Delete"}</span>
        </Link>
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
    onClose()
  }
}

const useStyles = makeStyles()((theme) => ({
  confirm: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    width: "100%",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      cursor: "pointer",
    },
  },
}))

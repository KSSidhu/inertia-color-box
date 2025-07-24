import { usePaletteForm } from "@/context/palette-form-context"
import { drawerWidth, PaletteFormState } from "@/pages/palette-form"
import PaletteMetaForm from "@/pages/palette-meta-form"
import { Link } from "@inertiajs/react"
import { ChevronRight } from "@mui/icons-material"
import {
  AppBar,
  Button,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material"
import classNames from "classnames"
import { makeStyles } from "tss-react/mui"

interface PaletteFormNavProps {
  open: boolean
  onDrawerOpen: () => void
  onSubmit: () => void
  form: PaletteFormState
}

export default function PaletteFormNav({
  open,
  form,
  onDrawerOpen,
  onSubmit,
}: PaletteFormNavProps) {
  const { openNameForm } = usePaletteForm()
  const { classes } = useStyles()
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color={"default"}
        position={"fixed"}
        sx={{ flexDirection: "row" }}
        classes={{
          root: classNames(classes.appBar, {
            [classes.appBarShift]: open,
          }),
        }}
      >
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onDrawerOpen}
            sx={{
              marginLeft: "16px",
              display: open ? "none" : "inline-flex",
            }}
          >
            <ChevronRight />
          </IconButton>
          <Typography variant="h6" noWrap>
            {"Create a Palette"}
          </Typography>
        </Toolbar>
        <div className={classes.navButtons}>
          <Link href={"/"}>
            <Button variant={"contained"} color={"secondary"}>
              {"Go Back"}
            </Button>
          </Link>
          <Button variant={"contained"} color={"primary"} onClick={openNameForm}>
            {"Save Palette"}
          </Button>
        </div>
      </AppBar>
      <PaletteMetaForm onSubmit={onSubmit} form={form} />
    </div>
  )
}

const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "64px",

    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px) !important`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  navButtons: {
    marginRight: theme.spacing(3),
    display: "flex",
    gap: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      marginRight: 0,
    },
  },
}))

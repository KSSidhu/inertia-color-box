// import DeleteIcon from "@mui/icons-material/Delete"
import { Palette } from "@/types"
import { makeStyles } from "tss-react/mui"

type MiniPaletteProps = Palette & {
  onDelete: (id: string) => void
}

function MiniPalette(props: MiniPaletteProps) {
  const { name, emoji, colors } = props
  // const navigate = useNavigate()
  const { classes } = useStyles()

  const minicolorBoxes = colors.map((color) => (
    <div
      key={`${color.name}-${color.color}`}
      className={classes.miniBox}
      style={{ backgroundColor: color.color }}
    />
  ))

  return (
    <div className={classes.root}>
      {/* <DeleteIcon
        onClick={removePalette}
        className={classes.deleteIcon}
        sx={{
          transition: "all 0.3s ease-in-out",
        }}
      /> */}
      <div className={classes.colours}>{minicolorBoxes}</div>
      <h5 className={classes.title}>
        {name}
        <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  )

  // function removePalette(e: MouseEvent<SVGSVGElement>) {
  //   e.stopPropagation()
  //   onDelete(id)
  //   // deletePalette(id)
  // }

  // function goToPalette() {
  //   navigate(`/palette/${id}`)
  // }
}

const useStyles = makeStyles()({
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    height: "fit-content",
    cursor: "pointer",
    "&:hover svg": {
      opacity: 1,
    },
  },
  colours: {
    backgroundColor: "#dae1e4",
    height: "150px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative",
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
  },
  miniBox: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-3.5px",
  },
  deleteIcon: {
    color: "white",
    backgroundColor: "#eb3d30",
    width: "20px",
    height: "20px",
    position: "absolute",
    right: 0,
    top: 0,
    padding: "10px",
    zIndex: 10,
    opacity: 0,
  },
})

export default MiniPalette

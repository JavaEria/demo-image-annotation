import React, { useState, useContext } from "react"
import {
  Grid,
  Paper,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  Button,
  withStyles
} from "@material-ui/core"
import moment from "moment"
import CanvasContext from "../context/CanvasContext"
import ConfigContext from "../context/ConfigContext"

const styles = () => ({
  paper: {
    transform: "scale(1.0)",
    margin: 20,
    padding: 16,
    width: "70%"
  },
  block: {
    borderTop: "none",
    borderBottom: " 24px solid transparent",
    borderLeft: "none",
    borderRight: " 24px solid #fff",
    left: "-18px",
    top: "0",
    zIndex: " -1",
    position: "absolute",
    height: "0",
    width: "0"
  },
  arrow: {
    borderRight: "18px solid #fff",
    borderTop: "none",
    borderLeft: "none",
    borderBottom: "18px solid transparent",
    position: "absolute",
    height: "0",
    width: "0",
    top: "0"
  },
  buttonGroups: {
    marginTop: 8
  },
  cancelButton: {
    marginLeft: 16
  }
})

function NewCommentItem({ commentContext, onSubmit, classes }) {
  const [comment, setComment] = useState("")
  const configContext = useContext(ConfigContext)
  const canvasContext = useContext(CanvasContext)
  const username = configContext.username ? configContext.username : ""
  const imageAvatar = configContext.imageAvatar ? configContext.imageAvatar : ""

  function handleComment() {
    canvasContext.addCurrentDrawnRect()
    commentContext.addCommentsList(
      comment,
      canvasContext.currentDrawnRect,
      username,
      imageAvatar,
      onSubmit
    )

    commentContext.setIsNewComment(false)
  }

  function handleClose() {
    commentContext.setCommentTimestamp(moment().unix())
    canvasContext.setRectTimestamp(moment().unix())
    commentContext.setIsNewComment(false)
  }

  return (
    <>
      <Paper
        className={classes.paper}
        square={true}
        elevation={12}
        varient="outlined"
      >
        <div className={classes.block}>
          <div className={classes.arrow}></div>
        </div>

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar src={imageAvatar} alt={username} />
          </ListItemAvatar>
          <ListItemText primary={username} />
        </ListItem>
        <Grid container justify="center">
          <TextField
            fullWidth
            variant="outlined"
            value={comment}
            size="small"
            onChange={(event) => {
              setComment(event.target.value)
            }}
            placeholder="Add your comment here.."
          />
        </Grid>
        <Grid container justify="flex-start" className={classes.buttonGroups}>
          <Button variant="contained" color="primary" onClick={handleComment}>
            Comment
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={classes.cancelButton}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Grid>
      </Paper>
    </>
  )
}

export default withStyles(styles)(NewCommentItem)

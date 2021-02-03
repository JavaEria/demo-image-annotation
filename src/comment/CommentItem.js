import React, { useState, useEffect, useContext } from "react"
import {
  Grid,
  Paper,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Button,
  withStyles
} from "@material-ui/core"
import SaveEdit from "../common/SaveEdit"
import VertMenu from "../common/VertMenu"
import ReplySection from "./ReplySection"
import moment from "moment"

import ConfigContext from "../context/ConfigContext"
import CommentContext from "../context/CommentContext"
import CanvasContext from "../context/CanvasContext"

const styles = () => ({
  itemHighlight: {
    transform: "scale(1.02)"
  },
  paper: {
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
  }
})

function CommentItem({
  imageAvatar,
  username,
  createdAt,
  comment,
  selected,
  rectId,
  replies,
  onResolve,
  onDelete,
  onEditComment,
  onAddReply,
  onEditReply,
  onDeleteReply,
  classes
}) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [editComment, setEditComment] = useState(comment)
  const [editable, setEditable] = useState(false)
  const commentContext = useContext(CommentContext)
  const canvasContext = useContext(CanvasContext)
  const configContext = useContext(ConfigContext)
  const ref = React.createRef()

  function handleMenuItemClick(event, index, options) {
    if (options[index] === "Delete") {
      commentContext.deleteComment(rectId)
      onDelete({ rectId: rectId })
      canvasContext.deleteRect(rectId)
      commentContext.setCommentTimestamp(moment().unix())
      setEditable(false)
    } else if (options[index] === "Edit") {
      setEditable(true)
    }
    setSelectedIndex(index)
  }

  useEffect(() => {
    if (selected) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    }
  }, [selected, ref])

  return (
    <>
      <Paper
        className={`${selected ? classes.itemHighlight : ""} ${classes.paper}`}
        square={true}
        elevation={12}
        varient="outlined"
        ref={ref}
      >
        {selected ? (
          <div className={classes.block}>
            <div className={classes.arrow}></div>
          </div>
        ) : (
          <></>
        )}
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar src={imageAvatar} alt={username} />
          </ListItemAvatar>
          <ListItemText
            primary={username ? username : ""}
            secondary={
              <Typography component="span" variant="body2">
                {createdAt ? createdAt : ""}
              </Typography>
            }
          />
          {/* //.format("MMMM Do, h:mm a") */}
          <ListItemSecondaryAction>
            {configContext.isResolvable ? (
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  if (rectId) {
                    commentContext.deleteComment(rectId)
                    canvasContext.deleteRect(rectId)
                    onResolve({ rectId: rectId })
                  }
                }}
              >
                Resolve
              </Button>
            ) : (
              <></>
            )}
            {configContext.isEditable ? (
              <VertMenu
                selectedIndex={selectedIndex}
                handleMenuItemClick={handleMenuItemClick}
              />
            ) : (
              <></>
            )}
          </ListItemSecondaryAction>
        </ListItem>
        {!editable ? (
          <Grid container justify="flex-start">
            <Typography variant="caption">{comment}</Typography>
          </Grid>
        ) : (
          <SaveEdit
            editValue={editComment}
            handleChange={(event) => {
              setEditComment(event.target.value)
            }}
            handleSave={() => {
              const newComment = commentContext.editComment(rectId, editComment)

              commentContext.setCommentTimestamp(moment().unix())
              onEditComment(newComment)
              setEditable(false)
            }}
            handleCancel={() => {
              setEditable(false)
            }}
          />
        )}
        <ReplySection
          imageAvatar={imageAvatar}
          username={username}
          selected={selected}
          rectId={rectId}
          replies={replies}
          onAddReply={onAddReply}
          onEditReply={onEditReply}
          onDeleteReply={onDeleteReply}
        />
      </Paper>
    </>
  )
}

export default withStyles(styles)(CommentItem)

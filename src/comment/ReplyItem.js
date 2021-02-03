import React, { useState, useContext } from "react"
import {
  Grid,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography
} from "@material-ui/core"
import moment from "moment"
import SaveEdit from "../common/SaveEdit"
import VertMenu from "../common/VertMenu"

import CommentContext from "../context/CommentContext"
import ConfigContext from "../context/ConfigContext"

function ReplyItem({
  rectId,
  replyIndex,
  replyObject,
  onEditReply,
  onDeleteReply
}) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [editable, setEditable] = useState(false)
  const [editReply, setEditReply] = useState(
    replyObject ? replyObject.reply : ""
  )
  const commentContext = useContext(CommentContext)
  const configContext = useContext(ConfigContext)

  function handleMenuItemClick(event, index, options) {
    if (options[index] === "Delete") {
      const replyId = commentContext.deleteReply(replyIndex, rectId)
      onDeleteReply({ replyId: replyId })
      commentContext.setCommentTimestamp(moment().unix())
      setEditable(false)
    } else if (options[index] === "Edit") {
      setEditable(true)
    }
    setSelectedIndex(index)
  }

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src={replyObject.imageAvatar} alt={replyObject.username} />
        </ListItemAvatar>
        <ListItemText
          primary={replyObject.username ? replyObject.username : ""}
          secondary={
            <Typography component="span" variant="body2">
              {replyObject.createdAt
                ? replyObject.createdAt.format("MMMM Do, h:mm a")
                : ""}
            </Typography>
          }
        />
        <ListItemSecondaryAction>
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
          <Typography variant="caption">{replyObject.reply}</Typography>
        </Grid>
      ) : (
        <SaveEdit
          editValue={editReply}
          handleChange={(event) => {
            setEditReply(event.target.value)
          }}
          handleSave={() => {
            const replyObject = commentContext.editReply(
              replyIndex,
              rectId,
              editReply
            )
            onEditReply(replyObject)
            commentContext.setCommentTimestamp(moment().unix())
            setEditable(false)
          }}
          handleCancel={() => {
            setEditable(false)
          }}
        />
      )}
    </>
  )
}

export default ReplyItem

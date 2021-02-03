import React, { useState, useContext } from "react"
import { Grid, Button, TextField, Divider, withStyles } from "@material-ui/core"
import ReplyItem from "./ReplyItem"

import CommentContext from "../context/CommentContext"
import ConfigContext from "../context/ConfigContext"

const styles = () => ({
  buttonGroups: {
    marginTop: 8
  },
  cancelButton: {
    marginLeft: 16
  },
  reply: {
    margin: "20px 0px"
  },
  divider: {
    margin: "20px 0px"
  }
})

function ReplySection({
  selected,
  rectId,
  replies,
  onAddReply,
  onEditReply,
  onDeleteReply,
  classes
}) {
  const [editReply, setEditReply] = useState("")
  const [replyFocused, setReplyFocused] = useState(false)
  const commentContext = useContext(CommentContext)
  const configContext = useContext(ConfigContext)
  return (
    <>
      {replies.length !== 0 ? (
        replies.map((replyObject, index) => (
          <>
            <Divider className={classes.divider} />
            <ReplyItem
              replyIndex={index}
              replyObject={replyObject}
              rectId={rectId}
              key={index}
              onEditReply={onEditReply}
              onDeleteReply={onDeleteReply}
            />
          </>
        ))
      ) : (
        <></>
      )}
      {selected ? (
        <>
          <Grid container justify="flex-start" className={classes.reply}>
            <TextField
              fullWidth
              onFocus={() => {
                setReplyFocused(true)
              }}
              size="small"
              variant="outlined"
              value={editReply}
              onChange={(event) => {
                setEditReply(event.target.value)
              }}
              placeholder="Reply.."
            />
          </Grid>
          {replyFocused ? (
            <Grid
              container
              justify="flex-start"
              className={classes.buttonGroups}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  const replyObject = commentContext.addReply(
                    rectId,
                    editReply,
                    configContext.username,
                    configContext.imageAvatar
                  )
                  setEditReply("")
                  onAddReply(replyObject)
                  setReplyFocused(false)
                }}
              >
                Reply
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.cancelButton}
                onClick={() => {
                  setReplyFocused(false)
                }}
              >
                Cancel
              </Button>
            </Grid>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default withStyles(styles)(ReplySection)

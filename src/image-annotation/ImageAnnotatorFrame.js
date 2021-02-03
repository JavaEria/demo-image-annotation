import React, { useContext, useEffect } from "react"
import ImageAnnotator from "./ImageAnnotator"
import CommentsList from "../comment/CommentsList"
import { Grid } from "@material-ui/core"
import ConfigContext from "../context/ConfigContext"
import CanvasContext from "../context/CanvasContext"
import CommentContext from "../context/CommentContext"

function ImageAnnotatorFrame({
  username,
  imageAvatar,
  imagePreview,
  width,
  height,
  onSubmit,
  onResolve,
  onDelete,
  onEditComment,
  isResolvable,
  isEditable,
  onAddReply,
  onEditReply,
  onDeleteReply,
  commentsList,
  drawedRect,
  strokeStyle
}) {
  const configContext = useContext(ConfigContext)
  const commentContext = useContext(CommentContext)
  const canvasContext = useContext(CanvasContext)

  useEffect(() => {
    configContext.setUsername(username)
    configContext.setImageAvatar(imageAvatar)
    configContext.setIsResolvable(isResolvable)
    configContext.setIsEditable(isEditable)
    configContext.setStrokeStyle(strokeStyle)
  }, [
    username,
    imageAvatar,
    strokeStyle,
    isResolvable,
    isEditable,
    configContext
  ])

  useEffect(() => {
    if (commentsList.length !== 0) {
      commentContext.setInitialCommentList(commentsList)
    }
  }, [commentsList, commentContext])

  useEffect(() => {
    if (drawedRect.length !== 0) {
      canvasContext.setInitialDrawedRect(drawedRect)
    }
  }, [canvasContext, drawedRect])

  return (
    <>
      <Grid
        container
        justify="center"
        style={{
          background: "linear-gradient(to right bottom, #A8A8A8, #888888)",
          position: "fixed"
        }}
      >
        <Grid item md={8} xs={4} sm={4}>
          <ImageAnnotator imagePreview={imagePreview} />
        </Grid>
        <Grid item md={4} xs={8} sm={8}>
          <CommentsList
            onSubmit={onSubmit}
            onResolve={onResolve}
            onDelete={onDelete}
            onEditComment={onEditComment}
            onAddReply={onAddReply}
            onEditReply={onEditReply}
            onDeleteReply={onDeleteReply}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default ImageAnnotatorFrame

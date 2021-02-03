import React from "react"
import ImageAnnotaterFrame from "./ImageAnnotatorFrame"
import CommentContainer from "../context/CommentContainer"
import CanvasContainer from "../context/CanvasContainer"
import ConfigContainer from "../context/ConfigContainer"

function AnnotatorComponent({
  username,
  imageAvatar,
  isResolvable,
  isEditable,
  onSubmit,
  onResolve,
  onDelete,
  onEditComment,
  onAddReply,
  onEditReply,
  onDeleteReply,
  commentsList,
  drawedRect,
  strokeStyle,
  imagePreview
}) {
  return (
    <ConfigContainer>
      <CanvasContainer>
        <CommentContainer>
          <ImageAnnotaterFrame
            username={username}
            imageAvatar={imageAvatar}
            imagePreview={imagePreview}
            onSubmit={onSubmit}
            onResolve={onResolve}
            onDelete={onDelete}
            onEditComment={onEditComment}
            onAddReply={onAddReply}
            onEditReply={onEditReply}
            onDeleteReply={onDeleteReply}
            isResolvable={isResolvable}
            isEditable={isEditable}
            commentsList={commentsList}
            strokeStyle={strokeStyle}
            drawedRect={drawedRect}
          />
        </CommentContainer>
      </CanvasContainer>
    </ConfigContainer>
  )
}

export default AnnotatorComponent

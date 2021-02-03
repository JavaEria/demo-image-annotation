import React, { useContext } from "react"
import { List } from "@material-ui/core"

import CommentItem from "./CommentItem"
import NewCommentItem from "./NewCommentItem"
import CommentContext from "../context/CommentContext"

function CommentsList({
  onSubmit,
  onResolve,
  onDelete,
  onEditComment,
  onAddReply,
  onEditReply,
  onDeleteReply
}) {
  const commentContext = useContext(CommentContext)
  localStorage.setItem("comments", JSON.stringify(commentContext.commentsList))

  return (
    <List style={{ maxHeight: 500, overflowY: "scroll" }}>
      {commentContext.isNewComment ? (
        <NewCommentItem commentContext={commentContext} onSubmit={onSubmit} />
      ) : (
        <></>
      )}
      {commentContext.commentsList.map((item, index) => {
        return (
          <CommentItem
            key={index}
            {...item}
            index={index}
            onResolve={onResolve}
            onDelete={onDelete}
            onEditComment={onEditComment}
            onAddReply={onAddReply}
            onEditReply={onEditReply}
            onDeleteReply={onDeleteReply}
          />
        )
      })}
    </List>
  )
}

export default CommentsList

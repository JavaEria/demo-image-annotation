import React, { useState, useEffect } from "react"
import { CommentProvider } from "./CommentContext"
import moment from "moment"
import { v4 as uuidv4 } from "uuid"

function CommentContainer({ children }) {
  const [isNewComment, setIsNewComment] = useState(false)
  const [initialCommentList, setInitialCommentList] = useState([])
  const [commentsList, setCommentsList] = useState(initialCommentList)
  const [commentTimestamp, setCommentTimestamp] = useState(null)

  useEffect(() => {
    if (initialCommentList.length !== 0) {
      setCommentsList(initialCommentList)
    }
  }, [initialCommentList])

  function deleteComment(rectId) {
    setCommentsList(
      commentsList.filter((comment) => {
        return comment.rectId !== rectId
      })
    )
    setIsNewComment(false)
    setCommentTimestamp(moment().unix())
  }

  function editComment(rectId, newComment) {
    const commentObject = commentsList.find((comment) => {
      return comment.rectId === rectId
    })
    commentObject.comment = newComment
    setCommentTimestamp(moment().unix())
    return commentObject
  }

  function addReply(rectId, reply, username, imageAvatar) {
    const commentObject = commentsList.find((comment) => {
      return comment.rectId === rectId
    })
    const replyObject = {
      replyId: uuidv4(),
      reply: reply,
      createdAt: moment(),
      username: username,
      imageAvatar: imageAvatar
    }
    commentObject.replies.push(replyObject)
    return replyObject
  }

  function editReply(index, rectId, reply) {
    const commentObject = commentsList.find((comment) => {
      return comment.rectId === rectId
    })
    const replyObject = commentObject.replies[index]
    replyObject.reply = reply
    return replyObject
  }

  function deleteReply(index, rectId) {
    const commentObject = commentsList.find((comment) => {
      return comment.rectId === rectId
    })
    const replyId = commentObject.replies[index].replyId
    delete commentObject.replies[index]
    return replyId
  }

  function addCommentsList(comment, rect, username, imageAvatar, onSubmit) {
    const commentObject = {
      username: username,
      createdAt: moment().format("MMMM Do, h:mm a"),
      comment: comment,
      imageAvatar: imageAvatar,
      rectId: rect.id,
      rect: rect,
      selected: false,
      replies: []
    }
    setCommentsList([...commentsList, commentObject])
    onSubmit(commentObject)
  }

  function selectComment(rectId) {
    commentsList.forEach((comment) => {
      if (comment.rectId === rectId) {
        comment.selected = true
      } else comment.selected = false
    })
  }

  function deSelectComments() {
    commentsList.forEach((comment) => {
      comment.selected = false
    })
    setCommentTimestamp(moment().unix())
  }

  return (
    <CommentProvider
      value={{
        commentTimestamp,
        commentsList,
        isNewComment,
        addCommentsList,
        setCommentsList,
        deleteComment,
        editComment,
        setIsNewComment,
        selectComment,
        deSelectComments,
        setCommentTimestamp,
        setInitialCommentList,
        addReply,
        editReply,
        deleteReply
      }}
    >
      {children}
    </CommentProvider>
  )
}

export default CommentContainer

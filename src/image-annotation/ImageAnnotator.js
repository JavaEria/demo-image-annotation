import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext
} from "react"
import { withStyles } from "@material-ui/core"
import { v4 as uuidv4 } from "uuid"
import ConfigContext from "../context/ConfigContext"
import CommentContext from "../context/CommentContext"
import CanvasContext from "../context/CanvasContext"
import moment from "moment"

const styles = () => ({
  defaultCursor: {
    cursor: "pointer"
  },
  crossHairCursor: {
    cursor: "crosshair"
  },
  canvas: {
    marginTop: 28,
    border: "1px solid #585858"
  }
})

function ImageAnnotator({ imagePreview, classes, width, height }) {
  const canvasRef = useRef()
  const commentContext = useContext(CommentContext)
  const canvasContextAPI = useContext(CanvasContext)
  const configContext = useContext(ConfigContext)
  const [isCrossHair, setIsCrossHair] = useState(false)
  const [canvas, setCanvas] = useState(null)
  const [canvasContext, setCanvasContext] = useState(null)
  const [loadedImage, setLoadedImage] = useState(null)
  const [boundRect, setBoundRect] = useState(null)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [isDrag, setIsDrag] = useState(false)
  const [onLoadComplete, setOnLoadComplete] = useState(false)

  useEffect(() => {
    setCanvas(canvasRef.current)
    setCanvasContext(canvasRef.current.getContext("2d"))
  }, [imagePreview])

  useEffect(() => {
    if (boundRect) {
      setOffsetX(boundRect.left)
      setOffsetY(boundRect.top)
    }
  }, [boundRect])

  function highlightRects(selectedRect) {
    if (canvasContext) {
      if (selectedRect) {
        canvasContext.globalAlpha = 0.3
        canvasContext.fillStyle = "rgba(239, 239, 239, 1)"
        canvasContext.fillRect(0, 0, canvas.width, canvas.height)
        canvasContext.globalAlpha = 1
      } else {
        commentContext.deSelectComments()
        canvasContextAPI.deSelectRect()
      }
    }

    canvasContextAPI.drawedRect.forEach((rect) => {
      if (rect.selected) {
        canvasContext.globalAlpha = 0.5
        canvasContext.fillStyle = "rgb(255,255,255,1)"
        canvasContext.fillRect(
          rect.startX,
          rect.startY,
          rect.width,
          rect.height
        )
        canvasContext.globalAlpha = 1
      }
    })
    commentContext.setCommentTimestamp(moment().unix())
  }

  const drawRect = useCallback(() => {
    canvasContextAPI.drawedRect.forEach((rect) => {
      canvasContext.strokeRect(
        rect.startX,
        rect.startY,
        rect.width,
        rect.height
      )
    })
  }, [canvasContext, canvasContextAPI.drawedRect])

  const drawImage = useCallback(async () => {
    function upload() {
      const img = new Image()
      img.onload = () => {
        const canvasStyle = getComputedStyle(canvas)
        const canvasWidth = canvasStyle.width.replace("px", "")

        const imageRatio = img.width / img.height

        const canvasHeight = canvasWidth / imageRatio
        canvas.style.height = canvasHeight + "px"

        canvas.width = canvasWidth
        canvas.height = canvasHeight
        canvasContext.strokeStyle = configContext.strokeStyle
        canvasContext.lineJoin = "round"
        canvasContext.lineWidth = 8

        canvasContext.clearRect(0, 0, canvas.width, canvas.height)
        canvasContext.drawImage(img, 0, 0, canvasWidth, canvasHeight)
        setOnLoadComplete(true)
      }
      img.src = imagePreview
      setLoadedImage(img)
    }
    upload()
  }, [canvas, canvasContext, configContext, imagePreview])

  useEffect(() => {
    async function draw() {
      if (canvas) {
        setOnLoadComplete(false)
        await drawImage()
        setBoundRect(canvas.getBoundingClientRect())
      }
    }
    draw()
  }, [canvas, drawImage, canvasContextAPI.rectTimestamp])

  useEffect(() => {
    if (onLoadComplete) {
      drawRect()
    }
  }, [onLoadComplete, drawRect, canvasContextAPI.rectTimestamp])

  function handleMouseDown(event) {
    event.preventDefault()
    event.stopPropagation()
    if (canvas) {
      drawRect()
    }
    setStartX(parseInt(event.clientX - offsetX))
    setStartY(parseInt(event.clientY - offsetY))
    canvasContext.drawImage(loadedImage, 0, 0, canvas.width, canvas.height)

    setIsDrag(true)
  }

  function handleMouseMove(event) {
    if (!isDrag) return
    const mouseX = parseInt(event.clientX - offsetX)
    const mouseY = parseInt(event.clientY - offsetY)
    const width = mouseX - startX
    const height = mouseY - startY

    if (allowedRange(Math.abs(width), Math.abs(height))) {
      setMouseX(parseInt(event.clientX - offsetX))
      setMouseY(parseInt(event.clientY - offsetY))
    }

    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    canvasContext.drawImage(loadedImage, 0, 0, canvas.width, canvas.height)

    if (canvas) {
      drawRect()
    }
    canvasContext.strokeRect(startX, startY, width, height)
  }

  function handleMouseUp(event) {
    event.preventDefault()
    event.stopPropagation()
    setIsDrag(false)
  }

  function allowedRange(width, height) {
    return width > 0 && width > 20 && height > 0 && width > 20
  }

  async function handleSelection(event) {
    commentContext.setIsNewComment(false)
    const rect = canvasContextAPI.getNearestDrawedRect(
      event.clientX - offsetX,
      event.clientY - offsetY
    )
    if (rect) {
      canvasContextAPI.selectRect(rect.id)
      commentContext.selectComment(rect.id)
    }

    highlightRects(rect ? true : false)

    const width = mouseX - startX
    const height = mouseY - startY
    if (
      mouseX !== 0 &&
      mouseY !== 0 &&
      allowedRange(Math.abs(width), Math.abs(height))
    ) {
      const id = uuidv4()
      commentContext.setIsNewComment(true)
      canvasContextAPI.setCurrentDrawnRect({
        id: id,
        startX: startX,
        startY: startY,
        mouseX: mouseX,
        mouseY: mouseY,
        width: width,
        height: height,
        selected: false
      })
      setMouseX(0)
      setMouseY(0)
      setIsDrag(false)
    } else commentContext.setIsNewComment(false)
    drawRect()
  }
  return (
    <>
      <canvas
        id="canvas"
        ref={canvasRef}
        className={`${
          isCrossHair ? classes.crossHairCursor : classes.defaultCursor
        } ${classes.canvas}`}
        width="640"
        height="460"
        onClick={handleSelection}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsCrossHair(true)}
        onMouseLeave={() => setIsCrossHair(false)}
      />
    </>
  )
}

export default withStyles(styles)(ImageAnnotator)

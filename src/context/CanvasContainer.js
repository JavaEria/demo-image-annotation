import React, { useState, useEffect } from "react"
import { CanvasProvider } from "./CanvasContext"
import moment from "moment"

function CanvasContainer({ children }) {
  const [drawedRect, setDrawedRect] = useState([])
  const [initialDrawedRect, setInitialDrawedRect] = useState([])
  const [currentDrawnRect, setCurrentDrawnRect] = useState({})
  const [rectTimestamp, setRectTimestamp] = useState(null)

  useEffect(() => {
    if (initialDrawedRect.length !== 0) {
      setDrawedRect(initialDrawedRect)
    }
  }, [initialDrawedRect])

  useEffect(() => {
    localStorage.setItem("drawedRect", JSON.stringify(drawedRect))
  }, [drawedRect])

  function addCurrentDrawnRect() {
    setDrawedRect([...drawedRect, currentDrawnRect])
    setCurrentDrawnRect({})
  }

  function deleteRect(rectId) {
    setDrawedRect(
      drawedRect.filter((rect) => {
        return rect.id !== rectId
      })
    )

    setRectTimestamp(moment().unix())
  }

  function getNearestDrawedRect(selectedX, selectedY) {
    return drawedRect.find((rect) => {
      return (
        selectedX > rect.startX &&
        selectedX < rect.mouseX &&
        selectedY > rect.startY &&
        selectedY < rect.mouseY
      )
    })
  }

  function selectRect(rectId) {
    drawedRect.forEach((rect) => {
      if (rect.id === rectId) {
        rect.selected = true
      } else rect.selected = false
    })
  }

  function deSelectRect() {
    drawedRect.forEach((rect) => {
      rect.selected = false
    })
  }

  return (
    <CanvasProvider
      value={{
        drawedRect,
        setDrawedRect,
        currentDrawnRect,
        setCurrentDrawnRect,
        addCurrentDrawnRect,
        getNearestDrawedRect,
        selectRect,
        deSelectRect,
        rectTimestamp,
        setRectTimestamp,
        deleteRect,
        initialDrawedRect,
        setInitialDrawedRect
      }}
    >
      {children}
    </CanvasProvider>
  )
}

export default CanvasContainer

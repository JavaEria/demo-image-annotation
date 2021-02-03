import React from "react"

const CanvasContext = React.createContext({})

export const CanvasProvider = CanvasContext.Provider
export const CanvasConsumer = CanvasContext.Consumer
export default CanvasContext

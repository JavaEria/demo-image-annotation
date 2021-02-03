import React, { useState } from "react"
import { ConfigProvider } from "./ConfigContext"

function ConfigContainer({ children }) {
  const [username, setUsername] = useState("")
  const [imageAvatar, setImageAvatar] = useState("")
  const [isResolvable, setIsResolvable] = useState(true)
  const [isEditable, setIsEditable] = useState(true)
  const [strokeStyle, setStrokeStyle] = useState("")

  return (
    <ConfigProvider
      value={{
        username,
        imageAvatar,
        isResolvable,
        isEditable,
        strokeStyle,
        setIsResolvable,
        setIsEditable,
        setUsername,
        setImageAvatar,
        setStrokeStyle
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default ConfigContainer

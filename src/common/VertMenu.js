import React, { useState } from "react"
import { IconButton, Menu, MenuItem } from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"

const ITEM_HEIGHT = 48

function VertMenu({ selectedIndex, handleMenuItemClick }) {
  const options = ["Edit", "Delete"]
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }
  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="comment-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch"
          }
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={selectedIndex === index}
            onClick={(event) => {
              handleMenuItemClick(event, index, options)
              setAnchorEl(null)
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default VertMenu

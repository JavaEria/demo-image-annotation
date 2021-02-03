import React from "react"
import { Grid, Button, TextField, withStyles } from "@material-ui/core"

const styles = () => ({
  buttonGroups: {
    marginTop: 8
  },
  cancelButton: {
    marginLeft: 16
  }
})

function SaveEdit({
  editValue,
  handleChange,
  handleSave,
  handleCancel,
  classes
}) {
  return (
    <>
      <Grid container justify="center">
        <TextField
          fullWidth
          variant="outlined"
          value={editValue}
          size="small"
          onChange={handleChange}
        />
      </Grid>
      <Grid container justify="flex-start" className={classes.buttonGroups}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Grid>
    </>
  )
}

export default withStyles(styles)(SaveEdit)

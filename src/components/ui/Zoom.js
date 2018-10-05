import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

const styles = theme => ({
  root: {
  },
  button: {
    padding: '0',
    minHeight: '20px',
    minWidth: '20px'

  }
})

class Zoom extends React.Component {

  constructor(props) {
    super(props)

    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
  }

  handleZoomIn() {
    console.log('ZOMM IN')
    console.log(this.props.zoom)
    this.props.onSetZoom(this.props.zoom*1.1)
    console.log(this.props.zoom)
  }

  handleZoomOut() {
    console.log('ZOMM OUT')
    console.log(this.props.zoom)
    this.props.onSetZoom(this.props.zoom*0.9)
    console.log(this.props.zoom)
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Button onClick={this.handleZoomIn} variant="raised" className={classes.button} color="default">
          <AddIcon/>
        </Button>
        <Button onClick={this.handleZoomOut} variant="raised" className={classes.button} color="default">
          <RemoveIcon/>
        </Button>
      </div>
    )
  }
}

Zoom.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Zoom);



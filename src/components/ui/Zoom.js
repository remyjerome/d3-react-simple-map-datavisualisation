import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#7baca8' },
    secondary: { main: '#7baca8' },
    white: { main: '#fff' }
  }
});

const styles = theme => ({
  root: {
    fill: 'white'
  },
  button: {
    padding: '0',
    width: 35,
    height: 35,
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
      <MuiThemeProvider theme={theme}>
      <div style={{
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 100,
        marginBottom: 15
      }}>
        <Button onClick={this.handleZoomIn} variant="fab" className={classes.button} color="primary">
          <AddIcon style={{fill: 'white'}} />
        </Button>
        <Button onClick={this.handleZoomOut} variant="fab" className={classes.button} color="primary">
          <RemoveIcon style={{fill: 'white'}}/>
        </Button>
      </div>
      </MuiThemeProvider>
    )
  }
}

Zoom.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Zoom);



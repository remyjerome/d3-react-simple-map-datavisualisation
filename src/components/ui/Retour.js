import React from 'react'
import Button from '@material-ui/core/Button'

class Retour extends React.Component {

  constructor(props) {
    super(props)

    this.handleReset = this.handleReset.bind(this)
    this.handleDgrSelection = this.handleDgrSelection.bind(this)
    this.handleDrSelection = this.handleDrSelection.bind(this)
  }

  handleReset() {
    this.props.onSetLevel(3)
    this.props.onSetCenter([2.454071, 46.279229])
    this.props.onSetZoom(1.4641000000000006)
    this.props.onClearHoverAgency()
    this.props.onClearDgr()
    this.props.onClearDr()
    const currentIndex = this.props.options.indexOf('agence')
    if (currentIndex !== -1) {
      this.props.onClearOption(currentIndex)
    }
    console.log('RESET')
  }
  handleDgrSelection = (data) => {
    this.props.onSetLevel(2)
    this.props.onSetCenter(data.coordinates)
    this.props.onSetZoom(data.zoom)
    this.props.onClearHoverInfo()
    this.props.onSetDgr(data)
    this.props.onClearDr()

  }
  handleDrSelection = (data) => {
    this.props.onSetLevel(1)
    this.props.onSetCenter(data.coordinates)
    this.props.onSetZoom(data.zoom)
    this.props.onClearHoverInfo()
    this.props.onSetDr(data)

    const currentIndex = this.props.options.indexOf('agence')
    if (currentIndex === -1) {
      this.props.onAddOption('agence')
    }
  }

  render () {
    return (
      <div>
        <Button onClick={this.props.niveau === 2 ?  this.handleReset : this.props.niveau === 1 ? () => this.handleDgrSelection(this.props.dgr) : null} variant="outlined" size="small">
          retour
        </Button>
      </div>
    )
  }
}

export default Retour
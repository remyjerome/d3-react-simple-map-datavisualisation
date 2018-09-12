import React, { Component } from 'react'

import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

class NavMap extends Component {
  render() {
    const { niveau, selectedDgr, handleReset, handleDgrSelection, handleDrSelection, dataStructure } = this.props

    return (
      <div className="NavMap">
        <Button variant="contained" onClick={handleReset}>{ "National" }</Button>
        <div className="wrapperStyles">
          {
            dataStructure.map((dgr, i) => {
              return ( <Button
                key={i}
                variant="contained"
                style={{
                  backgroundColor: "#2980b9",
                  color: "#ecf0f1"
                }}
                size="medium"
                onClick={handleDgrSelection}
                datadgr={i}
              >
                { dgr.name }
              </Button> )
            })
          }
        </div>
        <div className="wrapperStyles">
          {
            niveau === 2 || niveau === 1? selectedDgr.dr.map((dr, i) =>
              ( <Button
                key={i}
                variant="contained"
                style={{
                  backgroundColor: "#34495e",
                  color: "#ecf0f1"
                }}
                size="small"
                onClick={handleDrSelection}
                datadr={i}
              >
                { dr.name }
              </Button> )
            ): ''
          }
        </div>
      </div>
    )
  }
}

NavMap.propTypes = {
  niveau: PropTypes.number.isRequired,
  selectedDgr: PropTypes.object,
  handleReset: PropTypes.func.isRequired,
  handleDgrSelection: PropTypes.func.isRequired,
  handleDrSelection: PropTypes.func.isRequired
}

export default NavMap
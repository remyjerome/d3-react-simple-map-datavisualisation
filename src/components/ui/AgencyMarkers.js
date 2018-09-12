import React, { Component } from 'react'
import { Marker } from 'react-simple-maps'
import PropTypes from 'prop-types';

const styleMarker = {
  default: { fill: "#c0392b" },
  hover: { fill: "#FFFFFF" },
  pressed: { fill: "#FF5722" },
}

const styleCircle = {
  stroke: "#ecf0f1",
  strokeWidth: 1,
  opacity: 0.6,
}

const styleText = {
  fontFamily: "Roboto, sans-serif",
  fill: "#ecf0f1",
  fontSize: "0.6em",
  textShadow: "-1px -1px 0 rgba(44,66,80,0.30),1px -1px 0 rgba(44,66,80,0.30), -1px 1px 0 rgba(44,66,80,0.30),1px 1px 0 rgba(44,66,80,0.30)",
  pointerEvents: "none",
}



class AgencyMarkers extends Component {

  constructor(props) {
    super(props)

    this.onMouseEnterHandlerAgence = this.onMouseEnterHandlerAgence.bind(this)
  }
  onMouseEnterHandlerAgence(a) {
    this.props.onSetHoverAgency(a)
  }
  render() {
    const isGroup = (this.props.agence.cy!== undefined && this.props.agence.cx !== undefined)
    return (
        <div
          onMouseEnter={this.onMouseEnterHandlerAgence}
          marker={this.props.agence}
          style={styleMarker}
        >
          <circle
            cx={this.props.agence.cx ? this.props.agence.cx : 0}
            cy={this.props.agence.cy ? this.props.agence.cy : 0}
            r={this.props.niveau === 3 ? 2 : this.props.niveau === 2 ? 5 : this.props.niveau === 1 ? 8 : 0}
            style={styleCircle}
          />
          {this.props.niveau === 1 ? (<text
            textAnchor="middle"
            y={this.props.agence.markerOffset}
            style={styleText}
          >
            {(isGroup || this.props.agence.groupName !== undefined )? this.props.agence.groupName : this.props.agence.name}
          </text>) : '' }
        </div>
    )
  }
}

AgencyMarkers.propTypes = {
  agence: PropTypes.object,
  niveau: PropTypes.number,
  showAgence: PropTypes.bool
}

AgencyMarkers.defaultProps = {
  agence: {id: "29140", name: "QUIMPER -A-", markerOffset: -11, coordinates: [-4.064884, 47.973739]},
  niveau: 3,
  showAgence: false
}

export default AgencyMarkers


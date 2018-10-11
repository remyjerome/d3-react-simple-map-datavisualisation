import React from 'react'
import * as d3 from "d3"
import { legendSize } from 'd3-svg-legend'

import '../../stylesheets/Legend_v3.css'

const style = {
  position: 'absolute',
  bottom: '24px'
}

class Legend_v3 extends React.Component {
  componentDidMount() {
    this.renderLegend()
  }

  renderLegend() {

  }
  render() {
    return (
      <div style={style} id="legend">
        <svg height={200} width={200} id="legend1">
          <g transform="translate(0 10)">
            <line x1="0" y1="0" x2="40" y2="0" stroke="#000" stroke-width="4"  />
            <text x={45} y="5" text-anchor="center">Zone Théorique</text>
          </g>
          <g transform="translate(0 40)">
            <rect width="30" height="20" />
            <text x={45} y="15" text-anchor="center">Zone Effective</text>
          </g>
          <g transform="translate(0 80)">
            <rect width="30" height="20" />
            <text x={45} y="15" text-anchor="center">Zone Théorique</text>
          </g>
        </svg>
      </div>
    )
  }
}

export default Legend_v3

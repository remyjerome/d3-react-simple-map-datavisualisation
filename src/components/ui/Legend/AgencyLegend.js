import React from 'react'

import '../../../stylesheets/Legend_v3.css'

const style = {

}

class AgencyLegend extends React.Component {
  componentDidMount() {
    this.renderLegend()
  }

  renderLegend() {

  }
  render() {
    return (
      <div style={style} id="legend">
        <svg height={200} width={400} id="legend2">
          <g transform="translate(0 10)">
            <line x1="0" y1="0" x2="40" y2="0" stroke="rgb(0,0,0)" strokeWidth="4" fill="none" strokeDasharray="5,5" />
            <text x={45} y="5" textAnchor="center">Zone Théorique</text>
          </g>
 {/*         <g transform="translate(0 40)">
            <rect width="30" height="20" />
            <text x={45} y="15" textAnchor="center">Zone Effective</text>
          </g>*/}
{/*          <g transform="translate(0 80)">
            <rect width="30" height="20" />
            <text x={45} y="15" textAnchor="center">Zone Théorique</text>
          </g>*/}
        </svg>
      </div>
    )
  }
}

export default AgencyLegend

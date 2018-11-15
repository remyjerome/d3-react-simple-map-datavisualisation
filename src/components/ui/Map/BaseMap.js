import React, { Component } from 'react'
import { Map, TileLayer, Pane } from 'react-leaflet'
import PropTypes from 'prop-types';
import * as d3 from "d3"
import * as L from 'leaflet'

import '../../../stylesheets/BaseMap.css'

class BaseMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      init: {}
    }
  }

  componentDidMount() {

    console.log(this.maps.leafletElement)

    console.log(this.maps.leafletElement && this.initSvg(this.maps.leafletElement))
  }

  initSvg = (maps) => {
    /**
     * TRANSFORM INPUT GEOMETRY TO AN OVER TYPE (D3 TYPE to LEAFLET TYPE)
     */
    function projectPoint (x, y) {
      var point = maps.latLngToLayerPoint(new L.LatLng(y, x));
      this.stream.point(point.x, point.y);
    }

    /**
     * CONVERT GEOJSON to SVG with d3.geoPath and d3.geoTransform
     */
    const transform = d3.geoTransform({point: projectPoint}),
      path = d3.geoPath().projection(transform);

    /**
     * FIT SVG to LAYER
     */
    var bounds = path.bounds(this.props.feature),
      topLeft = bounds[0],
      bottomRight = bounds[1];



    this.setState({
      init: {
        bounds: bounds,
        topLeft: topLeft,
        bottomRight: bottomRight
      }
    })

    return {
      bounds: bounds,
      topLeft: topLeft,
      bottomRight: bottomRight
    }
  }

  render() {

    const { children, center, zoom, width, height, feature } = this.props

    const { bottomRight,  topLeft} = this.state.init
    
    return (
   <Map style={{ width: width,height: height}} scrollWheelZoom={false} dragging={false} center={center} zoom={zoom} className={'leaflet-container'} ref={(ref) => { this.maps = ref }} >
        <TileLayer
          // opacity={0.5}
          // zIndex={-2}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png' subdomains='abcd'

        />
{/*          <Pane name={"svg-agence"} className={"svg-agence"}>
            {(bottomRight && topLeft) && (<svg width={bottomRight[0] - topLeft[0]} height={bottomRight[1] - topLeft[1]} style={{ left: topLeft[0], top: topLeft[1]}}>
              <g className={"leaflet-zoom-hide"} transform={`translate(${-topLeft[0]},${-topLeft[1]})`}>
                { children }
              </g>
            </svg>)}
          </Pane>*/}
      </Map>
    )
  }
}

BaseMap.defaultProps = {
  center: [46.227638,2.213749000000007],
  zoom: 5.5,
  children: (<circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill="red" />),
  width: 960,
  height: 600
}

BaseMap.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
  children: PropTypes.element,
  width: PropTypes.number,
  height: PropTypes.number,
  feature: PropTypes.object.isRequired
};

export default BaseMap




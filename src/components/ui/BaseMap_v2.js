import React, { Component } from 'react'
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet'

export default class BaseMap extends Component {



  constructor(props) {
    super(props);
    this.state = {
      lat: props.center[1],
      lng: props.center[0],
      zoom: props.zoom,
      bounds: props.bounds
    };
  }

  componentDidMount() {
    const polygon = this.props.polygon ? this.props.polygon[0].geometry : []
    polygon ? console.log(polygon) : null
  }

  render() {


    const position = [this.state.lat, this.state.lng];



    return (
   <Map scrollWheelZoom={false} dragging={false} className={'leaflet-container'} bounds={this.props.bounds} >
        <TileLayer
          opacity={0.5}
          zIndex={-2}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png' subdomains='abcd'
        />

        {/* this.props.children */}
      </Map>
    )
  }
}




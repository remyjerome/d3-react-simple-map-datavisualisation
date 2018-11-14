import React, { Component } from 'react'
import { render } from 'react-dom'
// import { Map, Marker, Popup, TileLayer } from 'react-leaflet'



let Map,Marker,Popup,TileLayer,Rectangle



export default class BaseMap extends React.Component {



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
    //Only runs on Client, not on server render
    Map = require('react-leaflet').Map
    Marker = require('react-leaflet').Marker
    Popup = require('react-leaflet').Popup
    TileLayer = require('react-leaflet').TileLayer
    // Rectangle = require('react-leaflet').Rectangle
    // MapComponents = require('./mapComponents')s.default
    this.forceUpdate()
  }

  render() {
    const position = [this.state.lat, this.state.lng];


    return (
      (Map ) ?(<Map scrollWheelZoom={false} dragging={false} className={'leaflet-container'} bounds={this.props.bounds} >
        <TileLayer
          opacity={0.5}
          zIndex={-2}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png' subdomains='abcd'
        />

        { this.props.children }
      </Map>) : (null)
    );
  }
}




import React, { Component } from "react"
import { get } from "axios"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"
import { geoTimes } from "d3-geo-projection"
import chroma from "chroma-js"
import MapDescription from './MapDescription'
import dataSubDgr from '../static/dataSubDgr'
import dataStructureZoom from '../static/dataStructureZoom'
import dataSubDr from '../static/dataSubDr'
import NavMap from './NavMap'

import '../stylesheets/France.css';

const colorScaleDgr = chroma.scale(['#fafa6e','#2A4858']).mode('lch').colors(7)
const colorScaleDr = chroma.scale(['#fafa6e','#2A4858']).mode('lch').colors(24)

const subDr = dataSubDr
const subDgr = dataSubDgr


class France extends React.PureComponent  {

  constructor() {
    super()
    this.state = {
      center:  [2.454071, 46.279229],
      geographyPaths: [],
      zoom: 1.4641000000000006,
      hoverInfo:null,
      selectedDgr: null,
      selectedDr: null,
      hoverAgence: null,
      niveau: 3,
      showAgence: true,
    }
    this.loadPaths = this.loadPaths.bind(this)
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this)
    this.handleGeographyClick = this.handleGeographyClick.bind(this)
    this.projection = this.projection.bind(this)
    this.handleDgrSelection = this.handleDgrSelection.bind(this)
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
    this.handleMoveStart = this.handleMoveStart.bind(this)
    this.handleMoveEnd = this.handleMoveStart.bind(this)
    this.colorMapStyle = this.colorMapStyle.bind(this)
    this.handleDrSelection = this.handleDrSelection.bind(this)
    this.getAgence = this.getAgence.bind(this)
    this.onMouseEnterHandlerAgence = this.onMouseEnterHandlerAgence.bind(this)
  }
  handleDgrSelection(evt) {
    const dgrId = evt.currentTarget.getAttribute("datadgr")
    const dgr = dataStructureZoom[dgrId]

    this.setState({
      center: dgr.coordinates,
      zoom: dgr.zoom,
      selectedDgr: dgr,
      selectedDr: null,
      hoverInfo: null,
      niveau: 2,
    })
  }
  handleDrSelection(evt) {
    const dr = this.state.selectedDgr.dr[evt.currentTarget.getAttribute("datadr")]

    this.setState({
      center: dr.coordinates,
      zoom: dr.zoom,
      selectedDr: dr,
      hoverInfo: null,
      niveau: 1,
    })
  }
  projection() {
    return geoTimes()
      .translate([2.454071, 46.279229])
      .scale(2600)
  }
  handleGeographyClick(geography) {
    /*const path = geoPath().projection(this.projection())
    const centroid = this.projection().invert(path.centroid(geography))
    this.setState({
      center: centroid,
      zoom: 4,
      currentCountry: geography.properties.iso_a3,
    })*/
    if(this.state.niveau === 3) {
      const dgrId = geography.properties.CODE_DGR
      const dgr = dataStructureZoom.filter((dgr) => dgr.id === dgrId )[0]

      this.setState({
        center: dgr.coordinates,
        zoom: dgr.zoom,
        selectedDgr: dgr,
        niveau: 2,
      })

    }
    else if(this.state.niveau === 2) {
      const drId = geography.properties.CODE_DR
      const dr = this.state.selectedDgr.dr.filter((dr) => dr.id === drId)[0]

      this.setState({
        center: dr.coordinates,
        zoom: dr.zoom,
        selectedDr: dr,
        niveau: 1,
      })
    }
  }
  componentDidMount() {
    this.loadPaths()
  }
  loadPaths() {
    get("/france-dr.json")
      .then(res => {
        if (res.status !== 200) return
        const france = res.data.features
        this.setState({ geographyPaths: france })
      })
  }
  handleZoomIn() {
    this.setState({
      zoom: this.state.zoom * 1.1,
    })
  }
  handleZoomOut() {
    this.setState({
      zoom: this.state.zoom / 1.1,
    })
  }
  handleMoveStart(currentCenter) {
    // console.log("New center: ", `[${currentCenter}], zoom: ${this.state.zoom}`)
  }

  handleMoveEnd(newCenter) {
    // console.log("New center: ", newCenter, this.state.zoom)
  }
  onMouseEnterHandler(a) {
    let hoverInfo = a.properties
    this.setState(() => {
      return { hoverInfo: hoverInfo}
    })
  }
  colorMapStyle(geography) {
    const colorMap = (this.state.selectedDgr != null) ? {
        default: {
          fill: colorScaleDr[subDr.indexOf(geography.properties.NOM_DR)],
          stroke: "#607D8B",
          strokeWidth: 0.02,
          outline: "none",
        },
        hover: {
          fill: chroma(colorScaleDr[subDr.indexOf(geography.properties.NOM_DR)]).darken(0.5),
          stroke: "#607D8B",
          strokeWidth: 0.075,
          outline: "none",
        },
        pressed: {
          fill: chroma(colorScaleDr[subDr.indexOf(geography.properties.NOM_DR)]).brighten(0.5),
          stroke: "#607D8B",
          strokeWidth: 0.075,
          outline: "none",
        },
      } : {
      default: {
        fill: colorScaleDgr[subDgr.indexOf(geography.properties.NOM_DGR)],
        stroke: "#607D8B",
        strokeWidth: 0.02,
        outline: "none",
    },
      hover: {
        fill: chroma(colorScaleDgr[subDgr.indexOf(geography.properties.NOM_DGR)]).darken(0.5),
          stroke: "#607D8B",
          strokeWidth: 0.075,
          outline: "none",
      },
      pressed: {
        fill: chroma(colorScaleDgr[subDgr.indexOf(geography.properties.NOM_DGR)]).brighten(0.5),
          stroke: "#607D8B",
          strokeWidth: 0.075,
          outline: "none",
      },
    }
    return colorMap
  }
  handleShowAgence = (evt) => {
    this.setState({
      showAgence: evt.agence ? true : false
    })
  }
  getAgence() {
    let agence = []
    if(this.state.niveau === 3) {
      dataStructureZoom.map(dgr => dgr.dr.map( dr => dr.agence.map(item => agence.push(item)) ) )
    } else if (this.state.niveau === 2) {
      this.state.selectedDgr.dr.map( dr => dr.agence.forEach(item => agence.push(item) ))

    } else if (this.state.niveau === 1) {
      agence = this.state.selectedDr.agence
    }
    return agence
  }
  onMouseEnterHandlerAgence(a) {
    this.setState({
      hoverAgence: a
    })
  }
  handleReset() {
    this.setState({
      center:  [2.454071, 46.279229],
      zoom: 1.4641000000000006,
      selectedDgr: null,
      selectedDr: null,
      hoverAgence: null,
      niveau: 3,
    })
  }
  render() {
    const data = this.state.niveau === 3 ? dataStructureZoom : this.state.niveau === 2 ? this.state.selectedDgr.dr : this.state.niveau===1 ? this.state.selectedDr.agence : null
    return (
      <div>
        <NavMap niveau={this.state.niveau} selectedDgr={this.state.selectedDgr} dataStructure={dataStructureZoom} handleReset={this.handleReset} handleDgrSelection={this.handleDgrSelection} handleDrSelection={this.handleDrSelection} handleShowAgence={this.handleShowAgence} />
        <div className="wrapperDataVisualisationStyles">
          <ComposableMap
            projectionConfig={{
              center: [2.454071, 46.279229],
              scale: 2600,
            }}
            width={this.props.width}
            height={this.props.height}
            className="wrapperMapStyles"
          >
            <ZoomableGroup center={this.state.center}
                           zoom={this.state.zoom}
                           onMoveStart={this.handleMoveStart}
                           onMoveEnd={this.handleMoveEnd}>
              <Geographies geography={this.state.geographyPaths}
                           disableOptimization>
                {(geographies, projection) =>
                  geographies.filter(geography =>
                      this.state.selectedDgr ? this.state.selectedDr ? this.state.selectedDr.id === geography.properties.CODE_DR :this.state.selectedDgr.id === geography.properties.CODE_DGR : true
                  ).map((geography, i) =>
                    <Geography
                      key={`${geography.properties.NOM_DEPT}-${i}`}
                      onMouseEnter={this.onMouseEnterHandler}
                      onClick={this.handleGeographyClick}
                      cacheId={`path-${geography.properties.NOM_DEPT}-${i}`}
                      data-tip={geography.properties.NOM_DEPT}
                      id={`${geography.properties.NOM_DEPT}`}
                      round
                      geography={geography}
                      projection={projection}
                      style={this.colorMapStyle(geography)}
                  />
                )}
              </Geographies>
             <Markers>
                { this.state.showAgence ? this.getAgence().map((agence,i) => {
                  const isGroup = (agence.cy!== undefined && agence.cx !== undefined)
                  return (
                  <Marker
                    onMouseEnter={this.onMouseEnterHandlerAgence}
                    key={i}
                    marker={agence}
                    style={{
                      default: { fill: "#c0392b" },
                      hover: { fill: "#FFFFFF" },
                      pressed: { fill: "#FF5722" },
                    }}
                  >
                    <circle
                      cx={agence.cx ? agence.cx : 0}
                      cy={agence.cy ? agence.cy : 0}
                      r={this.state.niveau === 3 ? 2 : this.state.niveau === 2 ? 5 : this.state.niveau === 1 ? 8 : 0}
                      style={{
                        stroke: "#ecf0f1",
                        strokeWidth: 1,
                        opacity: 0.6,
                      }}
                    />
                    {this.state.niveau === 1 ? (<text
                      textAnchor="middle"
                      y={agence.markerOffset}
                      style={{
                        // display: (isGroup && agence.groupName !== undefined )?"none":"initial",
                        fontFamily: "Roboto, sans-serif",
                        fill: "#ecf0f1",
                        fontSize: "0.6em",
                        textShadow: "-1px -1px 0 rgba(44,66,80,0.30),1px -1px 0 rgba(44,66,80,0.30), -1px 1px 0 rgba(44,66,80,0.30),1px 1px 0 rgba(44,66,80,0.30)",
                        pointerEvents: "none",
                      }}
                    >
                      {(isGroup || agence.groupName !== undefined )? agence.groupName : agence.name}
                    </text>) : '' }
                  </Marker>
                )}): '' }
              </Markers>
              <Markers>
                { (data !== null && this.state.niveau !== 1) ? data.map((item, i) => (
                <Marker
                    key={i}
                    marker={item}
                    style={{
                      default: { fill: "#FF5722" },
                      hover: { fill: "#FFFFFF" },
                      pressed: { fill: "#FF5722" },
                    }}
                  >
                  <text
                      textAnchor="middle"
                      y={item.markerOffset}
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        fontSize: "3em",
                        fill: "#ecf0f1",
                        textShadow: "-1px -1px 0 rgba(44,66,80,0.30),1px -1px 0 rgba(44,66,80,0.30), -1px 1px 0 rgba(44,66,80,0.30),1px 1px 0 rgba(44,66,80,0.30)",
                        pointerEvents: "none",
                      }}
                    >
                      { `${item.id}%`}
                    </text>
                  </Marker>
                )): ''}
              </Markers>
            </ZoomableGroup>
          </ComposableMap>
          <MapDescription hoverInfo={this.state.hoverInfo} niveau={this.state.niveau} agence={this.state.hoverAgence} className="wrapperDescriptionStyles" structure={data}/>
        </div>
      </div>
    )
  }
}

export default France
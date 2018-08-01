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
import { geoPath } from "d3-geo"
import { geoTimes } from "d3-geo-projection"
import Button from '@material-ui/core/Button'
import chroma from "chroma-js"
import { VictoryPie } from "victory"
import MapDescription from '../components/MapDescription'
import dataLyon from '../static/dataLyon'
import dataSubDgr from '../static/dataSubDgr'
import dataDgrZoom from '../static/dataDgrZoom'
import dataSubDr from '../static/dataSubDr'

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
  fontFamily: "Roboto, sans-serif",
}

const wrapperDataVisualisationStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
  fontFamily: "Roboto, sans-serif",
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
}

const wrapperDescriptionStyles = {
  flex: "1",
  marginLeft: 15
}

const wrapperMapStyles = {
  width: "100%",
  height: "auto",
  flex: "5"
}

const colorScaleDgr = chroma.scale(['#fafa6e','#2A4858']).mode('lch').colors(7)
const colorScaleDr = chroma.scale(['#fafa6e','#2A4858']).mode('lch').colors(24)

const subDr = dataSubDr
const subDgr = dataSubDgr


class France extends Component {

  constructor() {
    super()
    this.state = {
      center:  [2.454071, 46.279229],
      geographyPaths: [],
      zoom: 1.4641000000000006,
      hoverInfo:null,
      selectedDgr: null,
      cities: dataLyon
    }
    this.loadPaths = this.loadPaths.bind(this)
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
    this.handleCitySelection = this.handleCitySelection.bind(this)
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
  }
  handleDgrSelection(evt) {
    const dgrId = evt.target.getAttribute("data-dgr")
    const dgr = dataDgrZoom[dgrId]
    this.setState({
      center: dgr.coordinates,
      zoom: dgr.zoom,
      selectedDgr: dgr,
      hoverInfo: null,
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

  }
  handleCitySelection(evt) {
    const city = this.state.cities[11]
    this.setState({
      center: city.coordinates,
      zoom: 10,
    })
  }
  handleReset() {
    this.setState({
      center:  [2.454071, 46.279229],
      zoom: 1.4641000000000006,
      selectedDgr: null,
    })
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
    console.log("New center: ", currentCenter)
  }

  handleMoveEnd(newCenter) {
    console.log("New center: ", newCenter)
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
          strokeWidth: 0.007,
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
        strokeWidth: 0.007,
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
  render() {
    return (
      <div>
        <Button variant="contained" onClick={this.handleReset}>
          { "Reset" }
        </Button>
        <Button onClick={ this.handleZoomIn }>{ "Zoom in" }</Button>
        <Button onClick={ this.handleZoomOut }>{ "Zoom out" }</Button>
        <div style={wrapperStyles}>
          {
            dataDgrZoom.map((dgr, i) => {
               return ( <button
                 key={i}
                variant="contained"
                color="primary"
                onClick={this.handleDgrSelection}
                 data-dgr={i}
                >
                { dgr.name }
                </button> )
          })
          }
        </div>
        <div style={wrapperDataVisualisationStyles}>
          <ComposableMap
            projectionConfig={{
              center: [2.454071, 46.279229],
              scale: 2600,

            }}
            width={this.props.width}
            height={this.props.height}
            style={wrapperMapStyles}
          >
            <ZoomableGroup center={this.state.center}
                           zoom={this.state.zoom}
                           onMoveStart={this.handleMoveStart}
                           onMoveEnd={this.handleMoveEnd}>
              <Geographies geography={this.state.geographyPaths}
                           disableOptimization>
                {(geographies, projection) =>
                  geographies.filter(geography =>
                      this.state.selectedDgr ? this.state.selectedDgr.id === geography.properties.CODE_DGR : 1===1
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
                { this.state.zoom >= 10 ? this.state.cities.map((city, i) => (
                  <Marker
                    key={ `city-${city.id}` }
                    marker={ city }
                    style={{
                      default: {
                        outline: "none",
                      },
                      hover: {
                        outline: "none",
                      },
                      pressed: {
                        outline: "none",
                      },
                    }}
                  >
                    <g transform="translate(-15,-15)">
                      <circle cx={20} cy={20} r={21} fill="transparent" stroke="#607D8B" />
                      <circle cx={20} cy={20} r={9} fill="transparent" stroke="#607D8B" />
                      <VictoryPie
                        standalone={ false }
                        width={ 40 }
                        height={ 40 }
                        padding={ 0 }
                        innerRadius={ 10 }
                        style={{
                          labels: { fill: "transparent" },
                          data: { stroke: "#ECEFF1" },
                        }}
                        data={[
                          { x: null, y: city.languages[0].value, fill: "#FF5722" },
                          { x: null, y: city.languages[1].value, fill: "#00BCD4" },
                          { x: null, y: city.languages[2].value, fill: "#FFC107" },
                          { x: null, y: city.languages[3].value, fill: "#8BC34A" },
                        ]}
                      />
                    </g>
                    <text
                      textAnchor="middle"
                      y={city.markerOffset}
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        fontSize: " 5 px",
                        fill: "#DFF2FF",
                      }}
                    >
                      {city.name}
                    </text>
                  </Marker>
                )) : <Marker key="1" marker={this.state.cities[11]} >
                  <circle
                    onClick={ () => {
                      const city = this.state.cities[11]
                      this.setState({
                        center: city.coordinates,
                        zoom: 10,
                      })
                    }}
                    cx={0}
                    cy={0}
                    r={5}
                    style={{
                      stroke: "#FF5722",
                      strokeWidth: 2,
                      opacity: 0.9,
                    }}
                  />

                </Marker> }
              </Markers>
            </ZoomableGroup>
          </ComposableMap>
          <MapDescription hoverInfo={this.state.hoverInfo} style={wrapperDescriptionStyles}/>
        </div>
      </div>
    )
  }
}

export default France
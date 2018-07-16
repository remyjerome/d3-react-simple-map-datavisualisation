
import React, { Component } from "react"
import { get } from "axios"
import { feature } from "topojson-client"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"
import Button from '@material-ui/core/Button'
import chroma from "chroma-js"
import { VictoryPie } from "victory"
import { geoAlbers } from "d3-geo"

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
  fontFamily: "Roboto, sans-serif",
}

const setSize = {
  width: 800,
  height: 600
}

const colorScale = chroma
  .scale([
    '#CCCCCC',
    '#F0F1EE',
    '#C4D4AF',
  ])
  .mode('lch')
  .colors(24)

const subregions = [
  "AQUITAINE",
  "AUVERGNE",
  "BASSE-NORMANDIE",
  "ALSACE",
  "BRETAGNE",
  "LANGUEDOC-ROUSSILLON",
  "CHAMPAGNE-ARDENNE",
  "BOURGOGNE",
  "CORSE",
  "FRANCHE-COMTE",
  "CENTRE",
  "CHAMPAGNE-ARDENNE",
  "DRDELYON",
  "ILE-DE-FRANCE",
  "LORRAINE",
  "HAUTE-NORMANDIE",
  "PAYSDELALOIRE",
  "LIMOUSIN",
  "MIDI-PYRENEES",
  "PICARDIE",
  "PROVENCE-ALPES-COTED'AZUR",
  "POITOU-CHARENTES",
  "RHONE-ALPES",
  "NORD-PAS-DE-CALAIS",
]


class France extends Component {

  constructor() {
    super()
    this.state = {
      center:  [2.454071, 46.279229],
      geographyPaths: [],
      zoom: 1,
      cities: [{ id:1, markerOffset: 37, name: "Lyon", coordinates: [4.85,45.75],
        languages: [
          { name: "German", value: 83.1 },
          { name: "French", value: 3 },
          { name: "Italian", value: 5.9 },
          { name: "Romansh", value: 0.4 }] },
        { id:2, markerOffset: 37, name: "Trevoux", coordinates: [4.774296000000049,45.94094],
          languages: [
            { name: "German", value: 83.1 },
            { name: "French", value: 3 },
            { name: "Italian", value: 5.9 },
            { name: "Romansh", value: 0.4 }
          ] },
       /* { id:3, markerOffset: 37, name: "Miribel", coordinates: [4.954543000000058,45.82450799999999],
          languages: [
            { name: "German", value: 83.1 },
            { name: "French", value: 3 },
            { name: "Italian", value: 5.9 },
            { name: "Romansh", value: 0.4 }
          ] },*/
        { id:4, markerOffset: 37, name: "Meyzieu", coordinates: [5.003657999999973,45.766821],
          languages: [
            { name: "German", value: 83.1 },
            { name: "French", value: 3 },
            { name: "Italian", value: 5.9 },
            { name: "Romansh", value: 0.4 }
          ] },
        { id:5, markerOffset: -20, name: "Villefranche-sur-Saône", coordinates: [4.718820999999934,45.991471],
          languages: [
            { name: "German", value: 83.1 },
            { name: "French", value: 3 },
            { name: "Italian", value: 5.9 },
            { name: "Romansh", value: 0.4 }
          ] },
        { id:6, markerOffset: -20, name: "Montluel", coordinates: [5.056991000000039,45.8498919],
          languages: [
            { name: "German", value: 83.1 },
            { name: "French", value: 3 },
            { name: "Italian", value: 5.9 },
            { name: "Romansh", value: 0.4 }
          ] },
        { id:7, markerOffset: -20, name: "Chalamont", coordinates: [5.172362000000021,45.996513],
          languages: [
            { name: "German", value: 83.1 },
            { name: "French", value: 3 },
            { name: "Italian", value: 5.9 },
            { name: "Romansh", value: 0.4 }
          ] },
        { id:8, markerOffset: 37, name: "Ambérieu-en-Bugey", coordinates: [5.359555999999998,45.95843600000001],
          languages: [
            { name: "German", value: 83.1 },
            { name: "French", value: 3 },
            { name: "Italian", value: 5.9 },
            { name: "Romansh", value: 0.4 }
          ] },
        { id:9, markerOffset: -20, name: "Hauteville-Lompnes", coordinates: [5.601784899999984,45.9769859],
          languages: [
            { name: "German", value: 83.1 },
            { name: "French", value: 3 },
            { name: "Italian", value: 5.9 },
            { name: "Romansh", value: 0.4 }
          ] },
        { id:10, markerOffset: -20, name: "Bellegarde-sur-Valserine", coordinates: [5.826179000000025,46.10759900000001],
          languages: [
            { name: "German", value: 83.1 },
            { name: "French", value: 3 },
            { name: "Italian", value: 5.9 },
            { name: "Romansh", value: 0.4 }
          ] },
        { id:11, markerOffset: -20, name: "Oyonnax", coordinates: [5.655335000000036,46.257773],
          languages: [
            { name: "German", value: 83.1 },
            { name: "French", value: 3 },
            { name: "Italian", value: 5.9 },
            { name: "Romansh", value: 0.4 }
          ] },
        { id:12, markerOffset: 37, name: "Pont-de-Vaux", coordinates: [4.938149000000067,46.43027800000001],
          languages: [
            { name: "German", value: 83.1 },
            { name: "French", value: 3 },
            { name: "Italian", value: 5.9 },
            { name: "Romansh", value: 0.4 }
          ] },
        { id:13, markerOffset: 37, name: "Bourg-en-Bresse", coordinates: [5.225500699999998,46.20516749999999],
          languages: [
            { name: "German", value: 83.1 },
            { name: "French", value: 3 },
            { name: "Italian", value: 5.9 },
            { name: "Romansh", value: 0.4 }
          ] },
        { id:14, markerOffset: -20, name: "Ferney-Voltaire", coordinates: [6.1086689999999635,46.25763200000001],
          languages: [
            { name: "German", value: 83.1 },
            { name: "French", value: 3 },
            { name: "Italian", value: 5.9 },
            { name: "Romansh", value: 0.4 }
          ] },


      ]
    }
    this.loadPaths = this.loadPaths.bind(this)
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
    this.handleCitySelection = this.handleCitySelection.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }
  handleCitySelection(evt) {
    console.log(evt.target)
    const cityId = evt.target.getAttribute("data-city")
    const city = this.state.cities[cityId]
    this.setState({
      center: city.coordinates,
      zoom: 10,
    })
  }
  handleReset() {
    this.setState({
      center:  [2.454071, 46.279229],
      zoom: 1,
    })
  }
  componentDidMount() {
    this.loadPaths()
  }
  loadPaths() {
    get("/world-110m.json")
      .then(res => {
        if (res.status !== 200) return
        const france = res.data.features
        // console.log(france.properties)
        // const departements = null//feature(france, france.objects[Object.keys(france.objects)[0]]).features
        this.setState({ geographyPaths: france })
        console.log(this.state.geographyPaths )
      })
  }
  handleZoomIn() {
    this.setState({
      zoom: this.state.zoom * 2,
    })
  }
  handleZoomOut() {
    this.setState({
      zoom: this.state.zoom / 2,
    })
  }
  render() {
    return (
      <div>
        <Button onClick={ this.handleZoomIn } variant="contained" color="primary">
          { "Zoom in" }
        </Button>
        <Button onClick={ this.handleZoomOut } variant="contained" color="primary">
          { "Zoom out" }
        </Button>
        <div style={wrapperStyles}>
          {
            this.state.cities.map((city, i) => (
              <button
                style={this.drButton}
                key={i}
                className="btn px1"
                data-city={i}
                onClick={this.handleCitySelection}
              >
                { city.name }
              </button>
            )).filter(city => city.props.children == 'Bourg-en-Bresse')
          }
          <button onClick={this.handleReset}>
            { "Reset" }
          </button>
        </div>
        <div style={wrapperStyles}>
          <ComposableMap
            projectionConfig={{
              center: [2.454071, 46.279229],
              scale: 2600,

            }}
            width={setSize.width}
            height={setSize.height}
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
              <Geographies geography={this.state.geographyPaths} disableOptimization>
                {(geographies, projection) =>
                  geographies.map((geography, i) =>
                    <Geography
                      key={`${geography.properties.NOM_DEPT}-${i}`}
                      cacheId={`path-${geography.properties.NOM_DEPT}-${i}`}
                      id={`${geography.properties.NOM_DEPT}`}
                      round
                      geography={geography}
                      projection={projection}
                      style={{
                      default: {
                        //fill: "#ECEFF1",
                        //fill: colorScale(geography.properties.NOM_DEPT),
                        fill: colorScale[subregions.indexOf(geography.properties.NOM_REGION)],
                        stroke: "#607D8B",
                        strokeWidth: 0.07,
                        outline: "none",
                      },
                      hover: {
                        //fill: "#FF5722",
                        //fill: colorScale(geography.properties.CODE_DEPT),
                        fill: chroma(colorScale[subregions.indexOf(geography.properties.NOM_REGION)]).darken(0.5),
                        stroke: "#607D8B",
                        strokeWidth: 0.075,
                        outline: "none",
                      },
                      pressed: {
                        //fill: "#FF5722",
                        fill: chroma(colorScale[subregions.indexOf(geography.properties.NOM_REGION)]).brighten(0.5),
                        stroke: "#607D8B",
                        strokeWidth: 0.075,
                        outline: "none",
                      },
                    }}
                  />
                )}
              </Geographies>
{/*              <Markers>
                {
                  this.state.zoom >= 10 ?  this.state.cities.map((city, i) => (
                    <Marker key={i} marker={city}>
                      <circle
                        cx={0}
                        cy={0}
                        r={5}
                        style={{
                          stroke: "#FF5722",
                          strokeWidth: 2,
                          opacity: 0.9,
                        }}
                      />
                      <text
                        textAnchor="middle"
                        y={city.markerOffset}
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: " 5 px",
                          fill: "#607D8B",
                        }}
                      >
                        {city.name}
                      </text>
                    </Marker>


                  )) : ''
                }
              </Markers>*/}
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
                        fill: "#607D8B",
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
        </div>
      </div>
    )
  }
}

export default France
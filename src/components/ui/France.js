import React from "react"
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
import dataSubDgr from '../../static/dataSubDgr'
import dataStructureZoom from '../../static/dataStructureZoom'
import dataSubDr from '../../static/dataSubDr'
import { scaleLinear } from "d3-scale"

import '../../stylesheets/France.css';

const colorScaleDgr = chroma.scale(['#fafa6e','#2A4858']).mode('lch').colors(8)
const colorScaleDr = chroma.scale(['#fafa6e','#2A4858']).mode('lch').colors(26)
const popScale = scaleLinear()
  .domain([0,37,74,111,148,185,222,259,296,333,370,407])
  .range(["rgba(102, 255, 0, 0)",
    "rgba(102, 255, 0, 1)",
    "rgba(147, 255, 0, 1)",
    "rgba(193, 255, 0, 1)",
    "rgba(238, 255, 0, 1)",
    "rgba(244, 227, 0, 1)",
    "rgba(249, 198, 0, 1)",
    "rgba(255, 170, 0, 1)",
    "rgba(255, 113, 0, 1)",
    "rgba(255, 57, 0, 1)",
    "rgba(255, 0, 0, 1)"])

const subDr = dataSubDr
const subDgr = dataSubDgr


class France extends React.Component  {

  constructor(props) {
    super(props)
    this.state = {
      geographyPaths: [],
      allAgence: null,
      didMount: false
    }
    this.loadPaths = this.loadPaths.bind(this)
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this)
    this.handleGeographyClick = this.handleGeographyClick.bind(this)
    this.projection = this.projection.bind(this)
    this.handleDgrSelection = this.handleDgrSelection.bind(this)
    this.handleMoveStart = this.handleMoveStart.bind(this)
    this.handleMoveEnd = this.handleMoveStart.bind(this)
    this.colorMapStyle = this.colorMapStyle.bind(this)
    this.handleDrSelection = this.handleDrSelection.bind(this)
    this.getAgence = this.getAgence.bind(this)
    this.onMouseEnterHandlerAgence = this.onMouseEnterHandlerAgence.bind(this)
  }
  createMarker= () => {
    let markers = []
    let agence = this.getAgence()
    for(let i = 0; i < agence.length; i++) {
      const isGroup = (agence[i].cy!== undefined && agence[i].cx !== undefined)
      markers.push(
        <Marker
          onMouseEnter={this.onMouseEnterHandlerAgence}
          key={i}
          marker={agence[i]}
          style={{
            default: { fill: "#c0392b" },
            hover: { fill: "#FFFFFF" },
            pressed: { fill: "#FF5722" },
          }}
        >
          <circle
            cx={agence[i].cx ? agence[i].cx : 0}
            cy={agence[i].cy ? agence[i].cy : 0}
            r={this.props.niveau === 3 ? 2 : this.props.niveau === 2 ? 5 : this.props.niveau === 1 ? 8 : 0}
            style={{
              stroke: "#ecf0f1",
              strokeWidth: 1,
              opacity: 0.6,
            }}
          />
          { (this.props.niveau === 1) && (<text
            textAnchor="middle"
            y={agence[i].markerOffset}
            style={{
              // display: (isGroup && agence.groupName !== undefined )?"none":"initial",
              fontFamily: "Roboto, sans-serif",
              fill: "#ecf0f1",
              fontSize: "0.6em",
              textShadow: "-1px -1px 0 rgba(44,66,80,0.30),1px -1px 0 rgba(44,66,80,0.30), -1px 1px 0 rgba(44,66,80,0.30),1px 1px 0 rgba(44,66,80,0.30)",
              pointerEvents: "none",
            }}
          >
            {(isGroup || agence[i].groupName !== undefined )? agence[i].groupName : agence[i].name}
          </text>)  }
        </Marker>
      )
    }
    return markers
  }

  handleDgrSelection(evt) {
    const dgrId = evt.currentTarget.getAttribute("datadgr")
    const dgr = dataStructureZoom[dgrId]
    console.log(dgr)
    this.props.onSetLevel(2)
    this.props.onSetCenter(dgr.coordinates)
    this.props.onSetZoom(dgr.zoom)
    this.props.onClearHoverInfo()
    this.props.onSetDgr(dgr)
    this.props.onClearDr()
  }
  handleDrSelection(evt) {
    const dr = this.props.selectedDgr.dr[evt.currentTarget.getAttribute("datadr")]

    this.props.onSetLevel(1)
    this.props.onSetCenter(dr.coordinates)
    this.props.onSetZoom(dr.zoom)
    this.props.onClearHoverInfo()
    this.props.onSetDr(dr)
  }
  projection() {
    return geoTimes()
      .translate([2.454071, 46.279229])
      .scale(2600)
  }
  handleGeographyClick(geography) {
    if(this.props.niveau === 3) {
      const dgrId = geography.properties.CODE_DGR
      const dgr = dataStructureZoom.filter((dgr) => dgr.id === dgrId )[0]

      this.props.onSetLevel(2)
      this.props.onSetCenter(dgr.coordinates)
      this.props.onSetZoom(dgr.zoom)
      this.props.onSetDgr(dgr)

    }
    else if(this.props.niveau === 2) {
      const drId = geography.properties.CODE_DR
      const dr = this.props.selectedDgr.dr.filter((dr) => dr.id === drId)[0]

      this.props.onSetLevel(1)
      this.props.onSetCenter(dr.coordinates)
      this.props.onSetZoom(dr.zoom)
      this.props.onSetDr(dr)
    }
  }
  componentDidMount() {
    // this.loadPaths()
    this.setState({
      didMount: true
    })
  }
  loadPaths() {
    get("/zone_theo_db.geojson")
      .then(res => {
        if (res.status !== 200) return
        const france = res.data.features
        this.setState({ geographyPaths: france })
      })
  }
  handleZoomIn() {
    this.props.onSetZoom(this.props.zoom*1.1)
  }
  handleZoomOut() {
    this.props.onSetZoom(this.props.zoom/1.1)
  }
  handleMoveStart(currentCenter) {
    // console.log("New center: ", `[${currentCenter}], zoom: ${this.state.zoom}`)
  }

  handleMoveEnd(newCenter) {
    // console.log("New center: ", newCenter, this.state.zoom)
  }
  onMouseEnterHandler(a) {
    let hoverInfo = a.properties
    this.props.onSetHoverInfo(hoverInfo)
  }
  colorMapStyle(geography, i) {
    // console.log(subDgr.indexOf(geography.properties.NOM_DGR))
    const colorMap = (this.props.selectedDgr != null) ? {
        default: {
          fill: this.props.showHeatmap ? popScale(i) : colorScaleDr[subDr.indexOf(geography.properties.NOM_DR)],
          stroke: "#607D8B",
          strokeWidth: 0.02,
          outline: "none",
        },
        hover: {
          fill: this.props.showHeatmap ? popScale(i) : chroma(colorScaleDr[subDr.indexOf(geography.properties.NOM_DR)]).darken(0.5),
          stroke: "#607D8B",
          strokeWidth: 0.075,
          outline: "none",
        },
        pressed: {
          fill: this.props.showHeatmap ? popScale(i) : chroma(colorScaleDr[subDr.indexOf(geography.properties.NOM_DR)]).brighten(0.5),
          stroke: "#607D8B",
          strokeWidth: 0.075,
          outline: "none",
        },
      } : {
      default: {
        fill: this.props.showHeatmap ? popScale(i) : colorScaleDgr[subDgr.indexOf(geography.properties.NOM_DGR)],
        stroke: "#FAFAFA",
        strokeWidth: 0.075,
        outline: "none",
    },
      hover: {
        fill: this.props.showHeatmap ? popScale(i) : chroma(colorScaleDgr[subDgr.indexOf(geography.properties.NOM_DGR)]).darken(0.5),
          stroke: "#607D8B",
          strokeWidth: 0.075,
          outline: "none",
      },
      pressed: {
        fill: this.props.showHeatmap ? popScale(i) : chroma(colorScaleDgr[subDgr.indexOf(geography.properties.NOM_DGR)]).brighten(0.5),
          stroke: "#607D8B",
          strokeWidth: 0.075,
          outline: "none",
      },
    }
    return colorMap
  }
  getAgence() {
    let agence = []
    if(this.props.niveau === 3) {
      if(this.state.allAgence === null) {
        console.log('get agence all')
        dataStructureZoom.map(dgr => dgr.dr.map( dr => dr.agence.map(item => agence.push(item)) ) )

        this.setState({
          allAgence: agence
        })
      }else {
        agence = this.state.allAgence
      }
    } else if (this.props.niveau === 2) {
      this.props.selectedDgr.dr.map( dr => dr.agence.forEach(item => agence.push(item) ))

    } else if (this.props.niveau === 1) {
      agence = this.props.selectedDr.agence
    }
    return agence
  }
  onMouseEnterHandlerAgence(a) {
    this.props.onSetHoverAgency(a)
  }
  handleReset() {

    this.props.onSetLevel(3)
    this.props.onSetCenter([2.454071, 46.279229])
    this.props.onSetZoom(1.4641000000000006)
    this.props.onClearHoverAgency()
    this.props.onClearDgr()
    this.props.onClearDr()
  }
  render() {
    this.state.didMount && this.loadPaths()
    const data = this.props.niveau === 3 ? dataStructureZoom : this.props.niveau === 2 ? this.props.selectedDgr.dr : this.props.niveau===1 ? this.props.selectedDr.agence : null
    return (
      <div>
        <div className="wrapperDataVisualisationStyles">
          <ComposableMap
            projectionConfig={{
              center: this.props.center,
              scale: 2600,
            }}
            width={this.props.width}
            height={this.props.height}
            className="wrapperMapStyles"
          >
            <ZoomableGroup center={this.props.center}
                           zoom={this.props.zoom}
                           onMoveStart={this.handleMoveStart}
                           onMoveEnd={this.handleMoveEnd}>
              <Geographies geography={this.state.geographyPaths}
                           disableOptimization
                           >
                {(geographies, projection) =>
                  geographies.filter(geography =>
                      this.props.selectedDgr ? this.props.selectedDr ? this.props.selectedDr.id === geography.properties.CODE_DR :this.props.selectedDgr.id === geography.properties.CODE_DGR : true
                  ).map((geography, i) =>
                    <Geography
                      key={`${geography.properties.id_site}-${i}`}
                      onMouseEnter={this.onMouseEnterHandler}
                      onClick={this.handleGeographyClick}
                      cacheId={`path-${geography.properties.id_site}-${i}`}
                      data-tip={geography.properties.id_site}
                      id={`${geography.properties.id_site}`}
                      round
                      geography={geography}
                      projection={projection}
                      style={this.colorMapStyle(geography, i)}
                  />
                )}
              </Geographies>
              <Markers>
                { this.props.showAgence && this.createMarker() }
              </Markers>
              <Markers>
                { (data !== null && this.props.niveau !== 1) ? data.map((item, i) => (
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
          <MapDescription niveau={this.props.niveau} className="wrapperDescriptionStyles" structure={data}/>
        </div>
      </div>
    )
  }
}

export default France
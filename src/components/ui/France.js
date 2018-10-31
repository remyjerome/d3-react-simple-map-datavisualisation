import React from "react"
import { get } from "axios"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps"
import MapDescription from '../containers/MapNavigation'
import dataStructureZoom from '../../static/dataStructureZoom'
import { scaleLinear } from "d3-scale"
import { mesh, feature } from "topojson-client"
import { geoPath } from 'd3-geo'
import { geoConicConformalFrance } from 'd3-composite-projections'
import Legend_v2 from '../ui/Legend_v2'
import Zoom from '../containers/Zoom'
import ReactTooltip from 'react-tooltip'

import '../../stylesheets/France.css'

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
    this.handleDgrSelection = this.handleDgrSelection.bind(this)
    this.colorMapStyle = this.colorMapStyle.bind(this)
    this.handleDrSelection = this.handleDrSelection.bind(this)
    this.getAgence = this.getAgence.bind(this)
    this.onMouseEnterHandlerAgence = this.onMouseEnterHandlerAgence.bind(this)
    this.scaleColor = this.scaleColor.bind(this)
    this.handleMove = this.handleMove.bind(this)
    this.handleLeave = this.handleLeave.bind(this)
  }

  componentDidMount() {
    this.loadPaths()
  }

  /**
   *  Chargement de la carte
   *  Fichier au format TOPOJSON
   */
  loadPaths() {
    get("/zone_theo_db_noblank.json")
      .then(res => {
        if (res.status !== 200) return
        const world = res.data

        const projection = geoConicConformalFrance()


        const path = geoPath()
          .projection(projection)


        const france = feature(world, world.objects[Object.keys(world.objects)[0]]).features


        // DGR BORDER
        var borderDgr = path(mesh(world, world.objects[Object.keys(world.objects)[0]], this.bdDgr(4, 3)))
        borderDgr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], this.bdDgr(4, 6)))
        borderDgr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], this.bdDgr(4, 5)))
        borderDgr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], this.bdDgr(4, 2)))


        borderDgr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], this.bdDgr(6, 1)))
        borderDgr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], this.bdDgr(6, 2)))
        borderDgr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], this.bdDgr(6, 5)))

        borderDgr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], this.bdDgr(1, 2)))

        borderDgr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], this.bdDgr(2, 8)))
        borderDgr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], this.bdDgr(2, 3)))

        borderDgr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], this.bdDgr(8, 3)))



        borderDgr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return a == b }))

        let borderDrTab = []

        //DR BORDER 1
        var borderDr =  path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a.properties.CODE_DR !== b.properties.CODE_DR) && ( a.properties.CODE_DGR === 1 ) }))
        borderDr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a == b)  && ( a.properties.CODE_DGR === 1 ) }))
        borderDr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a.properties.CODE_DGR !== b.properties.CODE_DGR) && ( a.properties.CODE_DGR === 1 || b.properties.CODE_DGR === 1 )  }))

        borderDrTab.push(borderDr)

        //DR BORDER 2
        var borderDr =  path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a.properties.CODE_DR !== b.properties.CODE_DR) && ( a.properties.CODE_DGR === 2 ) }))
        borderDr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a == b)  && ( a.properties.CODE_DGR === 2 ) }))
        borderDr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a.properties.CODE_DGR !== b.properties.CODE_DGR) && ( a.properties.CODE_DGR === 2 || b.properties.CODE_DGR === 2 )  }))

        borderDrTab.push(borderDr)

        //DR BORDER 3
        var borderDr =  path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a.properties.CODE_DR !== b.properties.CODE_DR) && ( a.properties.CODE_DGR === 3 ) }))
        borderDr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a == b)  && ( a.properties.CODE_DGR === 3 ) }))
        borderDr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a.properties.CODE_DGR !== b.properties.CODE_DGR) && ( a.properties.CODE_DGR === 3 || b.properties.CODE_DGR === 3 )  }))

        borderDrTab.push(borderDr)

        //DR BORDER 4
        var borderDr =  path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a.properties.CODE_DR !== b.properties.CODE_DR) && ( a.properties.CODE_DGR === 4 ) }))
        borderDr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a == b)  && ( a.properties.CODE_DGR === 4 ) }))
        borderDr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a.properties.CODE_DGR !== b.properties.CODE_DGR) && ( a.properties.CODE_DGR === 4 || b.properties.CODE_DGR === 4 )  }))

        borderDrTab.push(borderDr)

        //DR BORDER 5
        var borderDr =  path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a.properties.CODE_DR !== b.properties.CODE_DR) && ( a.properties.CODE_DGR === 5 ) }))
        borderDr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a == b)  && ( a.properties.CODE_DGR === 5 ) }))
        borderDr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a.properties.CODE_DGR !== b.properties.CODE_DGR) && ( a.properties.CODE_DGR === 5 || b.properties.CODE_DGR === 5 )  }))

        borderDrTab.push(borderDr)

        //DR BORDER 6
        var borderDr =  path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a.properties.CODE_DR !== b.properties.CODE_DR) && ( a.properties.CODE_DGR === 6 ) }))
        borderDr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a == b)  && ( a.properties.CODE_DGR === 6 ) }))
        borderDr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a.properties.CODE_DGR !== b.properties.CODE_DGR) && ( a.properties.CODE_DGR === 6 || b.properties.CODE_DGR === 6 )  }))

        borderDrTab.push(borderDr)

        //DR BORDER 7
        var borderDr =  path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a.properties.CODE_DR !== b.properties.CODE_DR) && ( a.properties.CODE_DGR === 7 ) }))
        borderDr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a == b)  && ( a.properties.CODE_DGR === 7 ) }))
        borderDr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a.properties.CODE_DGR !== b.properties.CODE_DGR) && ( a.properties.CODE_DGR === 7 || b.properties.CODE_DGR === 7 )  }))

        borderDrTab.push(borderDr)

        //DR BORDER 8
        var borderDr =  path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a.properties.CODE_DR !== b.properties.CODE_DR) && ( a.properties.CODE_DGR === 8 ) }))
        borderDr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a == b)  && ( a.properties.CODE_DGR === 8 ) }))
        borderDr += path(mesh(world, world.objects[Object.keys(world.objects)[0]], function(a, b) { return (a.properties.CODE_DGR !== b.properties.CODE_DGR) && ( a.properties.CODE_DGR === 8 || b.properties.CODE_DGR === 8 )  }))

        borderDrTab.push(borderDr)

        this.setState({
          geographyPaths: france,
          borderDgr: borderDgr,
          borderDr: borderDrTab
        })
      })
  }

  /**
   *  Creation d'une vue avec DOM-TOM
   */
  projection() {
    return geoConicConformalFrance()
  }
  scaleColor = (data) => {

    let popScale = null
    if(this.props.data === 'MNT_PR') {
      popScale = scaleLinear()
        .domain([-1000000,0,1,25000,50000])
        .range(["rgba(255, 0, 0, 1)",
          "rgba(255, 0, 0, 1)",
          "rgba(193, 255, 0, 1)",
          "rgba(147, 255, 0, 1)",
          "rgba(102, 255, 0, 1)"])
    } else if(this.props.data === 'PCT_AVT') {
      popScale = scaleLinear()
        .domain([0,3,5])
        .range(["rgb(255, 0, 0)",
          "rgb(249, 198, 0)",
          "rgb(102, 255, 0)"])
    } else if (this.props.data === 'MNT_CEX'){
      popScale = scaleLinear()
        .domain([0,1,25000,100000])
        .range(["rgba(238, 255, 0, 1)",
          "rgba(193, 255, 0, 1)",
          "rgba(147, 255, 0, 1)",
          "rgba(102, 255, 0, 1)"])
    }
    return popScale(data)
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

  /**
   *  Création des frontières
   */
  bdDgr(id0, id1) {
    return function(a, b) {
      return a.properties.CODE_DGR === id0 && b.properties.CODE_DGR === id1
        || a.properties.CODE_DGR === id1 && b.properties.CODE_DGR === id0;
    };
  }
  bdDgrDr(id0, id1) {
    return function(a, b) {
      return a.properties.CODE_DR === id0 && b.properties.CODE_DR === id1
        || a.properties.CODE_DR === id1 && b.properties.CODE_DR === id0;
    };
  }
  bdDr(id0, id1) {
    return function(a, b) {
      return a.properties.CODE_DR === id0 && b.properties.CODE_DR === id1
        || a.properties.CODE_DR === id1 && b.properties.CODE_DR === id0;
    };
  }
  renderBorder(d, style) {

    return(
      <g className="rsm-lines">
        <path className="rsm-line " tabIndex="0"
              d={d}
              style={style}></path>
      </g>
    )
  }

  /**
   * Chargement des agences
   */
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

  /**
   * Event cartographie
   */
  handleZoomIn() {
    this.props.onSetZoom(this.props.zoom*1.1)
  }
  handleZoomOut() {
    this.props.onSetZoom(this.props.zoom/1.1)
  }
  onMouseEnterHandler(a) {
    let hoverInfo = a.properties
    this.props.onSetHoverInfo(hoverInfo)
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
  handleMove(geography, evt) {
    const x = evt.clientX
    const y = evt.clientY + window.pageYOffset

  }
  handleLeave() {

  }

  /**
   *  Gestion des couleurs
   */
  colorMapStyle(geography, i) {

    const colorMap = (this.props.selectedDgr != null) ? {
      default: {
        fill: this.props.showHeatmap && this.props.data ? geography.properties.id_site === "exp_outremer" ?'#D3D3D3':this.scaleColor(geography.properties[this.props.data]) :'#D3D3D3',
        stroke: "#607D8B",
        strokeWidth: 0.02,
        outline: "none",
      },
      hover: {
        fill: this.props.showHeatmap && this.props.data ? geography.properties.id_site === "exp_outremer" ?'#D3D3D3': this.scaleColor(geography.properties[this.props.data]) : '#D3D3D3',
        stroke: "#607D8B",
        strokeWidth: 0.075,
        outline: "none",
      },
      pressed: {
        fill: this.props.showHeatmap && this.props.data ? geography.properties.id_site === "exp-outremer" ?'#D3D3D3': this.scaleColor(geography.properties[this.props.data]) : '#D3D3D3',
        stroke: "#607D8B",
        strokeWidth: 0.075,
        outline: "none",
      },
    } : {
      default: {
        fill: this.props.showHeatmap && (this.props.data !== null) ? geography.properties.id_site === "exp-outremer" ?'#D3D3D3': this.scaleColor(geography.properties[this.props.data]) : '#D3D3D3',
        stroke: "#FAFAFA",
        strokeWidth: 0.075,
        outline: "none",
      },
      hover: {
        fill: this.props.showHeatmap && this.props.data ? geography.properties.id_site === "exp-outremer" ?'#D3D3D3': this.scaleColor(geography.properties[this.props.data]) : '#D3D3D3',
        stroke: "#607D8B",
        strokeWidth: 0.075,
        outline: "none",
      },
      pressed: {
        fill: this.props.showHeatmap && this.props.data ? geography.properties.id_site === "exp-outremer" ?'#D3D3D3': this.scaleColor(geography.properties[this.props.data]) : '#D3D3D3',
        stroke: "#607D8B",
        strokeWidth: 0.075,
        outline: "none",
      },
    }
    return colorMap
  }

  render() {
    const data = this.props.niveau === 3 ? dataStructureZoom : this.props.niveau === 2 ? this.props.selectedDgr.dr : this.props.niveau===1 ? this.props.selectedDr.agence : null
    return (
      <div>
        <div className="wrapperDataVisualisationStyles">
          <ReactTooltip/>
          <Zoom/>
          <ComposableMap
            projection={this.projection}
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
                {
                  (geographies, projection) => {
                    return (
                  geographies.filter(geography => {
                    return this.props.selectedDgr ? this.props.selectedDr ? this.props.selectedDr.id === geography.properties.CODE_DR : this.props.selectedDgr.id === geography.properties.CODE_DGR : true
                  }).map((geography, i) =>
                      <Geography
                        key={`${geography.properties.id_site}-${i}`}
                        onMouseEnter={this.onMouseEnterHandler}
                        onMouseMove={this.handleMove}
                        onMouseLeave={this.handleLeave}
                        onClick={this.handleGeographyClick}
                        cacheId={`path-${geography.properties.id_site}-${i}`}
                        data-tip={geography.properties.id_site}
                        id={`${geography.properties.id_site}`}
                        round
                        geography={geography}
                        projection={projection}
                        style={this.colorMapStyle(geography, i)}
                      />
                ))}}
              </Geographies>
              { (this.props.niveau === 3 && this.props.showBorder)&& this.renderBorder(this.state.borderDgr, {stroke: "rgb(0,0,0)", strokeWidth: 0.6, fill: "none"}) }
              { (this.props.niveau === 2 && this.props.showBorder)&& this.renderBorder(this.state.borderDr[this.props.selectedDgr.id-1], {stroke: "#384F59", strokeWidth: 0.6, fill: "none"}) }
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

          <MapDescription niveau={this.props.niveau} className="wrapperDescriptionStyles" structure={data} hoverInfo={this.props.hoverInfo}/>

          { this.props.data === 'MNT_PR' && (<Legend_v2
              width={300}
              domain={[-10000,50000]}
              value={[{offset:'0%',color:-10000},{offset:'5%',color:0},{offset:'8%',color:1},{offset:'80%',color:25000},{offset:'100%',color:50000}]}
              ticks={5}
              title={`Indicateur ${this.props.data}`}
              scaleColor={this.scaleColor}
            />) }
          { this.props.data === 'MNT_CEX' && (<Legend_v2
            width={300}
            domain={[0,100000]}
            value={[{offset:'0%',color:0},{offset:'5%',color:1},{offset:'50%',color:25000},{offset:'100%',color:100000}]}
            ticks={5}
            title={`Indicateur ${this.props.data}`}
            scaleColor={this.scaleColor}
          />) }
          { this.props.data === 'PCT_AVT' && (<Legend_v2
            width={300}
            domain={[0,5]}
            value={[{offset:'0%',color:0},{offset:'50%',color:3},{offset:'100%',color:5}]}
            ticks={5}
            title={`Indicateur ${this.props.data}`}
            scaleColor={this.scaleColor}
          />) }
        </div>
      </div>
    )
  }
}

export default France
import React from "react"
import { get } from "axios"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps"

import dataStructureZoom from '../../static/dataStructureZoom'
import { mesh, feature } from "topojson-client"
import { geoPath } from 'd3-geo'
import { geoConicConformalFrance } from 'd3-composite-projections'
import Zoom from '../containers/Zoom'
import Retour from '../containers/Retour'

import '../../stylesheets/France.css';

var constFranceObj = []

class Francev3 extends React.Component  {
  constructor(props) {
    super(props)

    this.state = {
      geographyPaths: [],
      allAgence: null,
      didMount: false,
      franceObj: []
    }
    this.loadPaths = this.loadPaths.bind(this)
    this.projection = this.projection.bind(this)
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this)
    this.handleGeographyClick = this.handleGeographyClick.bind(this)
    this.handleDgrSelection = this.handleDgrSelection.bind(this)
    this.handleDrSelection = this.handleDrSelection.bind(this)
    this.onMouseEnterHandlerAgence = this.onMouseEnterHandlerAgence.bind(this)
  }
  shouldComponentUpdate(nextProps, nextState) {
      if(this.state.geographyPaths === nextState.geographyPaths ) {
        return this.props.zoom === nextProps.zoom ? false : true
      } else {
        return true
      }
  }

  componentDidMount() {
    this.loadPaths()
    console.log(this.props)
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

        const franceObj = feature(world, world.objects[Object.keys(world.objects)[0]])


        const land = feature(world, {
          type: "GeometryCollection",
          geometries: world.objects.zone_theo_db_noblank.geometries
        })

        const france = land.features

        console.log(franceObj)
        console.log(land)
        constFranceObj = land
        this.setState({
          // franceObj: land,
          geographyPaths: france
        })
      })
  }



  /**
   *  Creation d'une vue avec DOM-TOM
   */
  projection() {
    console.log('call projection')
    return this.props.niveau !== 3 ? geoConicConformalFrance().fitSize([this.props.width, this.props.height], constFranceObj): geoConicConformalFrance()

  }

  handleDgrSelection(evt) {
    const dgrId = evt.currentTarget.getAttribute("datadgr")
    const dgr = dataStructureZoom[dgrId]
    this.props.onSetLevel(2)
    this.props.onSetCenter([0,0])
    this.props.onSetZoom(1)
    this.props.onClearHoverInfo()
    this.props.onSetDgr(dgr)
    this.props.onClearDr()
  }

  handleDrSelection(evt) {
    const dr = this.props.selectedDgr.dr[evt.currentTarget.getAttribute("datadr")]

    this.props.onSetLevel(1)
    this.props.onSetCenter(dr.center)
    this.props.onSetZoom(dr.zoom)
    this.props.onClearHoverInfo()
    this.props.onSetDr(dr)
  }
  handleGeographyClick(geography) {
    if(this.props.niveau === 3) {
      const dgrId = geography.properties.CODE_DGR
      const dgr = dataStructureZoom.filter((dgr) => dgr.id === dgrId )[0]

      this.props.onSetCenter(dgr.center)
      this.props.onSetZoom(dgr.zoom)
      this.props.onSetZoom(1)
      this.props.onSetDgr(dgr)

    }
    else if(this.props.niveau === 2) {
      const drId = geography.properties.CODE_DR
      const dr = this.props.selectedDgr.dr.filter((dr) => dr.id === drId)[0]

      this.props.onSetLevel(1)
      this.props.onSetCenter([0,0])
      this.props.onSetZoom(1)
      this.props.onSetDr(dr)
    }
  }



  /**
   * Event cartographie
   * "zoom": 1.4641000000000006,
   * "center": [2.454071, 46.279229],
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


  render() {
    return (
      <div>
        <div className="wrapperDataVisualisationStyles">
          <div className="mapNav">
            <Zoom/>
            <Retour/>
          </div>
        <div className="wrapperMapStyles">
        <ComposableMap
            projection={this.projection}
            width={this.props.width}
            height={this.props.height}
          >
            <ZoomableGroup
                          center={this.props.center}
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
                          onClick={this.handleGeographyClick}
                          cacheId={`path-${geography.properties.id_site}-${i}`}
                          data-tip={geography.properties.id_site}
                          id={`${geography.properties.id_site}`}
                          round
                          geography={geography}
                          projection={projection}
                        />
                      ))}}
              </Geographies>

            </ZoomableGroup>
          </ComposableMap>
        </div>
        </div>
      </div>
    )
  }
}

export default Francev3
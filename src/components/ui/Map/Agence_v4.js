import React from 'react'
import {get} from "axios"
import * as d3 from "d3"
import {feature, merge, mesh} from "topojson-client"
import ReactTooltip from 'react-tooltip'
import * as L from 'leaflet'

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"


import {geoConicConformalFrance} from 'd3-composite-projections'

import '../../../stylesheets/Agence.css'
import {geoPath} from "d3-geo";
import BaseMap from './BaseMap_v2'

class Agence_v4 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      geographyPaths: [],
      objAgence: [],
      dataAgence:[]
    }
    this.loadPaths = this.loadPaths.bind(this)
    this.projection = this.projection.bind(this)
    this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this)

  }

  colorMapStyle(geography) {



    const colorMap =  {
      default: {
        fill: this.props.showHeatmap && this.props.data ? this.props.scaleColor(geography.properties[this.props.data]) :"#ECEFF1",
        stroke:  "#607D8B",
        strokeWidth: 0.75,
        outline: "none",
      },
      hover: {
        fill: this.props.showHeatmap && this.props.data ? this.props.scaleColor(geography.properties[this.props.data]) : "#607D8B",
        stroke: "#607D8B",
        strokeWidth: 0.75,
        outline: "none",
      },
      pressed: {
        fill: this.props.showHeatmap && this.props.data ? this.props.scaleColor(geography.properties[this.props.data]) : "#FF5722",
        stroke: "#607D8B",
        strokeWidth: 0.75,
        outline: "none",
      }
    }

    return colorMap
  }

  projection() {
    return geoConicConformalFrance().fitSize([this.props.width, this.props.height], this.state.objAgence)
  }


  componentDidMount() {
    // console.log(L)
    this.loadPaths()
    this.props.onSetZoom(0.20)
    // this.addLmaps()
  }


  onMouseEnterHandler() {
    ReactTooltip.rebuild()
  }
  loadPaths() {

    const {width, height, valeur, champ, file, scaleColor} = this.props

    const dataMap = this.props.data

    get(`/${file}.json`)
      .then(res => {
        if (res.status !== 200) return
        const world = res.data

        var agences = feature(world, world.objects[file]),
          agenceMerge = merge(world, world.objects[file].geometries.filter((d) => {
            return d.properties[champ] === valeur
          }))



        d3.dsv(";", "/implentation_clients_consolide.csv", function(d) {
          return {
            ID: d.ID,
            ID_SITE: d.ID_SITE,
            NB_CLI_AB_NA: +d.NB_CLI_AB_NA,
            MNT_PTF_AB_NA: +d.MNT_PTF_AB_NA
          }
        }).then(data => {
          var agencesEff = data.filter((data) => data.ID_SITE === valeur)


          return agencesEff.map((agence,i) => {

            return agences.features.filter(function (d) {
              agence.ID = agence.ID.length === 4 ? `0${agence.ID}`:agence.ID
              // d.properties.ID === agence.ID ? d.properties[dataMap] = agence[dataMap] : null
              d.properties.ID === agence.ID ? d.properties.NB_CLI_AB_NA = agence['NB_CLI_AB_NA'] : null
              d.properties.ID === agence.ID ? d.properties.MNT_PTF_AB_NA = agence['MNT_PTF_AB_NA'] : null
              return (d.properties.ID === agence.ID )
            })[0]
          })
        }).then(agencesEff => {

          var data
          data = agencesEff.filter((d) => d!== undefined)
          // console.log(data)
          this.setState({
            geographyPaths: data
          })

          console.log(this.state.geographyPaths)

        })


        const projection = geoConicConformalFrance().fitSize([this.props.width, this.props.height], agenceMerge)



        const bounds = agenceMerge.coordinates[0]


        console.log(bounds)

        const boundsInverse = bounds[0].map( item => [item[1],item[0]])



        const path = geoPath()
          .projection(projection)

        var borderAgn = path(agenceMerge)





        this.setState({
          objAgence: agenceMerge,
          borderAgn: borderAgn,
          bounds: boundsInverse
        })

      })
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

  addLmaps() {

    // console.log(this.props.center, this.props.zoom)

    var map = L.map('map').setView([this.props.center[1],this.props.center[0]], this.props.zoom);

    L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    L.svg().addTo(map);

  }

  render() {
    const name = this.props.valeur.substring(4).replace(/-/gi,' ')
    return (
      <div className="wrapperMapStyles">
        <BaseMap>
        <h2 style={{
          color: '#6C6C6C'
        }}>{name.charAt(0).toUpperCase()+name.slice(1)}</h2>
        <ComposableMap
          style={{
            opacity:1,
            zIndex: 2
          }}
          projection={this.projection}
          width={this.props.width}
          height={this.props.height}
        >
          <ZoomableGroup
            center={this.props.center}
            zoom={this.props.zoom}>
            <Geographies geography={this.state.geographyPaths}
                         disableOptimization>
              {(geographies, projection) => geographies.map((geography, i) => {
                // console.log('projection',projection([0, 0]))
                // console.log('geography',geography)
                return (
                <Geography
                  key={i}
                  data-tip={`<h3>${geography.properties.ID}</h3><p>${this.props.data}: ${geography.properties[this.props.data]}</p>`}
                  data-for='agn'
                  onMouseEnter={this.onMouseEnterHandler}
                  geography={geography}
                  projection={projection}
                  style={this.colorMapStyle(geography)}
                />
              )})}
            </Geographies>
            { this.props.showBorder && this.renderBorder(this.state.borderAgn, {stroke: "rgb(0,0,0)",strokeDasharray:"20,20", strokeWidth: 2, fill: "none"}) }
          </ZoomableGroup>
        </ComposableMap>
        <ReactTooltip id='agn' html={true}  />
        </BaseMap>
      </div>
    )
  }
}

export default Agence_v4
import React from 'react'
import {get} from "axios"
import * as d3 from "d3"
import {feature, merge, mesh} from "topojson-client"
import ReactTooltip from 'react-tooltip'

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"


import {geoConicConformalFrance} from 'd3-composite-projections'

import '../../stylesheets/Agence.css'
import {geoPath} from "d3-geo";

class Agence_v2 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      geographyPaths: [],
      objAgence: []
    }
    this.loadPaths = this.loadPaths.bind(this)
    this.projection = this.projection.bind(this)
    this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this)

  }
  projection() {
    console.log('call projection')
    return geoConicConformalFrance().fitSize([this.props.width, this.props.height], this.state.objAgence)

  }
  renderMapAgence() {

    const {width, height, valeur, champ, file, scaleColor} = this.props


    var projection = geoConicConformalFrance()

    var path = d3.geoPath()
      .projection(projection)

    var svg = d3.select("#vis").append("svg")
      .attr("width", width)
      .attr("height", height)


    get(`/${file}.json`)
      .then((world, error) => {
        if (error) throw error

        world = world.data

        var states = feature(world, world.objects[file]),
          effective = states.features.filter(function (d) {
            return (d.properties['zone'] === 'effective')
          }),
          test = merge(world, world.objects[file].geometries.filter((d) => {
            return d.properties[champ] === valeur
          })),
          state = states.features.filter(function (d) {
            return (d.properties['zone'] === null)
          }),
          theorique = states.features.filter(function (d) {
            return (d.properties['zone'] === 'theorique')
          }),
          effAgence = states.features.filter(function (d) {
            return (d.properties[champ] === valeur) && (d.properties['zone'] === 'effective')
          }),
          allAgence = states.features.filter(function (d) {
            return (d.properties[champ] === valeur) && (d.properties['zone'] === null)
          }),
          theoAgence = states.features.filter(function (d) {
            return (d.properties[champ] === valeur) && (d.properties['zone'] === 'theorique')
          }),
          dataAgence = states.features.filter(function (d) {
            return (d.properties[champ] === valeur) && (d.properties['nb_cli'] !== null)
          })

        var tmp = []
        dataAgence.map((d) => {

          state.map((x) => {
            if (d.properties.ID === x.properties.ID) {
              x.properties = d.properties
              return tmp.pworldh(x)
            }
          })


        })
        console.log(dataAgence)

        projection
          .scale(1)
          .translate([0, 0])

        var b = path.bounds(test),
          s = .30 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
          t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2]

        projection
          .scale(s)
          .translate(t)

        console.log(tmp)

        tmp.map(d => svg.append("path")
          .datum(d)
          .attr("class", "feature")
          .attr("d", path)
          .attr("fill", this.props.data ? scaleColor(d.properties['nb_cli']) : "red")
        )

        svg.append("path")
          .datum(test)
          .attr("class", "outline")
          .attr("d", path)

      })

  }


  componentDidMount() {
    this.loadPaths()
  }


  onMouseEnterHandler() {
    // let hoverInfo = a.properties
    // this.props.onSetHoverInfo(hoverInfo)
    ReactTooltip.rebuild()
  }
  loadPaths() {

    const {width, height, valeur, champ, file, scaleColor} = this.props

    get(`/${file}.json`)
      .then(res => {
        if (res.status !== 200) return
        const world = res.data

        var agences = feature(world, world.objects[file]),
          agenceTheo = agences.features.filter(function (d) {
            return (d.properties['zone'] === null)
          }),
          agenceCible = merge(world, world.objects[file].geometries.filter((d) => {
            return d.properties[champ] === valeur
          })),
          agenceCibleF = agences.features.filter((d) => {
            return d.properties[champ] === valeur
          }),
          agenceCibleData = agences.features.filter(function (d) {
            return (d.properties[champ] === valeur) && (d.properties['nb_cli'] !== null)
          })

        const projection = geoConicConformalFrance().fitSize([this.props.width, this.props.height], agenceCible)

        const path = geoPath()
          .projection(projection)


        var borderAgn = path(agenceCible)


        var tmp = []
        agenceCibleData.map((d) => {

          agenceTheo.map((x) => {
            if (d.properties.ID === x.properties.ID) {
              x.properties = d.properties
              return tmp.push(x)
            }
          })


        })

        console.log(tmp)
        console.log(world)
        console.log(agenceCible)

        this.setState({
          objAgence: agenceCible,
          geographyPaths: tmp,
          borderAgn: borderAgn
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
  render() {
    return (
      <div className="wrapperMapStyles">
        <h2>{this.props.valeur}</h2>
        <ComposableMap
          projection={this.projection}
          width={this.props.width}
          height={this.props.height}
        >
          <ZoomableGroup
            center={this.props.center}
            zoom={0.20}>
            <Geographies geography={this.state.geographyPaths}>
              {(geographies, projection) => geographies.map((geography, i) => (
                <Geography
                  key={i}
                  data-tip={geography.properties.ID}
                  data-for='agn'
                  onMouseEnter={this.onMouseEnterHandler}
                  geography={geography}
                  projection={projection}
                  style={{
                    default: {
                      fill: "#ECEFF1",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    hover: {
                      fill: "#607D8B",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    pressed: {
                      fill: "#FF5722",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                  }}
                />
              ))}
            </Geographies>
            { this.renderBorder(this.state.borderAgn, {stroke: "rgb(0,0,0)",strokeDasharray:"20,20", strokeWidth: 2, fill: "none"}) }
          </ZoomableGroup>
        </ComposableMap>
        <ReactTooltip id='agn'/>
      </div>
    )
  }
}

export default Agence_v2
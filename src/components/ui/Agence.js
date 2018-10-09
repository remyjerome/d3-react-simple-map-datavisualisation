import React from 'react'
import {get} from "axios"
import * as d3 from "d3"
import {mesh, feature, merge} from "topojson-client"


import {geoConicConformalFrance} from 'd3-composite-projections'

import '../../stylesheets/Agence.css'

class Agence extends React.Component {

  renderMapAgence() {

    const {width, height, valeur, champ, file} = this.props


    var projection = geoConicConformalFrance()

    var path = d3.geoPath()
      .projection(projection)

    var svg = d3.select("#vis").append("svg")
      .attr("width", width)
      .attr("height", height)


    get(`/${file}.json`)
      .then((us, error) => {
        if (error) throw error

        us = us.data

        var states = feature(us, us.objects[file]),
          effective = states.features.filter(function (d) {
            return (d.properties['zone'] === 'effective')
          }),
          test = merge(us, us.objects[file].geometries.filter((d) => {
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
          })

        var tmp = []
        effAgence.map((d) => {

          state.map((x) => {
            if (d.properties.ID === x.properties.ID) {
              return tmp.push(x)
            }
          })


        })

        projection
          .scale(1)
          .translate([0, 0])

        var b = path.bounds(test),
          s = .20 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
          t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2]

        projection
          .scale(s)
          .translate(t)

        tmp.map(d => svg.append("path")
          .datum(d)
          .attr("class", "feature")
          .attr("d", path))

        svg.append("path")
          .datum(mesh(us, us.objects[file], function (a, b) {
            return a.properties[champ] === valeur || b.properties[champ] === valeur
          }))
          .attr("class", "mesh")
          .attr("d", path)




        svg.append("path")
          .datum(test)
          .attr("class", "outline")
          .attr("d", path)

      })

  }

  componentDidMount() {
    this.renderMapAgence()
  }

  render() {
    return (
      <div>
        <h2>{this.props.valeur}</h2>
        <div id="vis">
        </div>
      </div>


    )
  }
}

export default Agence
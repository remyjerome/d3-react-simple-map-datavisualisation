import React from 'react'
import * as d3 from "d3"
import '../../stylesheets/Legend_v2.css'

const style = {
  position: 'absolute',
  bottom: '24px'
}

class Legend_v2 extends React.PureComponent {

  renderLegend() {

    const { width, domain, ticks, title, scaleColor, value } = this.props

    var w = width, h = 70;

    var key = d3.select("#legend1")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    var legend = key.append("defs")
      .append("svg:linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

    value.map((data) => {
      legend.append("stop")
        .attr("offset", `${((data.color+Math.abs(domain[0]))*100)/(domain[1]+Math.abs(domain[0]))}%`)
        .attr("stop-color", scaleColor(data.color))
        .attr("stop-opacity", 1)
    })

    key.append("rect")
      .attr("width", w)
      .attr("height", h -60)
      .style("fill", "url(#gradient)")
      .attr("transform", "translate(0,30)");

    var y = d3.scaleLinear()
      .range([0, width])
      .domain(domain);

    var yAxis = d3.axisBottom()
      .scale(y)
      .ticks(ticks);

    key.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0,40)")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("axis title");

    key.append("text")
      .attr("class", "legendTitle")
      .attr("x", width/2)
      .attr("y", 0)
      .style("text-anchor", "middle")
      .attr("fill", "black")
      .attr("transform", "translate(0,20)")
      .text(title)
  }

  componentDidMount() {
    this.renderLegend()
  }

  render() {
    return (
      <div style={style} id="legend">
        <div id="legend1"></div>
      </div>
    )
  }

}

export default Legend_v2
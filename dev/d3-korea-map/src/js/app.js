import d3 from 'd3'

const mWidth = document.getElementById('map').clientWidth,
  width = 700,
  height = 700,
  initialScale = 5500,
  initialX = -11900,
  initialY = 4050
let centered,
  state

const projection = d3.geo.mercator()
  .scale(initialScale)
  .translate([initialX, initialY])

const path = d3.geo.path()
  .projection(projection)

const svg = d3.select('#map').append('svg')
  .attr('preserveAspectRatio', 'xMidYMid')
  .attr('viewBox', '0 0 ' + width + ' ' + height)
  .attr('width', mWidth)
  .attr('height', mWidth * height / width)

const zoom = xyz => {
  g.transition()
    .duration(650)
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + xyz[2] + ')translate(' + -xyz[0] + ',' + -xyz[1]+ ')')
    .selectAll(['#states'])
    .style('stroke-width', 1.0 / xyz[2] + 'px')
}
const stateClick = d => {
  g.selectAll(".city").remove()
  if (d && state !== d) {
    var xyz = getXyz(d)
    state = d
    d3.json(`../json/${state.properties.CTP_ENG_NM}.json`, json => {
      g.append("g")
        .attr("class", "city")
        .selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("id", d => d.properties.name)
        .attr("d", path.pointRadius(20 / xyz[2]))
      zoom(xyz)
    })
  } else {
    state = null
    zoom([width / 2 , height / 2 , 1])
  }
}

const getXyz = d => {
  let x, y, z
  if (d && centered !== d) {
    const bounds = path.bounds(d),
      wScale = (bounds[1][0] - bounds[0][0]) / width,
      hScale = (bounds[1][1] - bounds[0][1]) / height
    z = .96 / Math.max(wScale, hScale)
    x = (bounds[1][0] + bounds[0][0]) / 2
    y = (bounds[1][1] + bounds[0][1]) / 2
    centered = d
  } else {
    x = width / 2
    y = height / 2
    z = 1
    centered = null
  }
  return [x, y, z]
}

svg.append('rect')
  .attr('class', 'background')
  .attr('width', width)
  .attr('height', height)
  .on('click', stateClick)

const g = svg.append('g')
d3.json('../json/Korea.json', json => {
  g.append('g')
    .attr('id', 'states')
    .selectAll('path')
    .data(json.features)
    .enter()
    .append('path')
    .attr('id', d => d.id )
    .attr('d', path)
    .on('click', stateClick)
})




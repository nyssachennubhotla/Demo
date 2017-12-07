import React, {Component} from 'react';
import {ORFrame} from 'semiotic';
import pdata from './pants.json';
import '../css/DotComponent.css';

var obj_add = 0
var obj_del = 0

var month1a = 0
var month1d = 0
var month2a = 0
var month2d = 0
var month3a = 0
var month3d = 0
var month4a = 0
var month4d = 0
var month5a = 0
var month5d = 0
var month6a = 0
var month6d = 0
var month7a = 0
var month7d = 0
var month8a = 0
var month8d = 0
var month9a = 0
var month9d = 0
var month10a = 0
var month10d = 0
var month11a = 0
var month11d = 0
var month12a = 0
var month12d = 0


for (var i = 0; i < 30; i++){
  // console.log(pdata.length)
  var obj = pdata[i]
  month1a = month1a + obj[1]
  month1d = month1d + obj[2]
  month1d = Math.abs(month1d)
}

for (var i = 30; i < 61; i++){
  // console.log(pdata.length)
  var obj = pdata[i]
  month2a = month2a + obj[1]
  month2d = month2d + obj[2]
  month2d = Math.abs(month2d)
}

for (var i = 61; i < 91; i++){
  // console.log(pdata.length)
  var obj = pdata[i]
  month3a = month3a + obj[1]
  month3d = month3d + obj[2]
  month3d = Math.abs(month3d)
}

for (var i = 92; i < 122; i++){
  // console.log(pdata.length)
  var obj = pdata[i]
  month4a = month4a + obj[1]
  month4d = month4d + obj[2]
  month4d = Math.abs(month4d)
}
for (var i = 123; i < 153; i++){
  // console.log(pdata.length)
  var obj = pdata[i]
  month5a = month5a + obj[1]
  month5d = month5d + obj[2]
  month5d = Math.abs(month5d)
}

for (var i = 154; i < 184; i++){
  // console.log(pdata.length)
  var obj = pdata[i]
  month6a = month6a + obj[1]
  month6d = month6d + obj[2]
  month6d = Math.abs(month6d)
}
for (var i = 185; i < 215; i++){
  // console.log(pdata.length)
  var obj = pdata[i]
  month7a = month7a + obj[1]
  month7d = month7d + obj[2]
  month7d = Math.abs(month7d)
}
for (var i = 216; i < 246; i++){
  // console.log(pdata.length)
  var obj = pdata[i]
  month8a = month8a + obj[1]
  month8d = month8d + obj[2]
  month8d = Math.abs(month8d)
}
for (var i = 247; i < 277; i++){
  // console.log(pdata.length)
  var obj = pdata[i]
  month9a = month9a + obj[1]
  month9d = month9d + obj[2]
  month9d = Math.abs(month9d)
}
for (var i = 277; i < 307; i++){
  // console.log(pdata.length)
  var obj = pdata[i]
  month10a = month10a + obj[1]
  month10d = month10d + obj[2]
  month10d = Math.abs(month10d)
}
for (var i = 307; i < 337; i++){
  // console.log(pdata.length)
  var obj = pdata[i]
  month11a = month11a + obj[1]
  month11d = month11d + obj[2]
  month11d = Math.abs(month11d)
}
for (var i = 338; i < 352; i++){
  // console.log(pdata.length)
  var obj = pdata[i]
  month12a = month12a + obj[1]
  month12d = month12d + obj[2]
  month12d = Math.abs(month12d)
}

const config = {
  className: 'heatMap',
  pieceClass: "heatrects",
  rAccessor: d => d.value,
  oAccessor: d => d.week,
  pieceHoverAnnotation: true
}

const colors = {
  "add": '#00a2ce',
  "del": '#F5DEB3'
}

const dotRadius = 8

const baseData = [
  { week: "January", add: month1a, del: month1d},
  { week: "February", add: month2a, del: month2d},
  { week: "March", add: month3a, del: month3d},
  { week: "April", add: month4a, del: month4d },
  { week: "May", add: month5a, del: month5d },
  { week: "June", add: month6a, del: month6d },
  { week: "July", add: month7a, del: month7d },
  { week: "August", add: month8a, del: month8d },
  { week: "September", add: month9a, del: month9d },
  { week: "October", add: month10a, del: month10d },
  { week: "November", add: month11a, del: month11d },
  { week: "December", add: month12a, del: month12d }
]
const data = [
  ...baseData.map(d => ({ week: d.week , type: "add", value: d.add })),
  ...baseData.map(d => ({ week: d.week, type: "del", value: d.del }))
  ]

const lineAnnotations = baseData.map(d => Object.assign({ type: "range" }, d))

function drawRange({ d, rScale, orFrameState }) {
  if (d.type === "range") {
    const start = rScale(d.add) - dotRadius
    const end = rScale(d.del) + dotRadius
    const y = orFrameState.projectedColumns[d.week].middle
    return <line
      x1={start}
      x2={end}
      y1={y}
      y2={y}
      style={{ stroke: "black", strokeWidth: 2 }}
    />
  }

  return null
}


class DotComponent extends Component{

  render(){


  return (

  <ORFrame
    title={""}
    size={[ 1000,1000 ]}
    data={data}
    rAccessor={d => d.value}
    oAccessor={d => d.week}
    style={(d,i) => ({ fill: colors[d.type], stroke: "white", strokeWidth: 1 })}
    type={{ type: "point", r: dotRadius }}
    projection={"horizontal"}
    axis={{ orient: 'bottom'}}
    margin={{ left: 250, top: 50, bottom: 40, right: 10 }}
    oPadding={10}
    svgAnnotationRules={drawRange}
    pieceHoverAnnotation={config.pieceHoverAnnotation}
    annotations={lineAnnotations}
    oLabel={d => <text style={{ textAnchor: "end" }} transform="translate(0,6)">{d}</text>}
  />
);
}
}
export default DotComponent;
import React, {Component} from 'react';
import {ORFrame} from 'semiotic';
import {timeFormat} from "d3-time-format";
import twissuesData from "./twissues.json";

var formatNameMonth = timeFormat("%B");
var formatMonth = timeFormat("%m");
var formatYear = timeFormat("%Y");


const time_data = twissuesData.filter(d => formatYear(new Date(d.created_at)) == 2016);

var arr = new Array()

for (var i = 0; i < 10; i++){
  if (time_data[i].period_to_close != null){
    var time = time_data[i].period_to_close
    var merge = time_data[i].period_to_merge
    time = time/100000
    console.log(time)
    arr.push(time)
  }
}

//filtering the data for a specific issue

 const data = [  { name: "Issue1", birth: 30, start: arr[1], end: 30},
  { name: "Issue2", birth: 170, start: arr[2], end: 180},
  { name: "Issue3", birth: 18, start: arr[3], end: 100 },
  { name: "Issue4", birth: 18, start: arr[4], end: 100 },
  { name: "Issue5", birth: 19, start: arr[6], end: 100 },
  { name: "Issue6", birth: 19, start: arr[7], end: 100 },
  { name: "Issue7", birth: 19, start: arr[8], end: 100 },
  { name: "Issue8", birth: 19, start: arr[9], end: 120}
  ]

  function timeline({ data, rScale, adjustedSize, margin }) {
  const renderedPieces = [];

  const keys = Object.keys(data);

  keys.forEach(key => {
    //Only one piece of data per column though we'll render multiple graphical elements
    const column = data[key];
    const president = column.pieceData[0];
    console.log(president)

    //Calculate individual start and width of each graphical band
    const birthDate = rScale(president.birth);
    const termStart = rScale(president.start);
    const termEnd = rScale(president.end);
    const preTermWidth = termStart - 100;
    console.log("WIDTH" + preTermWidth)
    const termWidth = termEnd - 100;


    //You can return an array of graphics or an array of objects with extra data (see the Waterfall chart demo)
    const markObject = (
      <g key={`piece-${key}`}>
        <rect
          fill="#00a2ce"
          width={preTermWidth}
          height={column.width}
          x={birthDate}
          y={column.x}
        />
        <rect
          fill="#F5DEB3"
          width={termWidth}
          height={column.width}
          x={termStart}
          y={column.x}
        />

      </g>
    );

    renderedPieces.push(markObject);
  });

  return renderedPieces;
}

class SwarmComponent extends Component{

  render() {
    return (

  <ORFrame
      projection="horizontal"
      data={data}
      size={[700, 700]}
      rExtent={[0, 2000]}
      rAccessor="start"
      oAccessor="name"
      oLabel={(d, i) => (
        <text style={{ textAnchor: "end", opacity: i % 2 ? 0.5 : 1 }} y={4}>
          {d}
        </text>
      )}
      oPadding={3}
      type={{
        type: timeline
      }}
      hoverAnnotation={true}
      tooltipContent={d => (
        <div className="tooltip-content">
          <p>{d.pieces[0].name}</p>
          <p>
            {d.pieces[0].termEnd} - {d.pieces[0].termStart}
          </p>
          <p>
            Issue creation: {time_data[i].created_at}
          </p>
          <p>Issue closed: {time_data[i].closed_at}</p>
        </div>
      )}
      lineStyle={d => ({ fill: d.label, stroke: d.label, fillOpacity: 0.75 })}
      axis={{ orient: "left" }}
      margin={{ left: 140, top: 10, bottom: 50, right: 20 }}
    />
      );
  }
}
export default SwarmComponent;

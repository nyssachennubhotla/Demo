import { MinimapXYFrame } from './MinimapXYFrame';
import { curveMonotoneX } from 'd3-shape';
import React, {Component} from 'react';

const dataSeeds = [20, 10, -10, -20];
const colors = [
  "4d430c",
  "#d38779",
  "#b3331d",
  "#00a2ce",
  "#007190",
  "#b6a756"
];

function generatePoints(start, number) {
  const arrayOfPoints = [];
  let currentValue = start;
  for (let x = 0; x <= number; x++) {
    arrayOfPoints.push({ step: x, value: currentValue });
    currentValue += Math.random() * 10 - 5;
  }
  return arrayOfPoints;
}

const generatedData = dataSeeds.map((s, i) => {
  return {
    label: colors[i],
    coordinates: generatePoints(s, 40)
  };
});

const lineStyle = {
  fill: "#007190",
  stroke: "#007190",
  strokeWidth: 1
};

const xyFrameSettings = {
  lines: generatedData,
  lineType: { type: "line", interpolator: curveMonotoneX },
  xAccessor: "step",
  yAccessor: "value",
  lineStyle: d => ({ fill: d.label, stroke: d.label, fillOpacity: 0.75 }),
  axes: [
    { orient: "left" },
    {
      orient: "bottom",
      ticks: 6
    }
  ]
};
class MapComponent extends Component{
  constructor(props) {
    super(props);
    this.state = { resetExtent: [0, 40], selectedExtent: [0, 40] };
    this.randomizeExtent = this.randomizeExtent.bind(this);
    this.changeExtent = this.changeExtent.bind(this);
  }

    randomizeExtent() {
    const randomStart = parseInt(Math.random() * 25);
    this.setState({ resetExtent: [randomStart, randomStart + 15] });
  }

  changeExtent(e) {
    this.setState({ selectedExtent: [Math.floor(e[0]), Math.ceil(e[1])] });
  }
render(){
return (
  <MinimapXYFrame
      size={[700, 700]}
      {...xyFrameSettings}
      xExtent={selectedExtent}
      matte={true}
      margin={{ left: 50, top: 10, bottom: 50, right: 20 }}
      minimap={{
        margin: { top: 20, bottom: 35, left: 20, right: 20 },
        ...xyFrameSettings,
        brushEnd: brushFunction,
        yBrushable: false,
        xBrushExtent: extent,
        size: [700, 150]
      }}
    />
  );
}
}
export default MapComponent;
import React from "react";
import { ORFrame } from "semiotic";
import twissuesData from "./data/twissues.json";
import {timeFormat} from "d3-time-format";

var formatNameMonth = timeFormat("%B");
var formatMonth = timeFormat("%m");
var formatYear = timeFormat("%Y");
var MAX = 999999999;

//filtering the data for a specific year
const data = twissuesData.filter(d => formatYear(new Date(d.created_at)) == 2016);

class SwarmBrush extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedDataCount: MAX };
    this.brushEnd = this.brushEnd.bind(this);
  }

  brushEnd(e) {
      //reset e if nothing is being brushed
    if(e == null) {
      e = [1, 12];
    }

    //reset selectedDataCount to number of points within brush
    this.setState({
          selectedDataCount: data.filter(d => formatMonth(new Date(d.created_at)) >= e[0] && formatMonth(new Date(d.created_at)) <= e[1])
            .length
        });
  }

  render() {
    return (
        <div>
          <h1>Twemoji Issues: {formatYear(new Date(data[0].created_at))}</h1>
          <ORFrame
            size={[700, 200]}
            data={data}
            rAccessor={d => formatMonth(new Date(d.created_at))}
            oAccessor={() => "singleColumn"}
            style={(d, i) => {
                let fill = d.state == "open" ? '#007190' : '#900000';
                return ({ fill: fill, stroke: 'white', strokeWidth: 1 })
              }
            }
            type={"swarm"}
            summaryType={"violin"}
            summaryStyle={(d, i) => ({
              fill: "#007190",
              stroke: "white",
              strokeWidth: 1
            })}
            projection={"horizontal"}
            axis={{ orient: "left", ticks: 12, tickformat: 1 }}
            rExtent={[1, 12]}
            margin={{ left: 20, top: 0, bottom: 50, right: 20 }}
            oPadding={0}
            interaction={{
              columnsBrush: true,
              extent: { singleColumn: [1, 12] },
              end: this.brushEnd
            }}
          />
          <h2>{this.state.selectedDataCount} Selected Points </h2>
        </div>
      );
  }
}
export default Beeswarm;
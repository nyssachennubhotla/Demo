import React, { Component } from 'react';
import { DotComponent, SwarmComponent } from './VizComponents/';
import './css/style.css';
import './css/bootstrap.min.css';


class App extends Component {
  render() {
    return (
    <div className="App container">
        <svg className="beeswarm"></svg>
        <div className="top-section row">
            <div className="col-md-12 text-center">
                <h1 className="header"> TwitterOSS Metrics Demo </h1>
                <h5>University of San Francisco: CS490 Capstone Project</h5>
                <div className="col-md-8 col-md-offset-2 grey">
                    <h3 className="text-center sub-title">Make informed decisions to help your open source project thrive by measuring and tracking its success.</h3>
                </div>
            </div>
        </div>
        <div className="middle-section row">
            <div className="col-md-8 col-md-offset-2 grey">
                     <h1 className="importance text-center"> Why is this good?</h1>
                     <div className="col-md-12 col-md-offset-0 list">
                        <ul>
                            <li>Understand how users respond to a new feature</li>
                            <li>Figure out where new users come from</li>
                            <li>Identify, and decide whether to support, an outlier use case or functionality</li>
                            <li>Quantify your project’s popularity</li>
                            <li>Understand how your project is used</li>
                            <li>Raise money through sponsorships and grants</li>
                        </ul>
                    </div>
            </div>
        </div>

        <div className="middle-section row">
        <div className="col-md-8 col-md-offset-2 grey">
        <h1 className= "header">Are you committing enough?</h1>
            <div className="viz-section">
                <DotComponent/>
                <h4> Total contributor count and number of commits per contributor: Tells you how many contributors you have, and who’s more or less active. On GitHub, you can view this under “Graphs” -> “Contributors.” Right now, this graph only counts repo level additions and deletions per month to give you a monthly gist.</h4>
            </div>
        </div>
        </div>

         <div className="middle-section row">
        <div className="col-md-8 col-md-offset-2 grey">
        <h1 className= "header">What is your issue creation/closing rate?</h1>
            <div className="viz-section">
                <SwarmComponent/>
                <h4> Number of opened issues and opened pull requests: Opened issues means somebody cares enough about your project to open an issue. If that number increases over time, it suggests people are interested in your project.</h4>
            </div>
        </div>
        </div>
      </div>
    );
  }
}

export default App;

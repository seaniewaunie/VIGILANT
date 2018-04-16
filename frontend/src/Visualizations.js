import React, { Component } from 'react';
import heatmap from './images/heat-map icon.png';
import timeline from './images/timeline icon.png';
import tablechart from './images/table icon.png';
import { Col, Thumbnail } from 'react-bootstrap';
import LineGraphFS from './visuals/LineGraph.js';
import BarChartFS from './visuals/BarChart.js';
import PieChartFS from './visuals/PieChart.js';
//import Routes from './routes';

var XSMALL = 4;
var SMALL = 4;
var MD = 4;
var nameString = "Visualization ";

export default class Visualizations extends Component {
  render() {
    return (
        <div className="Visualizations">
        </div>
    );
  }
}

export class HeatMap extends Component {
    constructor(props){
        super();
        this.state = {
            id : props.id,
        };
    }
    render() {
        return(
            <Thumbnail src={heatmap}/>
        );
    }
}

export class LineGraph extends Component {
    constructor(props){
        super();

        var chartName = nameString + props.id;
        if(props.name !== '') chartName = props.name;

        this.state = {
            id : props.id,
            name : chartName,
        };
    }
    render() {
        return(
            <Col xs={XSMALL} sm={SMALL} md={MD} key={this.state.id}>
                {/*<Thumbnail src={linegraph} />*/}
                <p align='center'>{this.state.name}</p>
                <LineGraphFS
                    name={this.state.name}
                    id={this.state.id}
                />
            </Col>
        );
    }
}


export class PieChart extends Component {
    constructor(props){
        super();

        var chartName = nameString + props.id;
        if(props.name !== '') chartName = props.name;

        this.state = {
            id : props.id,
            name : chartName,
        };
    }
    render() {
        return(
          <Col xs={XSMALL} sm={SMALL} md={MD} key={this.state.id}>
               <p align='center'>{this.state.name}</p>
               <PieChartFS
                   name={this.state.name}
                   id={this.state.id}
               />
           </Col>
        );
    }
}


export class BarChart extends Component {
    constructor(props){
        super();

        var chartName = nameString + props.id;
        if(props.name !== '') chartName = props.name;

        this.state = {
            id : props.id,
            name : chartName,
        };
    }
    render() {
        return(
           <Col xs={XSMALL} sm={SMALL} md={MD} key={this.state.id}>
                <p align='center'>{this.state.name}</p>
                <BarChartFS
                    name={this.state.name}
                    id={this.state.id}
                />
            </Col>
        );
    }
}

export class TimeLine extends Component {
    constructor(props){
        super();
        this.state = {
            id : props.id,
        };
    }
    render() {
        return(
            <Col xs={XSMALL} sm={SMALL} md={MD} key={this.state.id}>
                <Thumbnail src={timeline} />
            </Col>
        );
    }
}

export class TableChart extends Component {
    constructor(props){
        super();
        this.state = {
            id : props.id,
        };

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(){
        console.log("table chart ", this.state.id, " clicked.");
    }

    render() {
        return(
            <Col xs={XSMALL} sm={SMALL} md={MD} key={this.state.id}>
                <Thumbnail href="#" src={tablechart} onClick={this.handleClick} responsive='true'/>
            </Col>
        );
    }
}

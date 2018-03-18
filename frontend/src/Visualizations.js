import React, { Component } from 'react';
import heatmap from './images/heat-map icon.png';
import barchart from './images/barchart icon.png';
import linegraph from './images/line graph icon.png';
import piechart from './images/pie chart icon.png';
import timeline from './images/timeline icon.png';
import tablechart from './images/table icon.png';
import { Col, Thumbnail } from 'react-bootstrap'; 

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
            <Col xs={10} sm={3} md={3} key={this.state.id}>
                <Thumbnail src={heatmap} />
            </Col>
        );
    }
}

export class LineGraph extends Component {
    constructor(props){
        super();
        this.state = {
            id : props.id,
        };
    }
    render() {
        return(
            <Col xs={10} sm={3} md={3} key={this.state.id}>
                <Thumbnail src={linegraph} />
            </Col>
        );
    }
}


export class PieChart extends Component {
    constructor(props){
        super();
        this.state = {
            id : props.id,
        };
    }
    render() {
        return(
            <Col xs={10} sm={3} md={3} key={this.state.id}>
                <Thumbnail src={piechart} />
            </Col>
        );
    }
}


export class BarChart extends Component {
    constructor(props){
        super();
        this.state = {
            id : props.id,
        };
    }
    render() {
        return(
            <Col xs={10} sm={3} md={3} key={this.state.id}>
                <Thumbnail src={barchart} />
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
            <Col xs={10} sm={3} md={3} key={this.state.id}>
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
    }
    render() {
        return(
            <Col xs={10} sm={3} md={3} key={this.state.id}>
                <Thumbnail src={tablechart} />
            </Col>
        );
    }
}




import React, { Component } from 'react';
import {Row} from 'react-bootstrap';
import {LineGraph, PieChart, BarChart} from './Visualizations'

export default class DefaultVisuals extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <b>Default Visuals</b>
        <LineGraph data={this.props.data} id={0} name={''} key={this.state.id} />
        <PieChart data={this.props.data} id={1} name={this.state.name} key={this.state.id} />
        <BarChart data={this.props.data} id={2} name={this.state.name} key={this.state.id} />
      </div>
    );
  }
}

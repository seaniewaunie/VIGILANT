import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import LineGraphFS from './visuals/LineGraph';
import PieChartFS from './visuals/PieChart';
import BarChartFS from './visuals/BarChart';

export default class DefaultVisuals extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <DefaultViewer />
      </div>
    );
  }
}

class DefaultViewer extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <b>Default Visuals</b>
        <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Line Graph">
            <LineGraphFS />
          </Tab>
          <Tab eventKey={2} title="Pie Chart">
            <PieChartFS />
          </Tab>
          <Tab eventKey={3} title="Bar Chart">
            <BarChartFS />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

import React, { Component } from 'react';
import heatmap from './images/heat-map icon.png';
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
    render() {
        return(
            <Col xs={4} sm={4} md={4}>
                <Thumbnail src={heatmap} />
            </Col>
        );
    }
}





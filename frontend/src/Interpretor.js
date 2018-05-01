import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Well} from 'react-bootstrap';

class Interpretor extends Component {
  render () {

    let total = this.props.data.length;
    console.log(this.props.visData);
    let avg = Math.ceil(total/this.props.visData.labels.length);

    return(<Well>
      <b>Interpretations</b>
      <p>Total Num Crimes: <b>{total}</b></p>
      <p>Average Num Crimes over categories: <b>{avg}</b></p>
    </Well>);
  }
}

export default Interpretor;

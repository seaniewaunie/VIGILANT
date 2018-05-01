import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Well} from 'react-bootstrap';

class Interpretor extends Component {
  render () {

    let total = this.props.data.length;
    console.log(this.props.visData);
    let avg = Math.ceil(total/this.props.visData.labels.length);

    return(<Well>

      <p>Total Number of Crimes: <b>{total}</b></p>
      <p>Average Crimes over {this.props.category}: <b>{avg}</b></p>
    </Well>);
  }
}

export default Interpretor;

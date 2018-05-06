import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Well} from 'react-bootstrap';

class Interpretor extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    var total = 0;
    for(var i = 0; i < this.props.visData.datasets[0].data.length; i++) {
        total += this.props.visData.datasets[0].data[i];
    }
    //console.log(this.props.visData);
    let avg = Math.ceil(total/this.props.visData.labels.length);

    // variance
    var sumInSigma = 0;
    for(var i = 0; i < this.props.visData.datasets[0].data.length; i++){
      sumInSigma += Math.pow(this.props.visData.datasets[0].data[i] - avg, 2);
    }
    var sigma = Math.sqrt(1/total*sumInSigma);

    var max = Math.max(...this.props.visData.datasets[0].data);
    var min = Math.min(...this.props.visData.datasets[0].data);



    this.setState({
      total, avg, sigma, max, min
    });
  }

  componentDidMount(){
    this.props.updateVariables(this.state)
  }

  componentWillReceiveProps(nextProps){
    var total = 0;
    for(var i = 0; i < nextProps.visData.datasets[0].data.length; i++) {
        total += nextProps.visData.datasets[0].data[i];
    }
    //console.log(this.props.visData);
    let avg = Math.ceil(total/nextProps.visData.labels.length);

    // variance
    var sumInSigma = 0;
    for(var i = 0; i < nextProps.visData.datasets[0].data.length; i++){
      sumInSigma += Math.pow(nextProps.visData.datasets[0].data[i] - avg, 2);
    }
    var sigma = Math.sqrt(1/total*sumInSigma);

    var max = Math.max(...nextProps.visData.datasets[0].data);
    var min = Math.min(...nextProps.visData.datasets[0].data);

    this.setState({
      total, avg, sigma, max, min
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.avg !== prevState.avg){
      this.props.updateVariables(this.state);
    }
  }

  render () {

    return(<Well>
      <p><b>Current Data Interpretations</b></p>
      <p>Plotting <b>{this.props.data.length}</b> crimes</p>
      <p>average: <b>{this.state.avg}</b></p>
      <p>variance: <b>{Math.ceil(this.state.sigma)}</b></p>
      <p>max: <b>{this.state.max}</b></p>
      <p>min: <b>{this.state.min}</b></p>
    </Well>);
  }
}

export default Interpretor;

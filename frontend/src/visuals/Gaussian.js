import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import linspace from 'linspace';

export default class Gaussian extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount() {
    //console.log(this.props.vars.min, this.props.vars.max);
    var x = [...Array(this.props.vars.max).keys()];

    var y = [];
    for(var i = 0; i < x.length; i++){
      y.push( 1/(this.props.vars.sigma*Math.sqrt(2*Math.PI))*Math.exp(-0.5*Math.pow((x[i]-this.props.vars.avg)/this.props.vars.sigma,2) )  )
    }
    //console.log(x);
    const data = {
      labels: x,
      datasets: [
        {
          label:'combined',
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: y
        }
      ]
    };

    this.setState({
      x, y, data
    });

  }

  componentWillReceiveProps(nextProps){
    //console.log(this.props.vars.min, this.props.vars.max);
    var x = [...Array(nextProps.vars.max).keys()];

    var y = [];
    for(var i = 0; i < x.length; i++){
      y.push( 1/(nextProps.vars.sigma*Math.sqrt(2*Math.PI))*Math.exp(-0.5*Math.pow((x[i]-nextProps.vars.avg)/nextProps.vars.sigma,2) )  )
    }
    //console.log(x);
    const data = {
      labels: x,
      datasets: [
        {
          label:'combined',
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: y
        }
      ]
    };

    this.setState({
      x, y, data
    });
  }

  render() {
    const legendOpts = {
      display: true,
      position: 'top',
      fullWidth: true,
      reverse: false,
      labels: {
        fontColor: 'rgb(255, 99, 132)'
      }
    };
    return (
      <div>
        <Line data={this.state.data} legend={legendOpts}/>
      </div>
    );
  }
}

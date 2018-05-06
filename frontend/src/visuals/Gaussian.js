import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import linspace from 'linspace';

export default class Gaussian extends Component{
  constructor(props){
    super(props);
    this.state = {
      color: [],

    }
    this.calcGauss = this.calcGauss.bind(this);
    this.calcSigma = this.calcSigma.bind(this);
  }

  calcGauss(x, mean, variance){
    var y = [];
    for(var i = 0; i < x.length; i++){
      y.push( 1/(variance*Math.sqrt(2*Math.PI))*Math.exp(-0.5*Math.pow((x[i]-mean)/variance,2) )  )
    }
    return y;
  }

  calcSigma(props, data, mean){
    var total = 0;
    for(var i = 0; i < props.data.datasets[0].data.length; i++) {
        total += props.data.datasets[0].data[i];
    }
    // variance
    var sumInSigma = 0;
    for(var i = 0; i < data.length; i++){
      sumInSigma += Math.pow(data[i] - mean, 2);
    }
    var sigma = Math.sqrt(1/total*sumInSigma);
    return sigma;
  }

  componentWillMount() {
    //console.log(this.props.vars.min, this.props.vars.max);
    var x = [...Array(this.props.vars.max < 100 ? 100 : this.props.vars.max).keys()];

    var y = this.calcGauss(x, this.props.vars.avg, this.props.vars.sigma)
    //console.log(this.props.data);

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
        },
      ]
    };
    // display data for each label, where the mean is each of their percentages
    // first calculate percentages
    var set = [];
    for(var i = 0; i < this.props.data.labels.length; i++){
      if (this.state && this.state.color.length < i+1) {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        this.state.color.push(("rgb(" + r + "," + g + "," + b + ")"));
      }
      var color = "";
      if(this.state){
        color = this.state.color[i];
      }
      else{
        color=random_rgba();
      }
      var setInfo = {
        lineTension: 0.1,
        backgroundColor: color,
        borderColor: color,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: color,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: color,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      };
      setInfo.label = this.props.data.labels[i];
      var avg = this.props.data.datasets[0].data[i];
      var sigma = this.calcSigma(this.props, this.props.data.datasets[0].data, avg);
      setInfo.data = this.calcGauss(x, avg, sigma);
      data.datasets.push(setInfo);
    }


    this.setState({
      x, y, data
    });

  }

  componentWillReceiveProps(nextProps){
    //console.log(this.props.vars.min, this.props.vars.max);
    var x = [...Array(nextProps.vars.max < 100 ? 100 : nextProps.vars.max).keys()];

    var y = this.calcGauss(x, nextProps.vars.avg, nextProps.vars.sigma)
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
    // display data for each label, where the mean is each of their percentages
    // first calculate percentages
    var set = [];
    for(var i = 0; i < nextProps.data.labels.length; i++){
      if (this.state && this.state.color.length < i+1) {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        this.state.color.push(("rgb(" + r + "," + g + "," + b + ")"));
      }
      var color = "";
      if(this.state){
        color = this.state.color[i];
      }
      else{
        color=random_rgba();
      }
      var setInfo = {
        lineTension: 0.1,
        backgroundColor: color,
        borderColor: color,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: color,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: color,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      };
      setInfo.label = nextProps.data.labels[i];
      var avg = nextProps.data.datasets[0].data[i];
      var sigma = this.calcSigma(nextProps, nextProps.data.datasets[0].data, avg);
      setInfo.data = this.calcGauss(x, avg, sigma);
      data.datasets.push(setInfo);
    }

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
    };
    const options ={
      animation: false,
    }
    return (
      <div>
        <Line data={this.state.data} legend={legendOpts} options={options}/>
      </div>
    );
  }
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

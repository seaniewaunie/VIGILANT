// Full Screen impl.
//Notes: currently using dummy data
import React, { Component } from 'react';
import jsonData from '../json/big.js';
import { Bar as BarGraph } from 'react-chartjs-2';

class BarChartFS extends Component {

  constructor(props) {
    super(props);

    this.compress = this.compress.bind(this);
    this.expand = this.expand.bind(this);
    this.getCounts = this.getCounts.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
        fullscreen: false,
        height: 0,
        width: 0,
        name : '',
        data : [],
        //chartOptions : {
    };
  }

  componentWillMount() {
    console.log(this.props.data);
    if(this.props.data !== undefined){
  		this.setState({
        fullscreen: false,
        height: this.props.height,
        width: this.props.width,
        name : this.props.name,
        data : [{
          labels: this.props.data,
          datasets : [
              {
                  label: this.props.name,
                  data: this.getCounts(this.props.data),
              },

          ]
        }],
      })
    }

  }

  componentDidMount() {
    console.log(this.state.data);
  }

  // counts the number of similar values in an array
  // and returns an array of the counts
  getCounts(arr){
    var counts = {};
    for (var i = 0; i < arr.length; i++) {
        counts[arr[i]] = 1 + (counts[arr[i]] || 0);
    }
    console.log(counts);
    return Object.values(counts);
  }



  handleClick() {
    this.setState({fullscreen: !this.state.fullscreen}, () => {
        this.state.fullscreen ? this.expand() : this.compress();
    });

  }

  compress() {
    //this.setState({height:"200", width:"200"});
    console.log("Compressing Visual from full screen");
  }

  expand() {
    //this.setState({height:"150", width:"150"});
    console.log("Expanding Visual to full screen");
  }



 render() {
    return (
        <div className="BarChartFS" onClick={this.handleClick}>
			       <BarGraph data={this.state.data} height={this.state.height} width={this.state.width}/>
        </div>
    );
  }
}
export default BarChartFS;

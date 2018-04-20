// Full Screen
// https://github.com/reactjs/react-chartjs
import React, { Component } from 'react';
import { Line as LineChart } from 'react-chartjs-2';

//console.log(jsonData);

class LineGraphFS extends Component {

  constructor(props) {
    super(props);

    this.compress = this.compress.bind(this);
    this.expand = this.expand.bind(this);
    this.getData = this.getData.bind(this);
    this.getCounts = this.getCounts.bind(this);
    this.handleClick = this.handleClick.bind(this);


    this.state = {
        fullscreen: false,
        height: 200,
        width: 200,
        name : props.name,
        data : this.getData(),
    };
  }

  getData() {
    //var dates = this.props.data.map(dates => dates.date);
    var times = this.props.data.map(times => times.time);

    var data = {
        labels: times,
        datasets : [
            {
                label: "# of Crimes at Different Times",
                data: this.getCounts(times),
            },

        ],
    }
    return data;
  }

  // counts the number of similar values in an array
  // and returns an array of the counts
  getCounts(arr){
    var counts = {};
    for (var i = 0; i < arr.length; i++) {
        counts[arr[i]] = 1 + (counts[arr[i]] || 0);
    }
    //console.log(counts);
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
    const { data, chartOptions } = this.state;
    return (
        <div className="LineChartFS" onClick={this.handleClick}>
            <LineChart data={data} options={chartOptions} height={this.state.height} width={this.state.width}/>
        </div>
    );
  }
}

export default LineGraphFS;

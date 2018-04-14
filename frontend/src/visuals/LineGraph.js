// Full Screen
// https://github.com/reactjs/react-chartjs
import React, { Component } from 'react';
import jsonData from '../json/big.js';
import { Line as LineChart } from 'react-chartjs-2';

console.log(jsonData);

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
        chartOptions : {
            ///Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines : true,

            //String - Colour of the grid lines
            scaleGridLineColor : "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth : 1,

            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,

            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: true,

            //Boolean - Whether the line is curved between points
            bezierCurve : true,

            //Number - Tension of the bezier curve between points
            bezierCurveTension : 0.4,

            //Boolean - Whether to show a dot for each point
            pointDot : true,

            //Number - Radius of each point dot in pixels
            pointDotRadius : 4,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth : 1,

            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius : 20,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke : true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth : 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill : true,
            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>",

            //Boolean - Whether to horizontally center the label and point dot inside the grid
            offsetGridLines : false
        },
    };
    //console.log(this.state.data);
  }

  getData() {
    // this is where the function will be to access the api
    // for data
    // the api will be a link, something like
    // 127.0.0.1:8000/api
    // and will return a json of the data


    var dates = jsonData.map(dates => dates.crimedate);
//    console.log(dates);
    var times = jsonData.map(times => times.crimetime);
    // counting the number of occurances


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
    const { data, chartOptions } = this.state;
    return (
        <div className="LineChartFS" onClick={this.handleClick}>
            <LineChart data={data} options={chartOptions} height={this.state.height} width={this.state.width}/>
        </div>
    );
  }
}

export default LineGraphFS;

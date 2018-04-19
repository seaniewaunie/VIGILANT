// Full Screen impl.
//Notes: currently using dummy data, and displayed with patterned sections for colorblind accessibility issues
import React, { Component } from 'react';
import jsonData from '../json/big.js';
import { Pie as PieChart} from 'react-chartjs-2';
import pattern from 'patternomaly';


class PieChartFS extends Component {

	constructor(props) {
    super(props);

    this.compress = this.compress.bind(this);
    this.expand = this.expand.bind(this);
    this.getData = this.getData.bind(this);
		this.getCounts = this.getCounts.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
        fullscreen: false,
        height: "200",
        width: "200",
        name : props.name,
        data : this.getData(),
		};
	}

	getData() {
    var dates = this.props.data.map(dates => dates.date);
    var times = this.props.data.map(times => times.time);

    var data = {
			labels: dates,
			datasets : [
				{
		      data: this.getCounts(dates),
					backgroundColor: [
					pattern.draw('square', '#ff6384'),
					pattern.draw('circle', '#36a2eb'),
					pattern.draw('diamond', '#cc65fe'),
					pattern.draw('triangle', '#ffce56'),
					]
      	}
	    ],
		};
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
    return (
        <div className="PieChartFS" onClick={this.handleClick}>
					<PieChart legend={false} data={this.state.data} height={this.state.height} width={this.state.width}/>
        </div>
    );
  }
}
export default PieChartFS;

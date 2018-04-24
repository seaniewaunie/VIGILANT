// Full Screen impl.
//Notes: currently using dummy data, and displayed with patterned sections for colorblind accessibility issues
import React, { Component } from 'react';
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
        height: 200,
        width: 200,
        name : props.name,
        data : this.getData(),
		};
	}

	getData() {
		//console.log(this.props.data.dates);
		var all_data = this.props.data;
		//console.log(dates);
		//var times = this.props.data.map(times => times.time);
		var data_array = [];
		var count_array = [];
		for (var i = 0; i < all_data.length; i++) {
			if (!data_array.includes(all_data[i])) {
				data_array.push(all_data[i]);
				count_array.push(1);
				//console.log(dates[i]);
			}
			else {
				var index = data_array.indexOf(all_data[i]);
				count_array[index] = count_array[index] + 1;
			}
		}
		
		var colors = [];
		for (var j = 0; j < data_array.length; j++) {
			var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            colors.push("rgb(" + r + "," + g + "," + b + ")");
		}
		
		
		//sort data_array and count_array simultaneously
		for (var k = 0; k < data_array.length; k++) {
			var min = k;
			for (var l = k + 1; l < data_array.length; l++){
				if (count_array[l] < count_array[min]) {
					min = l;
				}
			}
			if (min != k) {
				var tmp = count_array[k];
				count_array[k] = count_array[min];
				count_array[min] = tmp;
				tmp = data_array[k];
				data_array[k] = data_array[min];
				data_array[min] = tmp;
			}
		}
		
		
		var data = {
			labels: data_array,
			datasets : [{
				data: count_array,
				backgroundColor: colors,
			}]
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

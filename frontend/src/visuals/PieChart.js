// Full Screen impl.
//Notes: currently using dummy data, and displayed with patterned sections for colorblind accessibility issues
import React, { Component } from 'react';
import { Pie as PieChart} from 'react-chartjs-2';
import pattern from 'patternomaly';
import {Well, Col} from 'react-bootstrap';
import axios from 'axios';


class PieChartFS extends Component {

	constructor(props) {
    super(props);

    this.compress = this.compress.bind(this);
    this.expand = this.expand.bind(this);
    this.getData = this.getData.bind(this);
	this.getCounts = this.getCounts.bind(this);
    this.handleClick = this.handleClick.bind(this);
	this.add = this.add.bind(this);
	this.getOptions = this.getOptions.bind(this);
	this.handleHide = this.handleHide.bind(this);


    this.state = {
        fullscreen: false,
        height: 200,
        width: 200,
        name : props.name,
        data : this.getData(),
		background_colors: ["rgb(" + 0 + "," + 0 + "," + 0 + ")"],
		field : this.props.field,
		colors: [],
		restore: this.props.restore,
		};
	}

	getData() {
		var all_data = this.props.data;
		var field = this.props.field;

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
		
		
		//if data is times, group it by hours
		var label_array = data_array;
		if (field === "times") {
			label_array = []
			count_array = []
			for (var i = 0; i < 24; i++) {
				if (i < 10) {
					label_array.push("0" + i + ":00:00");
				}
				else {
					label_array.push( i + ":00:00");
				}
				count_array.push(0);
			}
			
			for (var j = 0; j < all_data.length; j++) {
				for (var k = 0; k < 24; k++) {
					if (all_data[j].slice(0, 2) === label_array[k].slice(0, 2)) {
						count_array[k] = count_array[k] + 1;
					}
				}
			}
			data_array = label_array
		}
		
		//generate random colors for pie chart
		if (this.state && this.state.colors.length <= data_array.length) {
			for (var j = 0; j < data_array.length; j++) {
				var r = Math.floor(Math.random() * 255);
				var g = Math.floor(Math.random() * 255);
				var b = Math.floor(Math.random() * 255);
				this.state.colors.push("rgb(" + r + "," + g + "," + b + ")");
			}
		}
		
		//sort data_array and count_array simultaneously
		for (var k = 0; k < data_array.length; k++) {
			var max = k;
			for (var l = k + 1; l < data_array.length; l++){
				if (count_array[l] > count_array[max]) {
					max = l;
				}
			}
			if (max != k) {
				var tmp = count_array[k];
				count_array[k] = count_array[max];
				count_array[max] = tmp;
				tmp = data_array[k];
				data_array[k] = data_array[max];
				data_array[max] = tmp;
			}
		}
		
		var colors = [];
		if (this.state) {
			colors = this.state.colors;
		}
		else {
			colors = [("rgb(" + 0 + "," + 0 + "," + 0 + ")")];
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

  getOptions() {
	  if(this.props.restore === true) {
		  return { onClick: this.add, };
	  }
  }
  
  add() {
	  console.log("restore visual to screen");
	  this.props.restore_function(this.props.name, this.props.id, "pie", this.props.field);
  }
  
  handleClick() {
    this.setState({fullscreen: !this.state.fullscreen}, () => {
        this.state.fullscreen ? this.expand() : this.compress();
    });

  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  compress() {
    //this.setState({height:"200", width:"200"});
    console.log("Compressing Visual from full screen");
  }

  expand() {
    //this.setState({height:"150", width:"150"});
    console.log("Expanding Visual to full screen");
  }

  handleHide(){
	console.log(this.props.id);
    this.setState({
      hidden: !this.state.hidden,
    })
	var req = ('http://127.0.0.1:8000/api/hide/id=' + this.props.id);
	axios.get(req, {responseType: 'json'})
		.then(response => {
			console.log(response);
		});
	
  }


 render() {
	 
	if(this.state.hidden){
      return null;
    }
	if(this.props.data.length === 0) {
		console.log("empty data pie chart");
      return(
		<Col xs={4} sm={4} md={4} key={this.state.id}>
		   <Well>
			  <p width={this.state.width} height={this.state.height} align='center' style={{textAlign:'center'}}><b>No Crimes to Display</b></p>
		  </Well>
		</Col> );
	}
	else {
		if (this.props.restore === false) {
			return (
				<Col xs={4} sm={4} md={4} key={this.state.id}>
					<Well>
					  <button type="button" class="close" aria-label="Close" onClick={this.handleHide}>
						<span aria-hidden="true">&times;</span>
					  </button>
					  <p align='center'><b>{this.state.name}</b></p>
					  <PieChart
						className="PieChartFS"
						legend={false}
						height={this.state.height}
						data={this.getData()}
						options={this.getOptions()}
						/>
					</Well>
				</Col> 
			);
	  }
	  else {
		  return (
				<Col xs={4} sm={4} md={4} key={this.state.id}>
					<Well>
					  <p align='center'><b>{this.state.name}</b></p>
					  <PieChart
						className="PieChartFS"
						legend={false}
						width={this.state.width}
						height={this.state.height}
						//axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
						//axes
						//colorBars
						//xTickNumber={5}
						//yTickNumber={5}
						data={this.getData()}
						options={this.getOptions()}
						/>
					</Well>
				</Col> 
			);
	  }
	}
  }
}
export default PieChartFS;

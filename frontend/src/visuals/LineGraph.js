import React, {Component} from 'react';
import {Line as LineChart} from 'react-chartjs-2';
import {RingLoader} from 'react-spinners';
import {Well, Col} from 'react-bootstrap';
import axios from 'axios';

export default class LineGraphFS extends Component {
  constructor(props) {
    super(props);

	this.state = {
        fullscreen: false,
        height: 40,
        width: 40,
        name : props.name,
        data : this.getData(),
		field: props.field,
		id: props.id,
		color: [],
		restore: props.restore,
	};
    //this.compress = this.compress.bind(this);
    //this.expand = this.expand.bind(this);
    this.getData = this.getData.bind(this);
	//this.getCounts = this.getCounts.bind(this);
    this.handleClick = this.handleClick.bind(this);
	this.add = this.add.bind(this);
	this.getOptions = this.getOptions.bind(this);
	this.handleHide = this.handleHide.bind(this);

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
	
	//var color = "";
	if (this.state && this.state.color.length < 1) {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		this.state.color.push(("rgb(" + r + "," + g + "," + b + ")"));
	}
	
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
	}
	//console.log(this.state);
	var color = "";
	if (this.state) {
		color = this.state.color[0];
	}
	else {
		color = ("rgb(" + 0 + "," + 0 + "," + 0 + ")");
	}
	var data = {
		labels: label_array,
		datasets : [{
			data: count_array,
			//backgroundColor: colors,
			lineTension: 0,
			fill: false,
			borderColor: color,
			backgroundColor: 'transparent',
			borderDash: [5, 5],
			pointBorderColor: color,
			pointBackgroundColor: color,
			pointRadius: 5,
			pointHoverRadius: 10,
			pointHitRadius: 30,
			pointBorderWidth: 2,
			pointStyle: 'rectRounded'
		}]
	};
	return data;
  }

  getOptions() {
	  if(this.props.restore === true) {
		  return { 
			onClick: this.add, 
			scales: {
				yAxes: [{
					ticks: {
					fontSize: 6
					}
				}],
				xAxes: [{
					ticks: {
					fontSize: 6
					}
				}],
			}
		};
	  }
  }
  
  add() {
	  console.log("restore visual to screen");
	  this.props.restore_function(this.props.name, this.props.id, "line", this.props.field);
  }
  
   componentWillMount() {
    this.setState({
      name: this.props.name,
      data: this.getData(),
	  color: [],
	  restore: this.props.restore,
    });
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


  handleClick() {
    this.setState({fullscreen: !this.state.fullscreen}, () => {
        this.state.fullscreen ? this.expand() : this.compress();
    });

  }

  render() {
	const {data} = this.state;
  
	if(this.state.hidden){
      return null;
    }
    if(this.props.data === undefined){
      return(<RingLoader color={'#123abc'} />);
    }
    else if(this.props.data.length === 0) {
      return(
		<Col xs={4} sm={4} md={4} key={this.state.id}>
		   <Well>
			  <p width={this.state.width} height={this.state.height} align='center' style={{textAlign:'center'}}><b>No Crimes to Display</b></p>
		  </Well>
		</Col> );
	} 
	//console.log(this.state.height);
	if (this.props.restore === false) {
		return (
		 <Col xs={4} sm={4} md={4} key={this.state.id}>
		   <Well>
			  <button type="button" class="close" aria-label="Close" onClick={this.handleHide}>
				<span aria-hidden="true">&times;</span>
			  </button>
			  <p align='center'><b>{this.state.name}</b></p>
			  <LineChart
				className="LineGraphFS"
				legend={false}
				width={this.state.width}
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
			  <LineChart
				className="LineGraphFS"
				legend={false}
				width={this.state.width}
				height={this.state.height}
				data={this.getData()}
				options={this.getOptions()}
			  />
		  </Well>
		</Col> 
		);
	}
  }
}

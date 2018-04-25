import React, {Component} from 'react';
import {Line as LineChart} from 'react-chartjs-2';
import {RingLoader} from 'react-spinners';
import {Well, Col} from 'react-bootstrap';

export default class LineGraphFS extends Component {
  constructor(props) {
    super(props);

    //this.compress = this.compress.bind(this);
    //this.expand = this.expand.bind(this);
    this.getData = this.getData.bind(this);
	this.getCounts = this.getCounts.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
        fullscreen: false,
        height: 40,
        width: 40,
        name : props.name,
        data : this.getData(),
		id: props.id,
		};
	}

	
  getData() {
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
	
	var color = "";
	var r = Math.floor(Math.random() * 255);
	var g = Math.floor(Math.random() * 255);
	var b = Math.floor(Math.random() * 255);
	color = ("rgb(" + r + "," + g + "," + b + ")");
	
	
	//sort data_array and count_array simultaneously
	/* for (var k = 0; k < data_array.length; k++) {
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
	} */
	
	
	var data = {
		labels: data_array,
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

/*   componentWillMount() {
    this.setState({
      name: this.props.name,
      dates: this.props.currentData,
      data: this.mapToDataArray(this.getCounts(this.props.currentData)),
    })
  } */
  // counts the number of similar values in an array
  // and returns an array of the counts
  getCounts(arr){
    var counts = {};
    /* for (var i = 0; i < arr.length; i++) {
        counts[arr[i]] = 1 + (counts[arr[i]] || 0);
    } */
    //console.log("counts returns", counts);
    return counts;
  } 

/*   mapToDataArray(arr){
    var data = [];
    console.log(arr);
    let xName;
    for(var i in arr){
      xName = i;
      if(i === 'null') xName='unspecified';
      data.push({x: xName, y: arr[i]});
    }
    console.log('map to data returns: ', data)
    return data;
  } */

  handleClick() {
    this.setState({fullscreen: !this.state.fullscreen}, () => {
        this.state.fullscreen ? this.expand() : this.compress();
    });

  }
/*   shouldComponentUpdate(nextProps, nextState) {
    return true;
  } */

  render() {

 /*    if(this.state.data === undefined){
      return(<RingLoader color={'#123abc'} />);
    }
    else if(this.state.data.length === 0) {
      return(<p style={{textAlign:'center'}}>No Crimes to Display</p>);
	} */
	console.log(this.state.height);
    return (
		/* <div className="LineGraphFS" onClick={this.handleClick}>
			<LineChart legend={false} data={this.state.data} height={this.state.height} width={this.state.width}/>
        </div> */
     <Col xs={4} sm={4} md={4} key={this.state.id}>
       <Well>
          <p align='center'><b>{this.state.name}</b></p>
          <LineChart
            className="LineGraphFS"
			legend={false}
            width={this.state.width}
			height={this.state.height}
            //axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
            //axes
            //colorBars
            //xTickNumber={5}
            //yTickNumber={5}
            data={this.state.data}
          />
      </Well>
    </Col> 
    );
  }
}

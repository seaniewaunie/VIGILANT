import React, {Component} from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import {RingLoader} from 'react-spinners';
import {Well, Col} from 'react-bootstrap';

export default class BarChartFS extends Component {
  constructor(props) {
    super(props);

    //this.compress = this.compress.bind(this);
    //this.expand = this.expand.bind(this);
    this.getData = this.getData.bind(this);
	//this.getCounts = this.getCounts.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleLocalFilter = this.handleLocalFilter.bind(this);

    this.state = {
        fullscreen: false,
        name : props.name,
        data : this.getData(),
		    field: props.field,
		    id: props.id,
        height: this.props.data.length > 20 ? 120 : 50,
		};
	}


  getData() {
	var all_data = this.props.data;
	var field = this.props.field;
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
		console.log(all_data);

		console.log(all_data[0].slice(0, 2));
		for (var j = 0; j < all_data.length; j++) {
			for (var k = 0; k < 24; k++) {
				if (all_data[j].slice(0, 2) === label_array[k].slice(0, 2)) {
					count_array[k] = count_array[k] + 1;
				}
			}
		}
		console.log(label_array);
		console.log(count_array);

	}

	//sort from greatest to least on count 
	for (var k = 0; k < label_array.length; k++) {
			var max = k;
		for (var l = k + 1; l < label_array.length; l++){
			if (count_array[l] > count_array[max]) {
				max = l;
			}
		}
		if (max != k) {
			var tmp = count_array[k];
			count_array[k] = count_array[max];
			count_array[max] = tmp;
			tmp = label_array[k];
			label_array[k] = label_array[max];
			label_array[max] = tmp;
		}
	}

	var data = {
		labels: label_array,
		datasets : [{
			data: count_array,

      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
      hoverBackgroundColor: color,
      hoverBorderColor: color,
		}]
	};

	return data;
  }

   componentWillMount() {
    this.setState({
      name: this.props.name,
      data: this.getData(),
      height: this.props.data.length > 20 ? 120 : 50
    });

  }


  handleClick() {
    this.setState({fullscreen: !this.state.fullscreen}, () => {
        this.state.fullscreen ? this.expand() : this.compress();
    });

  }

  handleHide(){
    this.setState({
      hidden: !this.state.hidden,
    })
  }

  handleLocalFilter(){

  }


  render() {
	const data = this.getData();
  var height = data.labels.length > 20 ? (data.labels.length > 40 ? 600 : 500) : 200;
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

    if(this.state.hidden){
      return null;
    }
	//console.log(this.state.height);
    return (
      <Col xs={4} sm={4} md={4} key={this.state.id}>
       <Well>
         <div className='VisualName'><b>{this.state.name}</b></div>
         <div className='VisualButtons'>
           <button onClick={this.handleHide}>hide</button>
           <button onClick={this.handleLocalFilter}>local</button>
         </div>
          <HorizontalBar
            height={height}
            className="BarGraphFS"
			      legend={false}
            data={data}
          />
      </Well>
    </Col>
    );
  }
}

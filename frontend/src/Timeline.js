import React, {Component} from 'react';
import {Bar as BarChart} from 'react-chartjs-2';
import './css/Timeline.css';
import {RingLoader} from 'react-spinners';

export default class Timeline extends Component {
  constructor(props){
    super(props);

	this.state = {
        data : this.getData(),
		color: ("rgb(" + 0 + "," + 0 + "," + 255 + ")"),
	};
	
    this.getData = this.getData.bind(this);
	this.getOptions = this.getOptions.bind(this);
  }


  
  getData() {
	var all_data = this.props.data;
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
	if (this.state) {
		color = this.state.color;
	}
	else {
		color = ("rgb(" + 0 + "," + 0 + "," + 255 + ")");
	}
	var data = {
		labels: data_array,
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
  
  getOptions() {
	var options = {
		scales: {
			xAxes: [{
				type: 'time',
				unit: 'day',
				distribution: 'linear',
				gridLines: {
					display: false,
				 },
			}],
			yAxes: [{
				//display: false,
				gridLines : {
					display : false,
					drawBorder: false,
				},
			}]

		}
	}
	return options;
  }
  
  componentWillMount() {
    this.setState({
      data: this.getData(),
	  color: ("rgb(" + 0 + "," + 0 + "," + 255 + ")"),
    })
  }


  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {

    if(this.props.data === undefined){
      return(<RingLoader color={'#123abc'} />);
    }
    else if(this.props.data.length === 0)
      return(<p style={{textAlign:'center'}}>No Crimes to Display</p>);

    return (
      <div>
        <BarChart
          className="timeline"
		  legend={false}
          width={window.innerWidth*parseFloat(this.props.width)/100-30}
          barWidth={5}
          height={100}
          xTickNumber={5}
          yTickNumber={5}
          data={this.getData()}
		  options={this.getOptions()}
        />
      </div>
    );
  }
}

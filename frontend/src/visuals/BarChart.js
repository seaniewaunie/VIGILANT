// Full Screen impl.
import React, { Component } from 'react';
import jsonData from '../json/big.js';
import { Bar as BarGraph } from 'react-chartjs';

class BarChartFS extends Component {
	
	constructor(props) {
    super(props);
    
    this.compress = this.compress.bind(this);
    this.expand = this.expand.bind(this);
    this.getData = this.getData.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
        fullscreen: false,
        height: "200",
        width: "200",
        name : props.name,
        data : this.getData(),
        //chartOptions : {
	
		};
	}	
	
	getData() {
    // this is where the function will be to access the api
    // for data
    // the api will be a link, something like
    // 127.0.0.1:8000/api
    // and will return a json of the data
    var data = {
        labels: [ "January", "February", "March", "April", "May", "June", "July"],
        datasets : [
            {
                label: "My First dataset",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
        ],
    }
    return data;
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
	/*const x_axis = [
        {
            accessor: 'premise', 
            Header: 'premise',

        },
	];*/
	
	const {data} = this.state; 
    return (
        <div className="BarChartFS" onClick={this.handleClick}>
			<BarGraph data={data} height={this.state.height} width={this.state.width}/> 
        </div>
    );
  }
}
export default BarChartFS;

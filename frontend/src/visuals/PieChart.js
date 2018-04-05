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
		datasets : [
            {
                data: [10, 20, 30, 40],
				backgroundColor: [
				pattern.draw('square', '#ff6384'),
				pattern.draw('circle', '#36a2eb'),
				pattern.draw('diamond', '#cc65fe'),
				pattern.draw('triangle', '#ffce56'),
				]
            }
        ],
		labels: [ "January", "February", "March", "April"]
    };
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
	
	const {data} = this.state; 
    return (
        <div className="PieChartFS" onClick={this.handleClick}>
			<PieChart data={data} height={this.state.height} width={this.state.width}/> 
        </div>
    );
  }
}
export default PieChartFS;
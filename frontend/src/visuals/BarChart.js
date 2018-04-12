// Full Screen impl.
//Notes: currently using dummy data
import React, { Component } from 'react';
import jsonData from '../json/big.js';
import { Bar as BarGraph } from 'react-chartjs-2';

class BarChartFS extends Component {
	
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
        //chartOptions : {
	
    };
  }	
    
  getData() {
    // this is where the function will be to access the api
    // for data
    // the api will be a link, something like
    // 127.0.0.1:8000/api
    // and will return a json of the data

    var dates = jsonData.map(dates => dates.crimedate);
    var times = jsonData.map(times => times.crimetime);

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
    const {data} = this.state; 
    return (
        <div className="BarChartFS" onClick={this.handleClick}>
			<BarGraph data={data} height={this.state.height} width={this.state.width}/> 
        </div>
    );
  }
}
export default BarChartFS;

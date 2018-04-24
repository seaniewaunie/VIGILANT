import React, {Component} from 'react';
import {BarChart} from 'react-easy-chart';
import {RingLoader} from 'react-spinners';
import {Well, Col} from 'react-bootstrap';

export default class BarChartFS extends Component {
  constructor(props){
    super(props);

    this.state = {
      dates: [],
      data: {},
    }
    this.getCounts = this.getCounts.bind(this);
    this.mapToDataArray = this.mapToDataArray.bind(this);
  }

  componentWillMount() {
    this.setState({
      name: this.props.name,
      dates: this.props.currentData,
      data: this.mapToDataArray(this.getCounts(this.props.currentData)),
    })
  }
  // counts the number of similar values in an array
  // and returns an array of the counts
  getCounts(arr){
    var counts = {};
    for (var i = 0; i < arr.length; i++) {
        counts[arr[i]] = 1 + (counts[arr[i]] || 0);
    }
    //console.log("counts returns", counts);
    return counts;
  }

  mapToDataArray(arr){
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
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {

    if(this.props.currentData === undefined){
      return(<RingLoader color={'#123abc'} />);
    }
    else if(this.props.currentData.length === 0)
      return(<p style={{textAlign:'center'}}>No Crimes to Display</p>);

    return (
     <Col xs={4} sm={4} md={9} key={this.state.id}>
       <Well>
          <p align='center'><b>{this.state.name}</b></p>
          <BarChart
            className="timeline"
            width={850}
            axisLabels={{x: 'My x Axis', y: 'Number of Crimes'}}
            axes
            colorBars
            xTickNumber={5}
            yTickNumber={5}
            data={this.mapToDataArray(this.getCounts(this.props.currentData))}
          />
      </Well>
    </Col>
    );
  }
}

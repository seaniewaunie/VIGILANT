import React, {Component} from 'react';
import {BarChart} from 'react-easy-chart';
import './css/Timeline.css';
import {RingLoader} from 'react-spinners';

export default class Timeline extends Component {
  constructor(props){
    super(props);

    this.state = {
      dates: this.props.dates,
      data: this.mapToDataArray(this.getCounts(this.props.dates)),
    }
    this.getCounts = this.getCounts.bind(this);
    this.mapToDataArray = this.mapToDataArray.bind(this);
  }


  componentWillMount() {
    this.setState({
      dates: this.props.dates,
      data: this.mapToDataArray(this.getCounts(this.props.dates)),
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
    for(var i in arr){
      data.push({x: i, y: arr[i]});
    }
    console.log('map to data returns: ', data)
    return data;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {

    if(this.props.dates === undefined){
      return(<RingLoader color={'#123abc'} />);
    }
    else if(this.props.dates.length === 0)
      return(<p style={{textAlign:'center'}}>No Crimes to Display</p>);

    return (
      <div>
        <BarChart
          className="timeline"
          width={window.innerWidth*parseFloat(this.props.width)/100-30}
          barWidth={5}
          height={30}
          xTickNumber={5}
          yTickNumber={5}
          data={this.mapToDataArray(this.getCounts(this.props.dates))}
        />
      </div>
    );
  }
}

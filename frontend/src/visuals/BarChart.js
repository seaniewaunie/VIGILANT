import React, {Component} from 'react';
import {BarChart} from 'react-easy-chart';
import {RingLoader} from 'react-spinners';
import {Well, Col} from 'react-bootstrap';
import '../css/Barchart.css';

export default class BarChartFS extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: {},
      hidden: false,
    }
    this.getCounts = this.getCounts.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleLocalFilter = this.handleLocalFilter.bind(this);
    this.mapToDataArray = this.mapToDataArray.bind(this);
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
  }

  componentWillMount() {
    this.setState({
      name: this.props.name,
      showToolTip: false,
      hidden: false,
    })
  }

  mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: `${e.screenY - 10}px`,
      left: `${e.screenX + 10}px`,
      y: d.y,
      x: d.x
    });
  }

  mouseMoveHandler(e) {
    if (this.state.showToolTip) {
      this.setState({top: `${e.y - 10}px`, left: `${e.x + 10}px`});
    }
  }

  mouseOutHandler() {
    this.setState({showToolTip: false});
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

  handleHide(){
    this.setState({
      hidden: !this.state.hidden,
    })
  }

  handleLocalFilter(){

  }

  render() {

    if(this.props.currentData === undefined){
      return(<RingLoader color={'#123abc'} />);
    }
    else if(this.props.currentData.length === 0)
      return(
    		<Col xs={4} sm={4} md={9} key={this.state.id}>
    		   <Well>
    			  <p width={850} align='center' style={{textAlign:'center'}}><b>No Crimes to Display</b></p>
    		  </Well>
    		</Col>
    );

    var toolTip = [];
    if(this.state.showToolTip){
      toolTip.push(
        <div>
          <p className='row'>{this.state.x}</p>
          <p>{this.state.y} of {this.props.currentData.length} crimes ({Math.ceil((this.state.y/this.props.currentData.length)*100)}%)</p>
        </div>
      );
    }

    if(this.state.hidden){
      return null;
    }

    return (
       <Well>
          <div className='VisualName'><b>{this.state.name}</b></div>
          <div className='VisualButtons'>
            <button onClick={this.handleHide}>hide</button>
            <button onClick={this.handleLocalFilter}>local</button>
          </div>
          <BarChart
            className="rd3-barchart-xaxis"
            width={window.innerWidth*parseFloat(this.props.width)/100-40}
            axisLabels={{x: 'My x Axis', y: 'Number of Crimes'}}
            axes
            colorBars
            xTickNumber={5}
            yTickNumber={5}
            mouseOverHandler={this.mouseOverHandler}
            mouseOutHandler={this.mouseOutHandler}
            data={this.mapToDataArray(this.getCounts(this.props.currentData))}
          />
        {toolTip}
      </Well>
    );
  }
}

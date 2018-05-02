import React, { Component } from 'react';
import logo from './logo.svg';
import './css/Header.css';
import { Button, Col, Grid, FormGroup, ControlLabel, FormControl, HelpBlock, Tooltip, Thumbnail, Navbar, Nav, NavItem, Modal, OverlayTrigger, Row } from 'react-bootstrap';
import barchart from './images/barchart icon.png';
import linegraph from './images/line graph icon.png';
import piechart from './images/pie chart icon.png';
import LineGraph, {PieChart} from './Visualizations'
import BarChartFS from './visuals/BarChart';
import LineGraphFS from './visuals/LineGraph';
import PieChartFS from './visuals/PieChart';
import DataTypeSelector from './DataTypeSelector.js';
import {RingLoader} from 'react-spinners';
import axios from 'axios';

var NAME_LENGTH = 40;
var VIS_PER_ROW = 3;

class Header extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
          <div>
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand> <img src={logo} className="Header-logo" alt="logo" /> </Navbar.Brand>
                <Navbar.Brand>
                    <a href="#home">VIGILANT</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <AddVisualization
                  data={this.props.data}
                  addOne={this.props.addOne}
                  hideOne={this.props.hideOne}
                  counter={this.props.counter}
                />


                <Nav pullRight>
                  <NavItem eventKey={4} href="#Table">Table</NavItem>
                  <NavItem eventKey={1} href="#">Hide</NavItem>
					<RestoreVisualization eventKey={2}
						data={this.props.data}
						addOne={this.props.addOne}
						hideOne={this.props.hideOne}
						counter={this.props.counter}
					/>
                  <NavItem eventKey={3} onClick={this.props.toggleGlobalFilter}>Global Filter</NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            {this.props.children}
          </div>
        );
    }
}

class AddVisualization extends Component {
  constructor(props, context) {
    super(props, context);

    this.getValidationState = this.getValidationState.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleHeatMap = this.handleHeatMap.bind(this);
    this.handleBarChart = this.handleBarChart.bind(this);
    this.handleLineGraph = this.handleLineGraph.bind(this);
    this.handlePieChart = this.handlePieChart.bind(this);
    this.handleTimeLine = this.handleTimeLine.bind(this);
    this.handleTableChart = this.handleTableChart.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.updateRequest = this.updateRequest.bind(this);

    this.addOne = this.props.addOne.bind(this);
    this.hideOne= this.props.hideOne.bind(this);

    this.state = {
      show: false,
      selected: false,
      selectedData: 'days',
      type: '',
      id: props.counter,
      name : '',
      crimesInfo : this.props.data,
      dataTypeSelections: [
        {label: 'Days', value: 'days',},
        {label: 'Dates', value: 'dates'},
        //{label: 'Neighborhoods', value: 'neighborhoods'},
        {label: 'Descriptions', value: 'descriptions'},
        {label: 'Times', value: 'times'},
        {label: 'Codes', value: 'codes'},
        {label: 'Weapons', value: 'weapons'},
        {label: 'Districts',  value: 'districts'},
        {label: 'Indoor/Outdoor', value: 'doors'},
        //{label: 'Addresses', value: 'addresses'},
        {label: 'Premises', value: 'premises'},
      ],
    };
  }

  handleClose() {
    this.setState({ show: false, selected: false, type: '', name: '' });
  }

  handleShow() {
    this.setState({ show: true });
  }

  async handleAdd(){
    //console.log(this.props.data);
    if(this.state.name.length < NAME_LENGTH){
      var element;
	  var info = {
		  type: "",
		  name: "",
		  key: 0,
		  id: 0,
		  field: "",
	  };
	  var result;
	  var new_id;
      switch(this.state.type){
          case 'Bar Chart':
			  var req = ('http://127.0.0.1:8000/api/add/name='+
				this.state.name + '&type=' + 'bar' + '&field=' + this.state.selectedData
			  );
			  result = await axios.get(req);
			  new_id = result.data.visual_id;
			  info.type = "bar";
			  info.name = this.state.name;
			  info.key = new_id;
			  info.id = new_id;
			  info.field = this.state.selectedData;
			  console.log(info);
			  element = <BarChartFS name={this.state.name} key={new_id} id={new_id} currentData={this.props.data[this.state.selectedData]}/>;
              break;
          case 'Line Graph':
			  var req = ('http://127.0.0.1:8000/api/add/name='+
				this.state.name + '&type=' + 'line' + '&field=' + this.state.selectedData
			  );
			  result = await axios.get(req);
			  new_id = result.data.visual_id;
			  info.type = "line";
			  info.name = this.state.name;
			  info.key = new_id;
			  info.id = new_id;
			  info.field = this.state.selectedData;
			  console.log(info);
              element = <LineGraphFS data={this.props.data[this.state.selectedData]}  id={new_id} name={this.state.name} key={new_id}/>;
              break;
          case 'Pie Chart':
			  var req = ('http://127.0.0.1:8000/api/add/name='+
				this.state.name + '&type=' + 'pie' + '&field=' + this.state.selectedData
			  );
			  result = await axios.get(req);
			  new_id = result.data.visual_id;
			  info.type = "pie";
			  info.name = this.state.name;
			  info.key = new_id;
			  info.id = new_id;
			  info.field = this.state.selectedData;
			  console.log(info);
              element = <PieChartFS data={this.props.data[this.state.selectedData]}  id={new_id} name={this.state.name} key={new_id} />;
              break;
          default:
              console.log("error, unhandled element selected in Add visualization: ", this.state.type);
      }
      this.handleClose();
      this.setState({ selected: false, type: '' }, () => { this.addOne(element, info); });
    }
  }


  getValidationState() {
    const length = this.state.name.length;
    if(length === 0) return 'warning';
    else if (length > 0 && length < NAME_LENGTH) return 'success';
    else return 'error';
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleHeatMap() {
    this.setState({ selected: true, type: 'Heat Map' });
  }

  handleBarChart() {
    this.setState({ selected: true, type: 'Bar Chart', id: this.state.id+1}, this.handleAdd);
  }

  handleLineGraph() {
    this.setState({ selected: true, type: 'Line Graph', id: this.state.id+1}, this.handleAdd);
  }

  handlePieChart() {
    this.setState({ selected: true, type: 'Pie Chart', id: this.state.id+1}, this.handleAdd);
  }


  handleTimeLine() {
    this.setState({ selected: true, type: 'Timeline' });
  }


  handleTableChart() {
    this.setState({ selected: true, type: 'Table Chart' });
  }

  updateRequest(selectedData){
    this.setState({selectedData})
  }

  render() {
    const bartip = <Tooltip id="tooltip-modal">Bar Chart</Tooltip>;
    const linetip = <Tooltip id="tooltip-modal">Line Graph</Tooltip>;
    const pitip = <Tooltip id="tooltip-modal">Pie Chart</Tooltip>;

    if(this.props.data === undefined){
      return null;
    }

    return (
    <Nav>
      <NavItem eventKey={0} onClick={this.handleShow}>
        Add Visualization
      </NavItem>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                {/*<form>*/}
                    <FormGroup
                      controlId="formBasicText"
                      validationState={this.getValidationState()}
                    >
                      <ControlLabel>Add Visualization</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.name}
                        placeholder="Visualization Name"
                        onChange={this.handleChange}
                      />
                      <FormControl.Feedback />
                      <HelpBlock>After entering a name, click on which visualization you would like</HelpBlock>
                    </FormGroup>
              {/*</form>*/}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DataTypeSelector
              multi={false}
              updateRequest={this.updateRequest}
              key={305}
              selections={this.state.dataTypeSelections}
              default={'Days'}
              title='Select Data to for Visual'
            />
            <Grid>
              <Row className="show-grid">
                <Col xs={4} sm={3} md={2}>
                    <OverlayTrigger placement="top" overlay={pitip}>
                    <Thumbnail src={piechart} onClick={this.handlePieChart} />
                    </OverlayTrigger>
                </Col>
                <Col xs={4} sm={3} md={2}>
                    <OverlayTrigger placement="top" overlay={bartip}>
                    <Thumbnail src={barchart} onClick={this.handleBarChart} />
                    </OverlayTrigger>
                </Col>
                <Col xs={4} sm={3} md={2}>
                    <OverlayTrigger placement="top" overlay={linetip}>
                    <Thumbnail placement="top"src={linegraph} onClick={this.handleLineGraph} />
                    </OverlayTrigger>
                </Col>
              </Row>
            </Grid>
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
      </Modal>
    </Nav>
    );
  }
}


class RestoreVisualization extends Component {
	constructor(props, context) {
		super(props, context);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.getRestorables = this.getRestorables.bind(this);
		this.restore = this.restore.bind(this);

		this.addOne = this.props.addOne.bind(this);
		this.hideOne= this.props.hideOne.bind(this);

		this.state = {
		  show: false,
		  selected: false,
		  selectedData: 'days',
		  type: '',
		  id: props.counter,
		  name : '',
		  crimesInfo : this.props.data,
		  past_day: [],
		  past_week: [],
		  past_month: [],
		};
	}
	
	handleShow() {
		this.getRestorables();
		//this.handleClose();
		//this.setState({show: true});
	}
	
	handleClose() {
		this.setState({ show: false, selected: false});
	}

  async getRestorables() {
	console.log(this.props.data);
	var visual_id;
	var req = ('http://127.0.0.1:8000/api/getrestorable/');
	var response = await axios.get(req);
	console.log(response);
	var days = response.data.day;
	var visuals_to_add = [];
	for (var i = 0; i < days.length; i++) {
		console.log(days[i].field);
		if (days[i].type === "bar") {
		  visuals_to_add.push(<BarChartFS name={days[i].name} key={days[i].id} id={days[i].id} data={this.props.data[days[i].field]} field={days[i].field} restore={true} restore_function={this.restore}/>);
		}

		else if (days[i].type === "line") {
		  visuals_to_add.push(<LineGraphFS name={days[i].name} key={days[i].id} id={days[i].id} data={this.props.data[days[i].field]} field={days[i].field} restore={true} restore_function={this.restore}/>);
		}

		else if (days[i].type === "pie") {
		  visuals_to_add.push(<PieChartFS name={days[i].name} key={days[i].id} id={days[i].id} data={this.props.data[days[i].field]} field={days[i].field} restore={true} restore_function={this.restore}/>);
		}
	}
	this.setState({past_day: visuals_to_add});
	
	var weeks = response.data.week;
	visuals_to_add = [];
	for (var i = 0; i < weeks.length; i++) {
		console.log(weeks[i].field);
		if (weeks[i].type === "bar") {
		  visuals_to_add.push(<BarChartFS name={weeks[i].name} key={weeks[i].id} id={weeks[i].id} data={this.props.data[weeks[i].field]} field={weeks[i].field} restore={true} restore_function={this.restore}/>);
		}

		else if (weeks[i].type === "line") {
		  visuals_to_add.push(<LineGraphFS name={weeks[i].name} key={weeks[i].id} id={weeks[i].id} data={this.props.data[weeks[i].field]} field={weeks[i].field} restore={true} restore_function={this.restore}/>);
		}

		else if (weeks[i].type === "pie") {
		  visuals_to_add.push(<PieChartFS name={weeks[i].name} key={weeks[i].id} id={weeks[i].id} data={this.props.data[weeks[i].field]} field={weeks[i].field} restore={true} restore_function={this.restore}/>);
		}
	}
	this.setState({past_week: visuals_to_add});
	
	var months = response.data.month;
	visuals_to_add = [];
	for (var i = 0; i < months.length; i++) {
		console.log(months[i].field);
		if (months[i].type === "bar") {
		  visuals_to_add.push(<BarChartFS name={months[i].name} key={months[i].id} id={months[i].id} data={this.props.data[months[i].field]} field={months[i].field} restore={true} restore_function={this.restore}/>);
		}

		else if (months[i].type === "line") {
		  visuals_to_add.push(<LineGraphFS name={months[i].name} key={months[i].id} id={months[i].id} data={this.props.data[months[i].field]} field={months[i].field} restore={true} restore_function={this.restore}/>);
		}

		else if (months[i].type === "pie") {
		  visuals_to_add.push(<PieChartFS name={months[i].name} key={months[i].id} id={months[i].id} data={this.props.data[months[i].field]} field={months[i].field} restore={true} restore_function={this.restore}/>);
		}
	}
	this.setState({past_month: visuals_to_add});
	//this.handleClose();
	this.setState({show: true});
  }

	  
  async restore(name, id, type, field) {
	  var info = {
		  type: type,
		  name: name,
		  key: id,
		  id: id,
		  field: field,
	  };
	  var element; 
	  if (type === "line") {
		  element = (name === '') ? <LineGraphFS data={this.props.data[field]}  id={id} name={field} key={id} field={field} restore={false}/> : <LineGraphFS data={this.props.data[field]}  id={id} name={name} key={id} field={field} restore={false}/>;
	  }
	  else if (type === "bar") {
		  element = (name === '') ? <BarChartFS data={this.props.data[field]}  id={id} name={field} key={id} field={field} restore={false}/> : <BarChartFS data={this.props.data[field]}  id={id} name={name} key={id} field={field} restore={false}/>;
	  }
	  else if (type === "pie") {
		  element = name === '' ? <PieChartFS data={this.props.data[field]}  id={id} name={field} key={id} field={field} restore={false}/> : <PieChartFS data={this.props.data[field]}  id={id} name={name} key={id} field={field} restore={false}/>;
	  }
	  
	  this.addOne(element, info);
	  
	  var req = ('http://127.0.0.1:8000/api/restore/id=' + id);
	  var reponse = await axios.get(req);
	
	  //this.handleShow();
	  this.getRestorables();
  }
	
	render() {

		if(this.props.data === undefined){
		  return null;
		}

		var day_text = this.state.past_day.length === 0 ? "No visualizations from this time period" : ""
		var week_text = this.state.past_week.length === 0 ? "No visualizations from this time period" : ""
		var month_text = this.state.past_month.length === 0 ? "No visualizations from this time period" : ""
		return (
		<Nav>
		  <NavItem eventKey={2} onClick={this.handleShow}>
			Restore
		  </NavItem>
		  <Modal show={this.state.show} onHide={this.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					{/*<form>*/}
						  <ControlLabel>Restore Visualization</ControlLabel>
						  <HelpBlock>Select which visualization you would like to restore.</HelpBlock>
				  {/*</form>*/}
				</Modal.Title>
			  </Modal.Header>
			  <Modal.Body>
			    <div><p><b>Hidden in the past day:</b></p></div>
				<div align="center">{day_text}</div>
				<Grid fluid id="grid">
					<FormatGrid
						counter={this.state.past_day.length}
						visuals={this.state.past_day}
					/>
                 </Grid>
				<div><p><b>Hidden in the past week:</b></p></div>
				<div align="center">{week_text}</div>
				<Grid fluid id="grid">
					<FormatGrid
						counter={this.state.past_week.length}
						visuals={this.state.past_week}
					/>
                 </Grid>
				<div><p><b>Hidden in the past month:</b></p></div>
				<div align="center">{month_text}</div>
				<Grid fluid id="grid">
					<FormatGrid
						counter={this.state.past_month.length}
						visuals={this.state.past_month}
					/>
                 </Grid>
			  </Modal.Body>

			  <Modal.Footer>
				<Button bsStyle="danger" onClick={this.handleClose}>Close</Button>
			  </Modal.Footer>
		  </Modal>
		</Nav>
		);
    }
}

function FormatGrid(props) {
    // format the grid
    var grid = [];
    var rowNum=0;
    var rows = Math.ceil(props.counter/VIS_PER_ROW);
    for(var i=0; i < rows; i++){
        // add each row to an html object to return
        grid.push(
            <Row key={100+i} >
                <FormatRow
                    key={200+i}
                    currentRow={rowNum}
                    visuals={props.visuals}
                />
            </Row>
        );
        rowNum++;
    }
    return grid;
}

function FormatRow(props){
   var row = [];
    var rowNum = props.currentRow;
    for(var j=rowNum*VIS_PER_ROW; j < (rowNum+1)*VIS_PER_ROW; j++){
        row.push(
            props.visuals[j]
        );
    }
    return row;
}

export default Header;

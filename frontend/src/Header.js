import React, { Component } from 'react';
import logo from './logo.svg';
import './css/Header.css';
import { Button, Col, Grid, Tooltip, Thumbnail, Navbar, Nav, NavItem, NavDropdown, MenuItem, Modal, OverlayTrigger, Row } from 'react-bootstrap'; 
import heatmap from './images/heat-map icon.png';
import barchart from './images/barchart icon.png';
import linegraph from './images/line graph icon.png';
import piechart from './images/pie chart icon.png';
import timeline from './images/timeline icon.png';
import tablechart from './images/table icon.png';
import {HeatMap, LineGraph, PieChart, BarChart, TimeLine, TableChart} from './Visualizations'

class Header extends Component {
    constructor(props){
        super();
        
    }

    render() {
        return (
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
                    addOne={this.props.addOne}
                    hideOne={this.props.hideOne}
                />
                
                <Nav pullRight>
                  <NavItem eventKey={1} href="#">Hide</NavItem>
                  <NavItem eventKey={2} href="#">Unhide</NavItem>
                  <GlobalFilter />
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        );
    }
}

class AddVisualization extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleHeatMap = this.handleHeatMap.bind(this);
    this.handleBarChart = this.handleBarChart.bind(this);
    this.handleLineGraph = this.handleLineGraph.bind(this);
    this.handlePieChart = this.handlePieChart.bind(this);
    this.handleTimeLine = this.handleTimeLine.bind(this);
    this.handleTableChart = this.handleTableChart.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

    this.addOne = this.props.addOne.bind(this);
    this.hideOne= this.props.hideOne.bind(this);

    this.state = {
      show: false,
      selected: false,
      type: '',
    };
  }

  handleClose() {
    this.setState({ show: false, selected: false, type: '' });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleAdd(type){
    var element;
    switch(type){
        case 'Heat Map':
            element = <HeatMap />;
            break;
        case 'Bar Chart':
            element = <BarChart />;
            break;
        case 'Line Graph':
            element = <LineGraph />;
            break;
        case 'Pie Chart':
            element = <PieChart />;
            break;
        case 'Timeline':
            element = <TimeLine />;
            break;
        case 'Table Chart':
            element = <TableChart />;
            break;
        default:
            console.log("error, unhandeled element selected in Add visualization");
    }
    this.handleClose();
    this.addOne(element);
    this.setState({ selected: false, type: '' });
  }
  
  handleHeatMap() {
    this.setState({ selected: true, type: 'Heat Map' });
  }

  handleBarChart() {
    this.setState({ selected: true, type: 'Bar Chart' });
  }

  handleLineGraph() {
    this.setState({ selected: true, type: 'Line Graph' });
  }

  handlePieChart() {
    this.setState({ selected: true, type: 'Pie Chart' });
  }


  handleTimeLine() {
    this.setState({ selected: true, type: 'Timeline' });
  }


  handleTableChart() {
    this.setState({ selected: true, type: 'Table Chart' });
  }

  render() {
    var show = this.state.selected ? (
      <ShowFilter 
            handleAdd={this.handleAdd}
            handleClose={this.handleClose}
            type={this.state.type}
      />
    ) : (
      <ShowOptions 
            handleHeatMap={this.handleHeatMap}
            handleBarChart={this.handleBarChart}
            handleLineGraph={this.handleLineGraph}
            handlePieChart={this.handlePieChart}
            handleTimeLine={this.handleTimeLine}
            handleTableChart={this.handleTableChart}
            handleClose={this.handleClose}

      />

    );
    return (
    <Nav>
        <NavItem eventKey={1} onClick={this.handleShow}>
            Add Visualization
        </NavItem>

        <Modal show={this.state.show} onHide={this.handleClose}>
            
          {show}

        </Modal>
    </Nav>
    );
  }
}

class GlobalFilter extends Component {
	constructor(props) {
		super(props)
	}
	
  render() {
    return (
        <NavItem eventKey={1} href="#">
            Global Filter
        </NavItem>
    );
  }
}

function ShowFilter(props){
    var options = [];

    options.push(
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Customize The Visualization Below</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <p>Displaying Local Filter Options for a {props.type}</p>
                // this will be there a filter goes
            </Modal.Body>
            
            <Modal.Footer> 
                <Button bsStyle="danger" onClick={props.handleClose}>Close</Button>
                <Button bsStyle="success" onClick={() => props.handleAdd(props.type)}>Add</Button>
            </Modal.Footer>


        </div>
    );
    return options;
}

function ShowOptions(props){
     
    const heattip = <Tooltip id="tooltip-modal">Heat Map</Tooltip>;
    const bartip = <Tooltip id="tooltip-modal">Bar Chart</Tooltip>;
    const linetip = <Tooltip id="tooltip-modal">Line Graph</Tooltip>;
    const pitip = <Tooltip id="tooltip-modal">Pie Chart</Tooltip>;
    const timetip = <Tooltip id="tooltip-modal">Timeline</Tooltip>;
    const tabletip = <Tooltip id="tooltip-modal">Table</Tooltip>;
    
    var options = [];
    options.push(
        <div>
        <Modal.Header closeButton>
            <Modal.Title>Select a Visualization To Add Below</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid>
              <Row className="show-grid">
                <Col xs={4} sm={3} md={2}>
                    <OverlayTrigger placement="top" overlay={heattip}>
                    <Thumbnail src={heatmap} responsive onClick={props.handleHeatMap} />
                    </OverlayTrigger>
                </Col>
                <Col xs={4} sm={3} md={2}>
                    <OverlayTrigger placement="top" overlay={bartip}>
                    <Thumbnail src={barchart} responsive onClick={props.handleBarChart} />
                    </OverlayTrigger>
                </Col> 
                <Col xs={4} sm={3} md={2}>
                    <OverlayTrigger placement="top" overlay={linetip}>
                    <Thumbnail placement="top"src={linegraph} responsive  onClick={props.handleLineGraph} />
                    </OverlayTrigger>
                </Col>                  
              </Row>
              
              <Row className="show-grid">
                <Col xs={4} sm={3} md={2}>
                    <OverlayTrigger placement="top" overlay={pitip}>
                    <Thumbnail src={piechart} responsive  onClick={props.handlePieChart} />
                    </OverlayTrigger>
                </Col>
                <Col xs={4} sm={3} md={2}>
                    <OverlayTrigger placement="top" overlay={timetip}>
                    <Thumbnail src={timeline} responsive  onClick={props.handleTimeLine} />
                    </OverlayTrigger>
                </Col>
                <Col xs={4} sm={3} md={2}>
                    <OverlayTrigger placement="top" overlay={tabletip}>
                    <Thumbnail src={tablechart} responsive onClick={props.handleTableChart}  />
                    </OverlayTrigger>
                </Col> 

              </Row>

            </Grid>
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="danger" onClick={props.handleClose}>Close</Button>
          </Modal.Footer>

        </div>
    );
    return options;
}

export default Header;

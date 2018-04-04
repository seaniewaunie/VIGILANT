import React, { Component } from 'react';
import logo from './logo.svg';
import './css/Header.css';
import { Button, Col, Grid, FormGroup, ControlLabel, FormControl, HelpBlock, Tooltip, Thumbnail, Navbar, Nav, NavItem, NavDropdown, MenuItem, Modal, OverlayTrigger, Row } from 'react-bootstrap'; 
import heatmap from './images/heat-map icon.png';
import barchart from './images/barchart icon.png';
import linegraph from './images/line graph icon.png';
import piechart from './images/pie chart icon.png';
import timeline from './images/timeline icon.png';
import tablechart from './images/table icon.png';
import {HeatMap, LineGraph, PieChart, BarChart, TimeLine, TableChart} from './Visualizations'
import Filter from './Filters'

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
                    counter={this.props.counter}
                />
                
                <GlobalFilter />               
                
                <Nav pullRight>
                  <NavItem eventKey={1} href="#">Hide</NavItem>
                  <NavItem eventKey={2} href="#">Reveal</NavItem>
                </Nav>

              </Navbar.Collapse>
            </Navbar>
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

    this.addOne = this.props.addOne.bind(this);
    this.hideOne= this.props.hideOne.bind(this);

    this.state = {
      show: false,
      selected: false,
      type: '',
      id: props.counter,
      name : '',
    };
  }

  handleClose() {
    this.setState({ show: false, selected: false, type: '', name: '' });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleAdd(){
    var element;
    switch(this.state.type){
        case 'Heat Map':
            element = <HeatMap id={this.state.id}/>;
            break;
        case 'Bar Chart':
            element = <BarChart id={this.state.id} name={this.state.name} key={this.state.id} />;
            break;
        case 'Line Graph':
            element = <LineGraph id={this.state.id} name={this.state.name} key={this.state.id}/>;
            break;
        case 'Pie Chart':
            element = <PieChart id={this.state.id} name={this.state.name} key={this.state.id} />;
            break;
        case 'Timeline':
            element = <TimeLine id={this.state.id}/>;
            break;
        case 'Table Chart':
            element = <TableChart id={this.state.id} />;
            break;
        default:
            console.log("error, unhandled element selected in Add visualization: ", this.state.type);
    }
    this.handleClose();
    this.addOne(element);
    this.setState({ selected: false, type: '' });
  }
 
  getValidationState() {
    const length = this.state.name.length;
    if (length > 0) return 'success';
//    else if (length > 0) return 'warning';
//    else if (length > 0) return 'error';
    return 'warning';
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleHeatMap() {
    this.setState({ selected: true, type: 'Heat Map' });
  }

  handleBarChart() {
    this.setState({ selected: true, type: 'Bar Chart' }, this.handleAdd);
  }

  handleLineGraph() {
    this.setState({ selected: true, type: 'Line Graph' }, this.handleAdd);
  }

  handlePieChart() {
    this.setState({ selected: true, type: 'Pie Chart' }, this.handleAdd);
  }


  handleTimeLine() {
    this.setState({ selected: true, type: 'Timeline' });
  }


  handleTableChart() {
    this.setState({ selected: true, type: 'Table Chart' });
  }

  render() {
/*    var show = this.state.selected ? (
      <ShowFilter 
            handleAdd={this.handleAdd}
            handleClose={this.handleClose}
            type={this.state.type}
            id={this.state.id}
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
*/
    var show = (
      <ShowOptions 
            handleHeatMap={this.handleHeatMap}
            handleBarChart={this.handleBarChart}
            handleLineGraph={this.handleLineGraph}
            handlePieChart={this.handlePieChart}
            handleTimeLine={this.handleTimeLine}
            handleTableChart={this.handleTableChart}
            handleClose={this.handleClose}
            getValidationState={this.getValidationState}
            handleChange={this.handleChange}
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
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

        this.state = {
          show: false,
          scope: 'global',
        };

    }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleUpdate() {
    console.log("This will adjust the filter for all visuals");
    this.handleClose();
  }

  render() {
    return (
    <Nav pullRight>
        <NavItem eventKey={1} onClick={this.handleShow}>
            Global Filter
        </NavItem>

        <Modal show={this.state.show} onHide={this.handleClose}>
            <ShowFilter
                handleAdd={this.handleUpdate}
                handleClose={this.handleClose}
                scope={this.state.scope}
            />
        </Modal>
    </Nav>
    );
  }
}

function ShowFilter(props){
    var options = [];
    var element;
    var title;
    if(props.scope === 'global'){
        element = 'Update';
        title = "Customize All Visualizations Below";
    }
    else{
        element = 'Add';
        title = "Customize The Visualization Below";
    }

    options.push(
        <div>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <Filter
                    key = {props.id}
                    id = {props.id}                     
                    type = {props.type}
                    scope = {props.scope}
                />
            </Modal.Body>
            
            <Modal.Footer> 
                <Button bsStyle="danger" onClick={props.handleClose}>Close</Button>
                <Button bsStyle="success" onClick={() => props.handleAdd(props.type)}>{element}</Button>
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
            <Modal.Title>
                <form>
                    <FormGroup
                      controlId="formBasicText"
                      validationState={props.getValidationState()}
                    >
                      <ControlLabel>Add Visualization</ControlLabel>
                      <FormControl
                        type="text"
                        value={props.name}
                        placeholder="Visualization Name"
                        onChange={props.handleChange}
                      />
                      <FormControl.Feedback />
                      <HelpBlock>After entering a name, click on which visualization you would like</HelpBlock>
                    </FormGroup>
              </form>            
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid>
              <Row className="show-grid">
{/*                <Col xs={4} sm={3} md={2}>
                    <OverlayTrigger placement="top" overlay={heattip}>
                    <Thumbnail src={heatmap} responsive onClick={props.handleHeatMap} />
                    </OverlayTrigger>
                </Col>
*/}
                <Col xs={4} sm={3} md={2}>
                    <OverlayTrigger placement="top" overlay={pitip}>
                    <Thumbnail src={piechart} responsive  onClick={props.handlePieChart} />
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
 {/*             
              <Row className="show-grid">
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
*/}

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

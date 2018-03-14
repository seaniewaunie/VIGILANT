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

class Header extends Component {

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
            <AddVisualization />
            
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

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }	
  render() {
    
    const heattip = <Tooltip id="tooltip-modal">Heat Map</Tooltip>;
    const bartip = <Tooltip id="tooltip-modal">Bar Chart</Tooltip>;
    const linetip = <Tooltip id="tooltip-modal">Line Graph</Tooltip>;
    const pitip = <Tooltip id="tooltip-modal">Pie Chart</Tooltip>;
    const timetip = <Tooltip id="tooltip-modal">Timeline</Tooltip>;
    const tabletip = <Tooltip id="tooltip-modal">Table</Tooltip>;
    
    return (
    <Nav>
        <NavItem eventKey={1} onClick={this.handleShow}>
            Add Visualization
        </NavItem>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Select a Visualization To Add Below!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid>
              <Row className="show-grid">
                <Col xs={4} sm={4} md={2}>
                    <OverlayTrigger placement="top" overlay={heattip}>
                    <Thumbnail src={heatmap} responsive />
                    </OverlayTrigger>
                </Col>
                <Col xs={4} sm={4} md={2}>
                    <OverlayTrigger placement="top" overlay={bartip}>
                    <Thumbnail src={barchart} responsive />
                    </OverlayTrigger>
                </Col> 
                <Col xs={4} sm={4} md={2}>
                    <OverlayTrigger placement="top" overlay={linetip}>
                    <Thumbnail placement="top"src={linegraph} responsive />
                    </OverlayTrigger>
                </Col>                  
              </Row>
              
              <Row className="show-grid">
                <Col xs={4} sm={4} md={2}>
                    <OverlayTrigger placement="top" overlay={pitip}>
                    <Thumbnail src={piechart} responsive />
                    </OverlayTrigger>
                </Col>
                <Col xs={4} sm={4} md={2}>
                    <OverlayTrigger placement="top" overlay={timetip}>
                    <Thumbnail src={timeline} responsive />
                    </OverlayTrigger>
                </Col>
                <Col xs={4} sm={4} md={2}>
                    <OverlayTrigger placement="top" overlay={tabletip}>
                    <Thumbnail src={tablechart} responsive />
                    </OverlayTrigger>
                </Col> 

              </Row>

            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
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

export default Header;

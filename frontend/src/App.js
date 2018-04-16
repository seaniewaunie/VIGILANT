import React, { Component } from 'react';
import './css/App.css';
import {HeatMap} from './Visualizations'
import { Grid, Row, Col } from 'react-bootstrap';
import {AutoAffix} from 'react-overlays';
import Header from './Header';
import TableFS from './visuals/Table.js';
import DefaultVisuals from './DefaultVisuals.js';
import Filter from './Filters.js';

var VIS_PER_ROW = 3;
var VIS_SIZE = 6;

class App extends Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
            visuals: [
//                <TimeLine id='4' key='4'/>,
//                <TableChart id='5' key='5'/>,
            ],
            hiddenVisuals: [
            ],
            sidebarOpen: false,
            hideMode: false,
            revealMode: false,
            filterType: 'global',
        };

        this.addOne = this.addOne.bind(this);
        this.hideOne = this.hideOne.bind(this);
        this.toggleGlobalFilter = this.toggleGlobalFilter.bind(this);
    }

    addOne(vis){
        var newVisual = vis;
        this.state.visuals.push(newVisual)
        this.setState({
            counter: this.state.visuals.length,
        })
    }

    hideOne(vis){
        var hideVisual = 3;
        this.state.hiddenVisuals.push(
            this.state.visuals.splice(hideVisual, 1)
        );
        this.setState({
            counter:this.state.counter - 1
        })
    }

    toggleGlobalFilter(open) {
        this.setState({sidebarOpen: !this.state.sidebarOpen, filterType: 'global'});
        if(this.state.sidebarOpen){
          VIS_PER_ROW=3;
          VIS_SIZE=6;
        }
        else{
          VIS_PER_ROW=2;
          VIS_SIZE=5;
        }
        console.log(VIS_PER_ROW);
    }

    render() {
        this.state.counter = this.state.visuals.length;
        var filter = [];
        if(this.state.sidebarOpen === true){
//*
            filter.push(
                <Filter
                    id="rightSide"
                    scope = {this.state.filterType}
                    key = '0'
                />
            );
//*/
//        filter.push(<p>woo!</p>);
        }
        return (
            <div id="app">
                <Grid fluid={true}>
                  <Row>
                    <AutoAffix>
                      <div className="header">
                          <Header
                              addOne={this.addOne}
                              hideOne={this.hideOne}
                              counter={this.state.counter}
                              toggleGlobalFilter={this.toggleGlobalFilter}
                          />
                      </div>
                    </AutoAffix>
                  </Row>
                  <Row className="topRow">
                    <Col xs={4} sm={VIS_SIZE} md={VIS_SIZE}>
                        <HeatMap
                        />
                    </Col>
                    <Col xs={4} sm={VIS_SIZE} md={VIS_SIZE-1}>
                        <DefaultVisuals />
                    </Col>
                    <Col xs={1} sm={1} md={1}>
                    </Col>
                    <Col xs={2} sm={2} md={2} className="filter">
                      {filter}
                    </Col>
                  </Row>
                  <Row className="userVisuals">
                    <div>
                        <Grid fluid={true} id="grid">
                            <FormatGrid
                                counter={this.state.counter}
                                visuals={this.state.visuals}
                            />
                        </Grid>
                    </div>
                  </Row>
                  <Row className="table">
                    <Col xs={4} sm={VIS_SIZE*2} md={VIS_SIZE*2}>
                      <TableFS />
                    </Col>
                  </Row>
                </Grid>


            </div>
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
            <Row key={i} >
                <FormatRow
                    key={i}
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

export default App;

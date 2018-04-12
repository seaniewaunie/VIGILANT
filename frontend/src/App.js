import React, { Component } from 'react';
import './css/App.css';
import {HeatMap} from './Visualizations'
import { Grid, Row, Col } from 'react-bootstrap';
import Header from './Header';
import TableFS from './visuals/Table.js';
import DefaultVisuals from './DefaultVisuals.js';
import Filter from './Filters.js';

var VIS_PER_ROW = 6;

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
        this.setState({sidebarOpen: !this.state.sidebarOpen});
        if(this.state.sidebarOpen){
          VIS_PER_ROW=6;
        }
        else{
          VIS_PER_ROW=5;
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
                    scope = 'global'
                    key = '0'
                />
            );
//*/
//        filter.push(<p>woo!</p>);
        }
        return (
            <div id="app">
                <div id="header">
                    <Header
                        addOne={this.addOne}
                        hideOne={this.hideOne}
                        counter={this.state.counter}
                        toggleGlobalFilter={this.toggleGlobalFilter}
                    />
                </div>
                <Grid>
                  <Row>
                    <Col xs={4} sm={4} md={5}>
                        <HeatMap />
                    </Col>
                    <Col xs={4} sm={4} md={3}>
                        <DefaultVisuals />
                    </Col>
                  </Row>
                  <Row>
                      <Col xs={4} sm={4} md={4}>
                        {filter}
                      </Col>
                  </Row>
                  <div id="userVisuals">
                      <Grid fluid={true} id="grid">
                          <FormatGrid
                              counter={this.state.counter}
                              visuals={this.state.visuals}
                          />
                      </Grid>
                  </div>

                  <Row>
                      <TableFS />
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

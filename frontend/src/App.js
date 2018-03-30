import React, { Component } from 'react';
import './css/App.css';
import {HeatMap, LineGraph, PieChart, BarChart, TimeLine, TableChart} from './Visualizations'
import { Grid, Row } from 'react-bootstrap'; 
import Header from './Header';
import TableFS from './visuals/Table.js';
var VIS_PER_ROW = 4;

class App extends Component {
    constructor() {
        super();
        this.state = {
            counter: 6,
            visuals: [
                <HeatMap id='0' key='0'/>,
                <BarChart id='1' key='1'/>,
                <LineGraph id='2' key='2'/>,
                <PieChart id='3' key='3'/>,
                <TimeLine id='4' key='4'/>,
                <TableChart id='5' key='5'/>,
            ],
            hiddenVisuals: [
            ],
        };
        this.addOne = this.addOne.bind(this);
        this.hideOne = this.hideOne.bind(this);
    }
   
    addOne(vis){
        var newVisual = vis;
        this.state.visuals.push(newVisual)
        this.setState({
            counter: this.state.counter + 1,
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

    render() {
        return (
            <div>
                <Header 
                    addOne={this.addOne}
                    hideOne={this.hideOne}
                    counter={this.state.counter}
                /> 
                <Grid fluid={true} id="grid">
                    <FormatGrid 
                        counter={this.state.counter} 
                        visuals={this.state.visuals}
                    />
                </Grid>
                <TableFS />


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

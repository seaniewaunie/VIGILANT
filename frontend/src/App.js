import React, { Component } from 'react';
import './css/App.css';
import {HeatMap, LineGraph, PieChart, BarChart} from './Visualizations'
import { Grid, Row } from 'react-bootstrap'; 
import Header from './Header';

var VIS_PER_ROW = 4;

class App extends Component {
    constructor() {
        super();
        this.state = {
            counter: 4,
            visuals: [
                <HeatMap id='0'/>,
                <LineGraph id='1'/>,
                <PieChart id='2'/>,
                <BarChart id='3'/>,
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
                /> 
                <Grid id="grid">
                    <FormatGrid 
                        counter={this.state.counter} 
                        visuals={this.state.visuals}
                    />
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

import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import Visualization from './Visualization'
import { Grid, Row, Col } from 'react-bootstrap'; 

class App extends Component {
  
    getInitialState(){
        return [
            {id:1,name:"Some Name"}
        ]
    }

    addChild() {
        // State change will cause component re-render
        this.setState(this.state.concat([
            {id:2,name:"Another Name"}
        ]))
    }

  render() {
    return (
       <Grid id="grid">
            
       </Grid>
    );
  }
}



export default App;

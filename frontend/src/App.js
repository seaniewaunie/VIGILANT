import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import Visualization from './Visualization'
import { Grid } from 'react-bootstrap'; 

class App extends Component {
  

  render() {
    return (
        <div className="App">
            <Grid id="container">
            </Grid>
        </div>
    );
  }
}



export default App;

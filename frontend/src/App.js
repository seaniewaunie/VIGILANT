import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
				<img src="sample_heat_map.png" height="400" width="450" hspace="20" vspace="20"/>
                <img src="sample_pie_chart.png" height="400" width="400" hspace="20" vspace="20"/>
				<img src="sample_pie_chart1.png" height="400" width="400" hspace="20" vspace="20"/>
				<img src="sample_bar_chart.png" height="300" width="800" hspace="20" vspace="20"/>
				<img src="sample_table.png" height="400" width="1000" hspace="20" vspace="20"/>
        </div>
    );
  }
}

export default App;

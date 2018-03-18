import React from 'react';
import ReactDOM from 'react-dom';
import {HeatMap} from '../Visualizations'
// Header functions

export function addHeatMap(){
    /*
    var para = document.createElement("P");
    var t = document.createTextNode("This is a paragraph.");
    para.appendChild(t); 
    document.getElementById("root").appendChild(para);
    */
    const element = (
        <HeatMap />
    );
    ReactDOM.render(element, document.getElementById('root'));
}



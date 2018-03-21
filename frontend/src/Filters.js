import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

export default class Filter extends Component {
    constructor(props){
        super();
        this.state = {
            id: props.id,
            type: props.type,
            scope: props.scope,
            
            regions: [
                'All',
                'North', 'Northeast', 'East', 'Southeast',
                'South', 'Southwest', 'West', 'Northwest',
            ], // I'm hoping this will be easy to call our django API for the regions field
            dates: '',
            times: [
                'All',
                'Past Hour', 'Past Day', 'Past Week',
                'Past Month', 'Past Year',
            ],
            crime_codes: '',
            locations: '',
            descriptions: '',
            inside_outsides: '',
            weapons: [
                'All',
                'Hand Gun', 'Assault Rifle', 'Knife',
                'Melee Weapon', 'Other',
            ],
            posts: '',
            districts: '',
            neighborhoods: '',
            latitudes: '',
            longitudes: '',
            premises: '',
        };
    }
    
    render(){
        var element;
        if(this.state.scope === 'global'){
            element = <p>Global Filter settings</p>;
        }
        else{
            element = <p>Local Filter settings for a {this.state.type}</p>;
        }

        return(
            <div>
                {element}
                <form>
                    <Selector
                        selections={this.state.regions} 
                        title='Region' 
                    />
                    <Selector
                        selections={this.state.weapons}
                        title='Weapon'
                    />
                     <Selector
                        selections={this.state.times}
                        title='Time Frame'
                    />
                </form>
            </div>
        );
    }
}



function Selector(props){
    var selections = props.selections;
    var element = [];
    element.push(
        <FormGroup ControlId='dropdown-basic' >
            <ControlLabel>{props.title}</ControlLabel>
            <FormControl componentClass='select' placeholder={props.title}>
                <SelectorDropdown selections={selections}/>
            </FormControl>
        </FormGroup>
    );

    return element;
}

function SelectorDropdown(props){
    var selections = props.selections;
    var element = [];
    for(let i in selections){
        element.push(
            <option value={selections[i]}>{selections[i]}</option>
        );
    }
    
    return element;
}


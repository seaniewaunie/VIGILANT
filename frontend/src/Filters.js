import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

export class LocalFilter extends Component {
    constructor(props){
        super();
        this.state = {
            id: props.id,
            type: props.type,
            regions: [
                'North', 'Northeast', 'East', 'Southeast',
                'South', 'Southwest', 'West', 'Northwest',
            ], // I'm hoping this will be easy to call our django API for the regions field
            dates: '',
            times: '',
            crime_codes: '',
            locations: '',
            descriptions: '',
            inside_outsides: '',
            weapons: '',
            posts: '',
            districts: '',
            neighborhoods: '',
            latitudes: '',
            longitudes: '',
            premises: '',
        };
    }
    
    render(){
        

        return(
            <div>
                <p>Local Filter settings for a {this.state.type}</p>
                <form>
                    <Region 
                        regions={this.state.regions} 
                        title='Region' 
                    />
                </form>
            </div>
        );
    }
}

function Region(props){
    var selections = props.regions;
    var element = [];
    element.push(
        <FormGroup ControlId='dropdown-basic' >
            <ControlLabel>{props.title}</ControlLabel>
            <FormControl componentClass='select' placeholder={props.title}>
                <RegionDropdown selections={selections}/>
            </FormControl>
        </FormGroup>
    );

    return element;
}

function RegionDropdown(props){
    var selections = props.selections;
    var element = [];
    for(let i in selections){
        element.push(
            <option value={selections[i]}>{selections[i]}</option>
        );
    }
    
    return element;
}


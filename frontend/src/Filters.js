import React, { Component } from 'react';
import './css/Filters.css';
import {Well, FormGroup, ControlLabel, FormControl, Col} from 'react-bootstrap';
import {AutoAffix} from 'react-overlays';


//http://localhost:8000/api/gfilter/start_date=2016-01-09&end_date=2018-02-17

export default class Filter extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            type: props.type,
            scope: props.scope,
            sidebarOpen: false,

            regions: [
                'All',
                'North', 'Northeast', 'East', 'Southeast',
                'South', 'Southwest', 'West', 'Northwest',
            ], // I'm hoping this will be easy to call our django API for the regions field
            dates: '',
            times: [
                'All',
                'Past Hour', 'Past Day', 'Past Week',
                'Past Month', 'Past Year', 'Custom',
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

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open){
        this.setState({sidebarOpen: open});
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
          <AutoAffix viewportOffsetTop={55}>
            <Well className="filterOptions">
              <b>{element}</b>

              <Selector
                  key={0}
                  selections={this.state.regions}
                  title='Region'
              />
              <Selector
                  key={1}
                  selections={this.state.weapons}
                  title='Weapon'
              />
               <Selector
                  key={2}
                  selections={this.state.times}
                  title='Time Frame'
              />
          </Well>
        </AutoAffix>
        );
    }
}



class Selector extends Component{
    constructor(props){
      super(props);

      this.handleChange = this.handleChange.bind(this);

      this.state = {
          value: this.props.title,
          selections: this.props.selections,
      }

    }

    handleChange(e){
      this.setState({ value: e.target.value });
    }

    render() {
      return(
        <FormGroup ControlId='dropdown-basic' >
            <ControlLabel>{this.props.title}</ControlLabel>
            <FormControl
              componentClass='select'
              value={this.state.value}
              placeholder={this.state.value}
              onChange={this.handleChange}
            >
                <SelectorDropdown selections={this.state.selections}/>
            </FormControl>
        </FormGroup>
      );
    }
}

function SelectorDropdown(props){
    var selections = props.selections;
    var element = [];
    for(let i in selections){
        element.push(
            <option key={i} value={selections[i]}>{selections[i]}</option>
        );
    }

    return element;
}

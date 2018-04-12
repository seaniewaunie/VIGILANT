import React, { Component } from 'react';
import './css/Filters.css';
import Sidebar from 'react-sidebar';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

var sidebarStyle = {
  backgroudn: 'blue',
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  sidebar: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    transition: 'transform .3s ease-out',
    WebkitTransition: '-webkit-transform .3s ease-out',
    willChange: 'transform',
    overflowY: 'auto',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
    transition: 'left .3s ease-out, right .3s ease-out',
  },
  overlay: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity .3s ease-out, visibility .3s ease-out',
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  dragHandle: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    bottom: 0,
  },
};

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
            <div>
                <Sidebar
                    key={0}
                    id = 'sidebar'
                    styles={sidebarStyle}
                    pullRight={true}
                    sidebar={element}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                >
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
                     <Selector
                        key={3}
                        selections={this.state.regions}
                        title='Region'
                    />
                    <Selector
                        key={4}
                        selections={this.state.regions}
                        title='Region'
                    />
                    <Selector
                        key={5}
                        selections={this.state.weapons}
                        title='Weapon'
                    />
                     <Selector
                        key={6}
                        selections={this.state.times}
                        title='Time Frame'
                    />
                     <Selector
                        key={7}
                        selections={this.state.regions}
                        title='Region'
                    />

                </Sidebar>
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
            <option key={i} value={selections[i]}>{selections[i]}</option>
        );
    }

    return element;
}

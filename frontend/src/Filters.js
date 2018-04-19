import React, { Component } from 'react';
import './css/Filters.css';
import axios from 'axios';
import {Well} from 'react-bootstrap';
import {AutoAffix} from 'react-overlays';
import Selector from './Selector.js';
import MultiSelector from './MultiSelector.js';

// request crimecode options from /api/codelookup/

export default class Filter extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            type: props.type,
            scope: props.scope,
            sidebarOpen: false,
            regions: [
                {label: 'Central', value: 'central',},
                {label: 'Northern', value: 'northern',},
                {label: 'Northeastern', value: 'northeastern'},
                {label: 'Eastern', value: 'eastern'},
                {label: 'Southeastern', value: 'southeastern'},
                {label: 'Southern', value: 'southern'},
                {label: 'Southwestern',  value: 'southwestern'},
                {label: 'Western', value: 'western'},
                {label: 'Northwestern', value: 'northwestern'},
            ],
            times: [
                'All',
                'Past Hour', 'Past Day', 'Past Week',
                'Past Month', 'Past Year', 'Custom Dates',
                'Custom Times', 'Custom Dates and Times',
            ],
            days: [
              {label: 'Sunday', value: '0',},
              {label: 'Monday', value: '1'},
              {label: 'Tuesday', value: '2'},
              {label: 'Wednesday', value: '3'},
              {label: 'Thursday', value: '4'},
              {label: 'Friday',  value: '5'},
              {label: 'Saturday', value: '6'},
            ],
            crime_codes: this.props.filterCodes,
            locations: '',
            descriptions: '',
            inside_outsides: [
              {label: 'Indoor', value: 'i'},
              {label: 'Outdoor', value: 'o'},
            ],
            weapons: [
              {label: 'Firearm', value: 'firearm',},
              {label: 'Knife', value: 'knife'},
              {label: 'Hands', value: 'hands'},
              {label: 'Other', value: 'OTHER'},
            ],
            posts: '',
            neighborhoods: '',
            latitudes: '',
            longitudes: '',
            premises: '',
            settings: {
              current_region: this.props.settings.regions,
              current_io: this.props.settings.io,
              current_weapons: this.props.settings.weapons,
              current_times: this.props.settings.times,
              current_days: this.props.settings.days,
              current_codes: this.props.settings.codes,
            }
        };

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    componentDidMount() {

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
            <Well bsSize="small" className="filterOptions">
              <b>{element}</b>

              <Selector
                updateRequest = {this.props.updateRequest}
                key={2}
                selections={this.state.times}
                default={this.state.settings.current_times}
                title='Time Frame'
              />
              <MultiSelector
                multi={true}
                stayOpen = {true}
                updateRequest = {this.props.updateRequest}
                key={6}
                selections={this.state.crime_codes}
                default={this.state.settings.current_codes}
                title='Codes'
              />
              <MultiSelector
                multi={true}
                stayOpen = {true}
                updateRequest = {this.props.updateRequest}
                key={5}
                selections = {this.state.regions}
                default={this.state.settings.current_region}
                title='Districts'
              />
              <MultiSelector
                multi={true}
                stayOpen = {true}
                updateRequest = {this.props.updateRequest}
                key={4}
                selections = {this.state.days}
                default={this.state.settings.current_days}
                title='Days'
              />
              <MultiSelector
                multi={true}
                stayOpen = {true}
                updateRequest = {this.props.updateRequest}
                key={1}
                selections={this.state.weapons}
                default={this.state.settings.current_weapons}
                title='Weapons'
              />
              <MultiSelector
                multi={true}
                updateRequest = {this.props.updateRequest}
                key={3}
                selections={this.state.inside_outsides}
                default={this.state.settings.current_io}
                title='Indoor/Outdoor'
              />
            </Well>
          </AutoAffix>
        );
    }
}

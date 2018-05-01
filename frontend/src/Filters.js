import React, { Component } from 'react';
import './css/Filters.css';
import {Well} from 'react-bootstrap';
import {AutoAffix} from 'react-overlays';
import Selector from './Selector.js';
import MultiSelector from './MultiSelector.js';
import {RingLoader} from 'react-spinners';

// request crimecode options from /api/codelookup/

export default class Filter extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            type: this.props.type,
            scope: this.props.scope,
            sidebarOpen: this.props.show,
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
            descriptions: [
			  {label: 'AGG. ASSAULT', value: 'agg. assault'},
			  {label: 'ARSON', value: 'arson'},
			  {label: 'ASSAULT BY THREAT', value: 'assault by threat'},
			  {label: 'AUTO THEFT', value: 'auto theft'},
			  {label: 'BURGLARY', value: 'burglary'},
			  {label: 'COMMON ASSAULT', value: 'common assault'},
			  {label: 'HOMICIDE', value: 'homicide'},
			  {label: 'LARCENY', value: 'larceny'},
			  {label: 'LARCENY FROM AUTO', value: 'larceny from auto'},
			  {label: 'LARCENY- AUTO ACC', value: 'larceny- auto acc'},
			  {label: 'LARCENY- BICYCLE', value: 'larceny- bicycle'},
			  {label: 'LARCENY- FROM AUTO', value: 'larceny- from auto'},
			  {label: 'LARCENY- FROM BLDG.', value: 'larceny- from bldg.'},
			  {label: 'LARCENY- FROM LOCKER', value: 'larceny- from locker'},
			  {label: 'LARCENY- FROM MACHIN', value: 'larceny- from machin'},
			  {label: 'LARCENY- OTHER', value: 'larceny- other'},
			  {label: 'LARCENY- PICKPOCKE', value: 'larceny- pickpocke'},
			  {label: 'LARCENY- SHOPLIFTING', value: 'larceny- shoplifting'},
			  {label: 'RAPE', value: 'rape'},
			  {label: 'ROBBERY - CARJACKING', value: 'robbery - carjacking'},
			  {label: 'ROBBERY - COMMERCIAL', value: 'robbery - commercial'},
			  {label: 'ROBBERY - RESIDENCE', value: 'robbery - residence'},
			  {label: 'ROBBERY - STREET', value: 'robbery - street'},
			  {label: 'SHOOTING', value: 'shooting'},
			],
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
            },
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

        if(this.props.show){
          return null;
        }
        else if(this.props.filterCodes === undefined){
          return(<RingLoader color={'#123abc'} size={300}/>);
        }

        return(
            <Well bsSize="small" className="filterOptions">
              <b>{element}</b>

              <Selector
                updateRequest = {this.props.updateRequest}
                key={300}
                selections={this.state.times}
                default={this.state.settings.current_times}
                title='Time Frame'
              />
              <MultiSelector
                multi={true}
                stayOpen = {true}
                updateRequest = {this.props.updateRequest}
                key={301}
                selections={this.state.descriptions}
                default={this.state.settings.current_codes}
                title='Descriptions'
              />
              <MultiSelector
                multi={true}
                stayOpen = {true}
                updateRequest = {this.props.updateRequest}
                key={302}
                selections = {this.state.regions}
                default={this.state.settings.current_region}
                title='Districts'
              />
              <MultiSelector
                multi={true}
                stayOpen = {true}
                updateRequest = {this.props.updateRequest}
                key={303}
                selections = {this.state.days}
                default={this.state.settings.current_days}
                title='Days'
              />
              <MultiSelector
                multi={true}
                stayOpen = {true}
                updateRequest = {this.props.updateRequest}
                key={304}
                selections={this.state.weapons}
                default={this.state.settings.current_weapons}
                title='Weapons'
              />
              <MultiSelector
                className="open-up"
                multi={true}
                updateRequest = {this.props.updateRequest}
                key={305}
                selections={this.state.inside_outsides}
                default={this.state.settings.current_io}
                title='Indoor/Outdoor'
              />
            </Well>
        );
    }
}

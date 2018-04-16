import React, { Component } from 'react';
import './css/Filters.css';
import {Form, Well, FormGroup, ControlLabel, FormControl, Col} from 'react-bootstrap';
import {AutoAffix} from 'react-overlays';
import DatetimeRangePicker from 'react-datetime-range-picker';

//http://localhost:8000/api/gfilter/start_date=2016-01-09&end_date=2018-02-17

class uri {
  constructor(start_date, end_date) {
    this.start_date = start_date;
    this.end_date = end_date;
  }

  set setStartDate(start_date){
    this.start_date = start_date;
  }

  set setEndDate(end_date){
    this.end_date = end_date;
  }

  get getString(){
    return this.formatString();
  }

  formatString(){
    var start_yr_month_day, end_yr_month_day;
    var start_hh_mm_dd, end_hh_mm_dd;
    // YYYY-MM-DD
    // HH:MM:SS
    start_yr_month_day = this.start_date.toISOString().substr(0, 10);
    start_hh_mm_dd = this.start_date.toISOString().substring(11, 19);

    end_yr_month_day = this.end_date.toISOString().substr(0, 10);
    end_hh_mm_dd = this.end_date.toISOString().substring(11, 19);

    return (
      start_yr_month_day +
      '&' + end_yr_month_day +
      '&' + start_hh_mm_dd +
      '&' + end_hh_mm_dd
    );
  }
}

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
                'Northern', 'Northeastern', 'Eastern', 'Southeastern',
                'Southern', 'Southwestern', 'Western', 'Northwestern',
            ], // I'm hoping this will be easy to call our django API for the regions field
            times: [
                'All',
                'Past Hour', 'Past Day', 'Past Week',
                'Past Month', 'Past Year', 'Custom',
            ],
            crime_codes: '',
            locations: '',
            descriptions: '',
            inside_outsides: ['Both', 'Indoor','Outdoor'],
            weapons: [
                'All',
                'Hand Gun', 'Assault Rifle', 'Knife',
                'Melee Weapon', 'Other',
            ],
            posts: '',
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
            <Well bsSize="small" className="filterOptions">
              <b>{element}</b>

              <Selector
                updateRequest = {this.props.updateRequest}
                key={2}
                selections={this.state.times}
                default='Past Week'
                title='Time Frame'
              />
              <Selector
                updateRequest = {this.props.updateRequest}
                key={0}
                selections={this.state.regions}
                default='All'
                title='District'
              />
              <Selector
                updateRequest = {this.props.updateRequest}
                key={1}
                selections={this.state.weapons}
                default='All'
                title='Weapon'
              />
              <Selector
                updateRequest = {this.props.updateRequest}
                key={3}
                selections={this.state.inside_outsides}
                default='Both'
                title='Indoor/Outdoor'
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
      this.handleTimes = this.handleTime.bind(this);

      this.state = {
          value: this.props.title,
          selections: this.props.selections,
      }

    }

    handleChange(e){
      this.setState({ value: e.target.value });
    }

    handleTime(e){
      //console.log(e.start);
      //console.log(e.end);
      var params = new uri(e.start, e.end);
      //console.log(params.getString);
      this.props.updateRequest(params.getString);
    }

    render() {
      var showCustomTimeFrame;
      if(this.state.value === 'Custom'){
        showCustomTimeFrame = (
          <DatetimeRangePicker
            onChange={this.handleTimes}
          />
        );
      }
      return(
        <FormGroup ControlId='dropdown-basic' >
            <ControlLabel>{this.props.title}</ControlLabel>
            <FormControl
              componentClass='select'
              defaultValue={this.props.default}
              onChange={this.handleChange}
            >
                <SelectorDropdown selections={this.state.selections}/>
            </FormControl>{' '}
            {showCustomTimeFrame}
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

import React, { Component } from 'react';
import './css/Filters.css';
import {Form, Well, FormGroup, ControlLabel, FormControl, Col} from 'react-bootstrap';
import {AutoAffix} from 'react-overlays';
import DatetimeRangePicker from 'react-datetime-range-picker';
import moment from 'moment-timezone';

var zone = "America/New_York";

//http://localhost:8000/api/gfilter/start_date=2016-01-09&end_date=2018-02-17

class uri {
  constructor(start_date, end_date) {
    this.start_date = start_date;
    this.end_date = end_date;
    this.start_time = '';
    this.end_time = '';
  }

  set setStartDate(start_date){
    this.start_date = start_date;
  }

  set setEndDate(end_date){
    this.end_date = end_date;
  }

  set setStartTime(start_time){
    this.start_time = start_time;
  }

  set setEndTime(end_time){
    this.end_time = end_time;
  }

  get getStartDateString(){
    return this.start_date.toISOString().substr(0, 10);
  }

  get getEndDateString(){
    return this.end_date.toISOString().substr(0, 10);
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
    //start_hh_mm_dd = this.start_date.toISOString().substring(11, 19);
    start_hh_mm_dd = this.start_time;

    end_yr_month_day = this.end_date.toISOString().substr(0, 10);
    //end_hh_mm_dd = this.end_date.toISOString().substring(11, 19);
    end_hh_mm_dd = this.end_time;
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
                'Past Month', 'Past Year', 'Custom Dates',
                'Custom Times', 'Custom Dates and Times',
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
      this.handleCustomDates = this.handleCustomDates.bind(this);
      this.handleCustomTimes = this.handleCustomTimes.bind(this);
      this.handleCustomDatesAndTimes = this.handleCustomDatesAndTimes.bind(this);

      this.state = {
          value: this.props.title,
          selections: this.props.selections,
          title: this.props.title,
      }

    }

    handleChange(e){
      this.setState({ value: e.target.value }, () =>{
        console.log(this.state.title);
        if(this.state.title === 'Time Frame'){
          switch(this.state.value){
            case 'Past Week':
              var today = moment();
              var past = moment().subtract(7, 'days');
              var params = new uri(past, today);
              this.props.updateRequest(params.getString);
              break;
            case 'Past Day':
              var today = moment();
              var past = moment().add(-1, 'days');
              var params = new uri(past, today);
              this.props.updateRequest(params.getString);
              break;
            case 'Past Hour':
              var today = moment();
              var past = moment().subtract(1, 'hour');
              var params = new uri(past, today);
              params.setStartTime = past.toISOString().substring(11, 19)
              params.setEndTime = today.toISOString().substring(11, 19)
              this.props.updateRequest(params.getString);
              break;
            case 'Past Month':
              var today = moment();
              var past = moment().subtract(1, 'month');
              var params = new uri(past, today);
              this.props.updateRequest(params.getString);
              break;
            case 'Past Year':
              var today = moment();
              var past = moment().subtract(1, 'year');
              var params = new uri(past, today);
              this.props.updateRequest(params.getString);
              break;
          }
        }
      });
    }

    handleCustomDates(e){
      //console.log(e.start);
      //console.log(e.end);
      var params = new uri(e.start, e.end);
      //console.log(params.getString);
      this.props.updateRequest(params.getString);
    }

    handleCustomTimes(e){
      console.log(e.start);
      //console.log(e.start);
      //console.log(e.end);
      var params = new uri(moment(), moment());
      params.setStartTime = moment(e.start).format("HH:mm:ss");
      params.setEndTime = moment(e.end).format("HH:mm:ss");
      //console.log(params.getString);
      this.props.updateRequest(params.getString);
    }

    handleCustomDatesAndTimes(e){
    var params = new uri(moment(e.start), moment(e.end));
    var stime = moment(e.start).format("HH:mm:ss");
    var etime = moment(e.end).format("HH:mm:ss");
    if(stime !== etime){
      params.setStartTime = stime;
      params.setEndTime = etime;
    }
    this.props.updateRequest(params.getString);
    }

    render() {
      var showCustomFrame;
      if(this.state.value === 'Custom Dates'){
        showCustomFrame = (
          <DatetimeRangePicker
            onChange={this.handleCustomDates}
            timeFormat={false}
          />
        );
      }
      else if(this.state.value === 'Custom Times'){
        showCustomFrame = (
          <DatetimeRangePicker
            onChange={this.handleCustomTimes}
            dateFormat={false}
          />
        );
      }
      else if(this.state.value === 'Custom Dates and Times'){
        showCustomFrame = (
          <div>
            <DatetimeRangePicker
              onChange = {this.handleCustomDatesAndTimes}
            />
          </div>
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
            {showCustomFrame}
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

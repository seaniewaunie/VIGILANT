import React, { Component } from 'react';
import uri from './js/uriUtil.js';
import moment from 'moment-timezone';
import DatetimeRangePicker from 'react-datetime-range-picker';
import {Form, FormGroup, ControlLabel, FormControl, Col} from 'react-bootstrap';

export default class Selector extends Component{
    constructor(props){
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.handleCustomDates = this.handleCustomDates.bind(this);
      this.handleCustomTimes = this.handleCustomTimes.bind(this);
      this.handleCustomDatesAndTimes = this.handleCustomDatesAndTimes.bind(this);

      this.state = {
          value: this.props.default,
          selections: this.props.selections,
          title: this.props.title,
          type: '',
      }

    }

    handleChange(e){
      this.setState({ value: e.target.value }, () =>{
        console.log(this.state.title);
        if(this.state.title === 'Time Frame'){
          var today = moment();
          var past;
          switch(this.state.value){
            case 'Past Week':
              past = moment().subtract(7, 'days');
              break;
            case 'Past Day':
              past = moment().add(-1, 'days');
              break;
            case 'Past Hour':
              past = moment().subtract(1, 'hour');
              var params = new uri(past, today);
              params.setStartTime = past.toISOString().substring(11, 19)
              params.setEndTime = today.toISOString().substring(11, 19)
              this.props.updateRequest(params.getString, this.state.title, this.state.value);
              return;
            case 'Past Month':
              past = moment().subtract(1, 'month');
              break;
            case 'Past Year':
              past = moment().subtract(1, 'year');
              break;
            case 'All':
              params = new uri();
              this.props.updateRequest(params.getString, this.state.title, this.state.value);
              return;
            default:
              return;
        }

        var params = new uri(past, today);
        this.props.updateRequest(params.getString, this.state.title, this.state.value);
      }
      });
    }

    handleCustomDates(e){
      //console.log(e.start);
      //console.log(e.end);
      var params = new uri(e.start, e.end);
      //console.log(params.getString);
      this.props.updateRequest(params.getString, this.state.title, this.state.value);
    }

    handleCustomTimes(e){
      //console.log(e.start);
      //console.log(e.start);
      //console.log(e.end);
      var params = new uri();
      var stime = moment(e.start).format("HH:mm:ss");
      var etime = moment(e.end).format("HH:mm:ss");
      if(stime < etime){
        params.setStartTime = stime;
        params.setEndTime = etime;
      }
      else {
        return;
      }
      //console.log(params.getString);
      this.props.updateRequest(params.getString, this.state.title, this.state.value);
    }

    handleCustomDatesAndTimes(e){
    var params = new uri(moment(e.start), moment(e.end));
    var stime = moment(e.start).format("HH:mm:ss");
    var etime = moment(e.end).format("HH:mm:ss");
    if(stime < etime){
      params.setStartTime = stime;
      params.setEndTime = etime;
    }
    this.props.updateRequest(params.getString, this.state.title, this.state.value);
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

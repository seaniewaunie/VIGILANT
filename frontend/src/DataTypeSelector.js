import React, { Component } from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {FormGroup, ControlLabel} from 'react-bootstrap';

export default class DataTypeSelector extends Component{
  constructor(props){
    super(props);

    this.state = {
    	propTypes: {
    		label: PropTypes.string,
      },
      title: this.props.title,
      removeSelected: false,
      disabled: this.props.disabled,
      stayOpen: this.props.stayOpen,
      value: [this.props.default],
      rtl: false,
      options: this.props.selections,
      multi: this.props.multi
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);

	}

	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
    //if(value.includes('i') && value.includes('o')){
     // value = []
    //}
		this.setState({ value }, () => {
      this.props.updateRequest(this.state.value);
    });
	}

	render () {
		const { disabled, stayOpen, value } = this.state;
		return (
      <FormGroup >
          <ControlLabel>{this.props.title}</ControlLabel>
  				<Select
  					closeOnSelect={!stayOpen}
  					disabled={disabled}
  					multi={this.state.multi}
  					onChange={this.handleSelectChange}
  					options={this.state.options}
  					placeholder='All'
            removeSelected={this.state.removeSelected}
  					rtl={this.state.rtl}
  					simpleValue
  					value={value}
  				/>
			</FormGroup>
		);
	}
};

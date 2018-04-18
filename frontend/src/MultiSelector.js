import React, { Component } from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {FormGroup, ControlLabel} from 'react-bootstrap';

export default class MultiSelectField extends Component{
  constructor(props){
    super(props);

    var title = this.props.title;
    if(title === 'Indoor/Outdoor'){
      title = 'i_o';
    }

    this.state = {
    	propTypes: {
    		label: PropTypes.string,
      },
      title: title,
      removeSelected: false,
      disabled: this.props.disabled,
      stayOpen: true,
      value: [this.props.default],
      rtl: false,
      options: this.props.selections,
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);

	}

	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
    if(value.includes('i') && value.includes('o')){
      value = []
    }
		this.setState({ value }, () => {
      this.props.updateRequest(
          '&' + this.state.title.toLowerCase() + '=['+this.state.value + ']',
        this.props.title,
        this.state.value);
    });


	}

	render () {
		const { disabled, stayOpen, value } = this.state;
		return (
      <FormGroup ControlId='dropdown-basic' >
          <ControlLabel>{this.props.title}</ControlLabel>
  				<Select
  					closeOnSelect={!stayOpen}
  					disabled={disabled}
  					multi
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

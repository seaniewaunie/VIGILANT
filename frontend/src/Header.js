import React, { Component } from 'react';
import logo from './logo.svg';
import Modal from './Modal';
import './Header.css';

class Header extends Component {
	constructor(props) {
		super(props)
		this.state = { isVisModalOpen: false, isFilterModalOpen: false }
	}
	
  render() {
    return (
      <div className="Header">
        <ul>
            <li><img src={logo} className="Header-logo" alt="logo" /></li>
            <li><a href = "#">VIGILANT</a></li>
            <li><button id="addVisBtn" onClick={() => this.openVisModal()}>Add Visualization</button></li>
			<Modal isOpen={this.state.isVisModalOpen} onClose={() => this.closeVisModal()}>
				<h1>Add Visualization</h1>
				<p>Select visualization type below</p>
				<img src="heat-map icon.png" width= "100" height="100" vspace="10" hspace="10" />
				<img src="barchart icon.png" width= "100" height="100" vspace="10" hspace="10" />
				<img src="line graph icon.png" width= "100" height="100" vspace="10" hspace="10" />
				<img src="pie chart icon.png" width= "100" height="100" vspace="10" hspace="10" />
				<img src="timeline icon.png" width= "100" height="100" vspace="10" hspace="10" />
				<img src="table icon.png" width= "100" height="100" vspace="10" hspace="10" />
				
				<p><button onClick={() => this.closeVisModal()}>Close</button></p>
			</Modal>
            <li style={{float:"right"}}><button>Log In</button></li>

            <li style={{float:"right"}} id="globFilBtn" onClick={() => this.openFilterModal()}><button>Global Filter</button></li>
			<Modal isOpen={this.state.isFilterModalOpen} onClose={() => this.closeFilterModal()}>
				
				<h1>Global Filter</h1>
				<p>Filters selected here will apply to all existing visualizations</p>
				<fieldset>
					<legend>Hours in the day</legend>
					Start: <select>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
						<option value="11">11</option>
						<option value="12">12</option>
					</select>
					<select>
						<option value="am">AM</option>
						<option value="pm">PM</option> 
						
					</select><br />
					End: <select>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
						<option value="11">11</option>
						<option value="12">12</option>
					</select>
					<select>
						<option value="am">AM</option>
						<option value="pm">PM</option> 
					</select><br />
				</fieldset>
				<fieldset style={{float:"left"}}>
					<legend>Days of the week</legend>
					<input type="checkbox" name="sun" id="sun" value="sun" /><label for="sun">Sunday</label><br />
					<input type="checkbox" name="mon" id="mon" value="mon"  /><label for="mon">Monday</label><br />
					<input type="checkbox" name="tues" id="tues" value="tues" /><label for="tues">Tuesday</label><br />
					<input type="checkbox" name="wed" id="wed" value="wed" /><label for="wed">Wednesday</label><br />
					<input type="checkbox" name="thur" id="thur" value="thur" /><label for="thur">Thursday</label><br />
					<input type="checkbox" name="fri" id="fri" value="fri" /><label for="fri">Friday</label><br />
					<input type="checkbox" name="sat" id="sat" value="sat" /><label for="sat">Saturday</label><br />
				</fieldset>
				<fieldset style={{float:"left"}}>
					<legend>Months of the year</legend>
					<input type="checkbox" name="jan" id="jan" value="jan" /><label for="jan">January</label><br />
					<input type="checkbox" name="feb" id="feb" value="feb" /><label for="feb">February</label><br />
					<input type="checkbox" name="mar" id="mar" value="mar" /><label for="mar">March</label><br />
					<input type="checkbox" name="apr" id="apr" value="apr" /><label for="apr">April</label><br />
					<input type="checkbox" name="may" id="may" value="may" /><label for="may">May</label><br/>
					<input type="checkbox" name="jun" id="jun" value="jun" /><label for="jun">June</label><br />
					<input type="checkbox" name="jul" id="jul" value="jul" /><label for="jul">July</label><br />
					<input type="checkbox" name="aug" id="aug" value="aug" /><label for="aug">August</label><br />
					<input type="checkbox" name="sep" id="sep" value="sep" /><label for="sep">September</label><br />
					<input type="checkbox" name="oct" id="oct" value="oct" /><label for="oct">October</label><br />
					<input type="checkbox" name="nov" id="nov" value="nov" /><label for="nov">November</label><br />
					<input type="checkbox" name="dec" id="dec" value="dec" /><label for="dec">December</label><br />
				</fieldset>
				
				<fieldset style={{float:"left"}}>
					<legend>District</legend>
					<input type="checkbox" name="n" id="n" value="n" /><label for="n">North</label><br />
					<input type="checkbox" name="nw" id="nw" value="nw" /><label for="nw">Northwest</label><br />
					<input type="checkbox" name="ne" id="ne" value="ne" /><label for="ne">Northeast</label><br />
					<input type="checkbox" name="w" id="w" value="w" /><label for="w">West</label><br />
					<input type="checkbox" name="c" id="c" value="c" /><label for="c">Central</label><br />
					<input type="checkbox" name="e" id="e" value="e" /><label for="e">East</label><br />
					<input type="checkbox" name="s" id="s" value="s" /><label for="s">South</label><br />
					<input type="checkbox" name="sw" id="sw" value="sw" /><label for="sw">Southwest</label><br />
					<input type="checkbox" name="se" id="se" value="se" /><label for="se">Southeast</label><br />
				</fieldset>
				
				
				<button className="close" onClick={() => this.closeFilterModal()}>Close</button>
			</Modal>
            <li style={{float:"right"}}><button>Restore</button></li>
            <li style={{float:"right"}}><button>Remove</button></li>

        </ul>
      </div>
	  
    );
  }
  
  openVisModal() {
    this.setState({ isVisModalOpen: true })
  }

  closeVisModal() {
    this.setState({ isVisModalOpen: false })
  }
  
  openFilterModal() {
    this.setState({ isFilterModalOpen: true })
  }

  closeFilterModal() {
    this.setState({ isFilterModalOpen: false })
  }
}


export default Header;

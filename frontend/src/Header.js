import React, { Component } from 'react';
import logo from './logo.svg';
import Modal from './Modal';
import './Header.css';

class Header extends Component {
	constructor(props) {
		super(props)
		this.state = { isModalOpen: false }
	}
	
  render() {
    return (
      <div className="Header">
        <ul>
            <li><img src={logo} className="Header-logo" alt="logo" /></li>
            <li><a href = "#">VIGILANT</a></li>
            <li><button id="addVisBtn" onClick={() => this.openModal()}>Add Visualization</button></li>
			<Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
				<h1>Add Visualization</h1>
				<p>Select visualization type below</p>
				<img src="heat-map icon.png" width= "100" height="100" vspace="10" hspace="10" />
				<img src="barchart icon.png" width= "100" height="100" vspace="10" hspace="10" />
				<img src="line graph icon.png" width= "100" height="100" vspace="10" hspace="10" />
				<img src="pie chart icon.png" width= "100" height="100" vspace="10" hspace="10" />
				<img src="timeline icon.png" width= "100" height="100" vspace="10" hspace="10" />
				<img src="table icon.png" width= "100" height="100" vspace="10" hspace="10" />
				
				<p><button onClick={() => this.closeModal()}>Close</button></p>
			</Modal>
            <li style={{float:"right"}}><button>Log In</button></li>

            <li style={{float:"right"}}><button>Global Filter</button></li>
            <li style={{float:"right"}}><button>Restore</button></li>
            <li style={{float:"right"}}><button>Remove</button></li>

        </ul>
      </div>
	  
    );
  }
  
  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }
}


export default Header;

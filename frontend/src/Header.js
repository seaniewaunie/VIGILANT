import React, { Component } from 'react';
import logo from './logo.svg';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <ul>
            <li><img src={logo} className="Header-logo" alt="logo" /></li>
            <li><a href = "#">VIGILANT</a></li>
            <li><button>Add Visualization</button></li>
            <li style={{float:"right"}}><button>Log In</button></li>

            <li style={{float:"right"}}><button>Global Filter</button></li>
            <li style={{float:"right"}}><button>Restore</button></li>
            <li style={{float:"right"}}><button>Remove</button></li>

        </ul>
      </div>
    );
  }
}

export default Header;

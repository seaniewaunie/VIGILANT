import React, {Component} from 'react';
import BarChartFS from './visuals/BarChart';

export default class Timeline extends Component {
  constructor(props){
    super(props);

    this.state = {
      dates: [],
    }
  }

  componentWillMount() {
    this.setState({
      dates: this.props.dates,
    })
  }

  render() {
    return (
      <div className="timeline">
        <BarChartFS
          data={this.state.dates}
          height={'5vh'}
          width={'100%'}
        />
      </div>
    );
  }
}

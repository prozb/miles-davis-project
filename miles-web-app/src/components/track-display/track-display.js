import './track-display.css';
import React, { Component } from 'react';

export default class TrackDisplay extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
        displaying {this.props.name} information
      </div>
    )
  }
}

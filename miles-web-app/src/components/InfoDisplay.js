import React, { Component } from 'react';
import '../styles/info-display.css';

export default class InfoDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
        recordsCount: 1012,
        albumsCount: 32,
        musiciansCount: 59
    };
  }

  render() {
    return (
      <div className="info-container info-shadow"> 
          <p className="lead"><b>Records count: </b>{this.state.recordsCount}</p>
          <p className="lead"><b>Musicians count: </b>{this.state.musiciansCount}</p>
          <p className="lead"><b>Albums count: </b>{this.state.albumsCount}</p>
      </div>
    );
  }
}

import React, { Component } from 'react';
import '../styles/info-display.css';

export default class InfoDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
        albumsCount: 53,
        musiciansCount: 159,
        tracksRecorded: 1524,
    };
  }

  render() {
    return (
      <div className="info-container info-shadow"> 
          <p className="lead"><b>Involved musicians: </b>{this.state.musiciansCount}</p>
          <p className="lead"><b>Albums recorded: </b>{this.state.albumsCount}</p>
          <p className="lead"><b>Tracks recorded: </b>{this.state.tracksRecorded}</p>
      </div>
    );
  }
}

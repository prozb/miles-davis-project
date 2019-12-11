import React, { Component } from 'react';
import '../styles/navigation.css';
import AlbumNavbarComponent from './AlbumNavbarComponent';
import Triangle from './Triangle';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      musicians: [],
      instruments: [],
    };
  }

  render() {
    return (
      <div className="navigation-container">
        <AlbumNavbarComponent data={this.tracks} title="Tracks" style={{flex: 1}}/>
        <AlbumNavbarComponent data={this.musicians} title="Musicians" style={{flex: 1}}/>
        <AlbumNavbarComponent data={this.instruments} title="Instruments" style={{ flex: 1}}/>
      </div>
    );
  }
}

import React, { Component } from 'react';
import '../styles/navigation.css';
import AlbumNavbarComponent from './AlbumNavbarComponent';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="navigation-container">
        <AlbumNavbarComponent title="Tracks" style={{flex: 1}}/>
        <AlbumNavbarComponent title="Musicians" style={{flex: 1}}/>
        <AlbumNavbarComponent title="Instruments" style={{ flex: 1}}/>
      </div>
    );
  }
}

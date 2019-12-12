import React, { Component } from 'react';
import '../styles/navigation.css';
import AlbumInfo from './AlbumInfo';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: ["Dig", "My Old Flame", "It's Only a Paper Moon", "Dear Old Stockholm", "Chance It",
      "Donna", "How Deep Is the Ocean?"],

      musicians: ["Miles Davis", "Deron Johnson", "Palle Mikkelborg", "Marilyn Mazur", "Lillian Thornquist",
      "Niels Eje", "Eva Hess-Thaysen", "Miles Davis", "Deron Johnson", "Palle Mikkelborg", "Marilyn Mazur", "Lillian Thornquist",
      "Niels Eje", "Eva Hess-Thaysen", "Miles Davis", "Deron Johnson", "Palle Mikkelborg", "Marilyn Mazur", "Lillian Thornquist",
      "Niels Eje", "Eva Hess-Thaysen"],

      instruments: ["Violet", "Intro", "White", "Yellow", "Orange", "Red", "Green"],
    };
  }

  render() {
    return (
      <div className="navigation-container">
        <AlbumInfo data={this.state.tracks} title="Tracks" style={{flex: 1}}/>
        <AlbumInfo data={this.state.musicians} title="Musicians" style={{flex: 1}}/>
        <AlbumInfo data={this.state.instruments} title="Instruments" style={{ flex: 1}}/>
      </div>
    );
  }
}

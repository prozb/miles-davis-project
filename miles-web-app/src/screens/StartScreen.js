import React, { Component } from 'react';
import image from '../assets/start-screen.png';

export default class StartScreen extends Component {
  render() {
    return (
      <div>
        <img className="img-fluid rounded mg-fluid img-thumbnail" src={image} alt="start screen foto" />
      </div>
    );
  }
}

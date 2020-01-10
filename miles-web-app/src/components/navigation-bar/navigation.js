import React, { Component } from 'react';
import './navigation.css';
import NavigationSection from './nav-section/nav-section';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navigation-container">
        <NavigationSection data={this.props.tracks} title="Tracks"/>
        <NavigationSection data={this.props.musicians} title="Musicians"/>
      </div>
    );
  }
}

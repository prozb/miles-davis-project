import './icon.css';
import React, { Component } from 'react';

/**
 * component for displaying icon
 * @author Pavlo Rozbytskyi
 */

export default class Icon extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div
        className="icon-container"
        style={{backgroundImage: `url(${this.props.url})`}}>
      </div>
    )
  }
}
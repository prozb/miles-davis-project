import React, { Component } from 'react';
import '../styles/triangle.css';

export default class Triangle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {left, ...props} = this.props;
    const triangleClass = left ? "triangle-left" : "triangle-right";
    return (
      <div className={triangleClass} {...props} ></div>
    );
  }
}

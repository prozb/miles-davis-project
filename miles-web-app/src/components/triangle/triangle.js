import React, { Component } from 'react';
import './triangle.css';

export default class Triangle extends Component {
  render() {
    const {right, left, ...props} = this.props;
    const triangleClass = left ? "triangle-left" : "triangle-right";
    return (
      <div className={triangleClass} {...props} ></div>
    );
  }
}

import React, { Component } from 'react';
import './triangle.css';

export default class Triangle extends Component {
  render() {
    const {right, left, ...props} = this.props;
    const triangleClass = left ? "triangle-left triangle-shape" : "triangle-right triangle-shape";
    return (
      <div className={triangleClass} {...props} ></div>
    );
  }
}

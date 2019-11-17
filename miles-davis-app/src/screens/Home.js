import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <React.Fragment>
        <Jumbotron/>
        </React.Fragment>
    );
  }
}

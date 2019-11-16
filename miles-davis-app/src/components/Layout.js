import React, { Component } from 'react';
import {Container} from 'react-bootstrap'; 

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container>
          {this.props.children}
      </Container>
    );
  }
}

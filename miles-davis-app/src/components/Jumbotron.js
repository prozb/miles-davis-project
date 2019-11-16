import React, { Component } from 'react';
import {Jumbotron as Jumbo, Container} from 'react-bootstrap';
import styled from 'styled-components';
import image from '../assets/jazz-jumbo.jpg';

const Styles = styled.div`
  .jumbo {
    background: url(${image}) no-repeat fixed bottom;
    color: #ccc;
    height: 200px;
    position: relative;
    z-index: -2;
  }

  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    roght: 0; 
    z-index: -1;
  }
`;

export default class Jumbotron extends Component {

  render() {
    return (
      <Styles>
        <Jumbo fluid className="jumbo">
          <div className="overlay">
            <Container>
              <h1>Hello Miles Davis Discog</h1>
              <p>learn how to visualize data</p>
            </Container>
          </div>
        </Jumbo>
      </Styles>
    );
  }
}

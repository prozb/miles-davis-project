import React, { Component } from 'react';
import {Jumbotron as Jumbo, Container, Button} from 'react-bootstrap';
import styled from 'styled-components';
import image from '../assets/jazz-jumbo.png';

const Styles = styled.div`
  .jumbo {
    background: linear-gradient( rgba(0,0,0,0.5), rgba(0, 0, 0, 0.5) ), url(${image}) no-repeat;
    color: #ccc;
    position: relative;
    z-index: -2;
  }

  .overlay {
    position: relative;
    top: 20px;
    z-index: -1;
    padding-bottom: 20px;
  }

  p {
    color: white;
    font-size: 20px;
    overflow-wrap: break-word;
    overflow: hidden;
    max-width: 520px;
  }
  
  h1 {
    color: white;
  }
`;



export default class Jumbotron extends Component {

  render() {
    return (
      <Styles>
        <Jumbo fluid className="jumbo">
          <div className="overlay">
            <Container>
              <h1>Miles Davis Discography</h1>
              <p>Let me show you how easily you can explore  
                the whole Miles Davis discography.</p>
              <Button>Start to explore &raquo;</Button>
            </Container>
          </div>
        </Jumbo>
      </Styles>
    );
  }
}

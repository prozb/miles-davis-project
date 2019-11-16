import React, { Component } from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';


const Styles = styled.div`
    .navbar {
        background-color: #222;
    }

    .navbar-brand, .navbar-nav .nav-link {
        color: #bbb;

        &:hover {
            color: white;
        }
    }
`;
export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Styles>
          <Navbar expend="md" variant="dark">
            <Navbar.Brand href="/">Discography</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav">Discography</Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/contacts">Contacts</Nav.Link></Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      </Styles>
    );
  }
}

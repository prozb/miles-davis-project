import React, { Component } from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';


const Styles = styled.div`
    .navbar {
        background-color: #1D2025;
    }

    .navbar-brand, .navbar-nav .nav-link {
        color: #fff;
    }
`;
export default class NavigationBar extends Component {
  render() {
    return (
      <Styles>
          <Navbar expand="sm" variant="dark">
            <Navbar.Brand href="/"><img src={require('../assets/alto-saxophone.png')} alt="saxophone logo" width="35"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/exploration">Exploration</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/contacts">Contacts</Nav.Link></Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      </Styles>
    );
  }
}

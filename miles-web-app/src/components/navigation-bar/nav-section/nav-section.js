import React, { Component } from 'react';
import './nav-section.css';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';

export default class NavigationSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getElementToRender = (name) => {
    return <div className="list-element">
      <MenuItem>
        <Box fontSize={18}>
          {name}
        </Box>
      </MenuItem>
    </div>
  }

  getAllTitles = () => {
    var elements = [];

    for(var i = 0; i < this.props.data.length; i++){
      elements.push(this.getElementToRender(this.props.data[i]));
    }

    return elements;
  }

  render() {
    const {style} = this.props;

    return (
      <div className="navigation-element" style={style}>
        <Box fontSize={18} fontWeight="600" style={{padding: 10}}>
          {this.props.title}
        </Box>
        {/* <div style={{overflowX: 'hide'}}> */}
        {this.getAllTitles()}
      </div>
    );
  }
}

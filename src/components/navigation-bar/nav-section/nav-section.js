import React, { Component } from 'react';
import './nav-section.css';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
/**
 * section to display all menu items
 * @author Pavlo Rozbytskyi
 */
export default class NavigationSection extends Component {
  /**
   * rendering menu element
   */
  getElementToRender = (name, key) => {
    return (
      <div key={key}>
        <MenuItem onClick={() => this.props.handleOnSectionClick(name, this.props.type)}>
          <Box fontSize={18}>
            {name}
          </Box>
        </MenuItem>
      </div>
    )
  }
  /**
   * getting all titles to render
   */
  getAllTitles = () => {
    var elements = [];

    for(var i = 0; i < this.props.data.length; i++){
      elements.push(this.getElementToRender(this.props.data[i], i));
    }

    return elements;
  }
  /**
   * @param {string} name passed title
   * converting old title to new title format: title -> Titles
   */
  convertTitle = (name) => {
    if(name){
      return `${name.charAt(0).toUpperCase()}${name.substring(1)}s`;
    }
    return "Titles";
  }
  render() {
    const {style, type, className} = this.props;
    const title = this.convertTitle(type);

    return (
      <div className={`mh-50 ${className}`} style={style}>
        <Box fontSize={18} fontWeight="600">
          {title}
        </Box>
        {/* <React.Fragment key="getIdFromName"> */}
          {/* <div style={{overflowX: 'hide'}}> */}
          {this.getAllTitles()}
        {/* </React.Fragment> */}
      </div>
    );
  }
}

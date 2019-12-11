import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import '../styles/navigation.css';

export default class AlbumNavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {style} = this.props;

    return (
      <div className="navigation-element" style={style}>
        <Typography variant="h6">
          {this.props.title}
        </Typography>
      </div>
    );
  }
}

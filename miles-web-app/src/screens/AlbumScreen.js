import React, { Component } from 'react';

export default class AlbumScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {name} = this.props;
    return (
      <div>{name}</div>
    );
  }
}

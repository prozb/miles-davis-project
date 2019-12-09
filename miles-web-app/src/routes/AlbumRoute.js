import React, { Component } from 'react';
import { withRouter, } from 'react-router-dom';
import queryString from 'query-string';

class AlbumRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    this.setState({name: values.name});
  }

  render() {
    return (
        <div>{this.state.name}</div>
    );
  }
}

export default withRouter(AlbumRoute);
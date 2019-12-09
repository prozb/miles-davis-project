import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import TimelineComponent from '../components/TimelineComponent';
import '../App.css';

class AlbumRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    this.setState({name: values.name});

  }

  render() {
    return (
        <div className="container">
          <div className="timeline-container-albums">
            <TimelineComponent style={{paddingTop: 10, paddingBottom: 10,}}/>
          </div>
        </div>
    );
  }
}

export default withRouter(AlbumRoute);
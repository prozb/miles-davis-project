import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import TimelineComponent from '../components/TimelineComponent';
import '../App.css';
import '../styles/album-route.css';
import SearchBar from '../components/SearchBar';

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

  switchToAlbum = (albumName) => {
    this.setState({name: albumName});
  }

  render() {
    return (
      <div className="album-container">
        <div className="timeline-container-albums">
          <TimelineComponent switchToAlbum={this.switchToAlbum} style={{paddingTop: 10, paddingBottom: 10,}}/>
        </div>

        <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
          {/* search bar container */}
          <div>
            <SearchBar name={this.state.name}/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AlbumRoute);
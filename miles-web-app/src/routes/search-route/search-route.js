import React, { Component } from 'react';
import '../album-route/album-route.css';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { SearchBar } from '../../components';
import CustomizedMenus from './menu/menu';
import { instrumentService, albumService, musicianService, trackService } from '../../service';

class SearchRoute extends Component {
  constructor(props){
    super(props);

    this.state = {
      musicians: [],
      tracks: [],
      instruments: [],
      albums: [],
      query: '', 
    }
  }
  /**
   * switching from album screen to next search screen
   * @param {string} query - query
   */
  switchToSearch = (query) => {
    this.props.history.push(`/search?q=${query}`);
    const values = queryString.parse(this.props.location.search);
    this.setState({query: values.q});
  }

  render() {
    const values = queryString.parse(this.props.location.search);

    var instruments = instrumentService.getAllContainingSubstring(values.q);
    var albums = albumService.getAllContainingSubstring(values.q);
    var tracks = trackService.getAllContainingSubstring(values.q);
    var musicians = musicianService.getAllContainingSubstring(values.q);

    var count = instruments.length + albums.length + musicians.length + tracks.length;
    return (
      <div className="full-height">
        <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
          {/* search bar container */}
          <div>
            <SearchBar
              back={true}
              name={"Search results"} 
              onNavbarButtonPress={() => {
                this.props.history.goBack();
              }}
              switchToSearch={this.switchToSearch}/>
          </div>
        </div>

        <div className="container horizontal">
          <div>
            <CustomizedMenus data={[
                {name: 'Albums', count: albums.length}, {name: 'Musicians', count: musicians.length},
                {name: 'Instruments', count: instruments.length}, {name: 'Tracks', count: tracks.length}
              ]}/>
          </div>

          <div className="full-width results-container">
            <h3 className="display-7">Showing  {count} available result{count !== 1 ? 's' : ''}</h3>
            <hr/>
          </div>
        </div>
        {/* starting navigation and content container */}
      </div>
    );
  }
}

export default withRouter(SearchRoute);
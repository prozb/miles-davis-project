import React, { Component } from 'react';
import '../album-route/album-route.css';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { SearchBar } from '../../components';
import CustomizedMenus from './menu/menu';
import { instrumentService, albumService, musicianService, trackService } from '../../service';
import Graph from '../../components/album-graph/graph';
import { getCytoAlbum, getCytoMusician, getCytoTrack, getCytoInstrument } from '../../scripts/converter';

class SearchRoute extends Component {
  constructor(props){
    super(props);

    this.state = {
      query: '', 
      type: ''
    }
  }

  componentDidMount () {
    // be sure that all another screens are disabled when 
    // search screen must be showed
    this.props.showSearchScreen();
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

  changeMenuItem = (type) => {
    this.setState({
      type: type
    });
  } 
  /**
   * switching to album
   */
  switchToAlbum = (albumName) => {
    this.props.history.push(`/album?name=${albumName}`);
  }

  /**
   * switching to musician
   */
  switchToMusician = (musicianName) => {
    var albumName = albumService.getFirstAlbum()[0];
    var query = queryString.stringify({name: albumName, m: musicianName});
    this.props.history.push(`/album?${query}`);
  }

  render() {
    const values = queryString.parse(this.props.location.search);

    var instruments = instrumentService.getAllContainingSubstring(values.q);
    var albums = albumService.getAllContainingSubstring(values.q);
    var tracks = trackService.getAllContainingSubstring(values.q);
    var musicians = musicianService.getAllContainingSubstring(values.q);
    var count = instruments.length + albums.length + musicians.length + tracks.length;

    var data = [];

    switch(this.state.type){
      case "Albums": 
        data = [...albums.map(elem => getCytoAlbum(elem))];
        break;
      case "Instruments": 
        data = [...instruments.map(elem => getCytoInstrument(elem))];
        break;
      case "Musicians": 
        data = [...musicians.map(elem => getCytoMusician(elem))];
        break;
      case "Tracks": 
        data = [...tracks.map(elem => getCytoTrack(elem))];
        break;

      default: 
        data = [
          ...albums.map(elem => getCytoAlbum(elem)), 
          ...musicians.map(elem => getCytoMusician(elem)),
          ...tracks.map(elem => getCytoTrack(elem)),
          ...instruments.map(elem => getCytoInstrument(elem))
        ];
        break;
    }
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

        <div className="container horizontal full-height">
          <div>
            <CustomizedMenus 
              changeMenuItem={this.changeMenuItem}
              data={[
                {name: 'Albums', count: albums.length}, {name: 'Musicians', count: musicians.length},
                {name: 'Instruments', count: instruments.length}, {name: 'Tracks', count: tracks.length}
              ]}/>
          </div>

          <div className="full-width results-container">
            <h3 className="display-7">Showing  {count} available result{count !== 1 ? 's' : ''}</h3>
            <hr/>
            <Graph 
              switchToAlbum={this.switchToAlbum}
              hideMusicianDisplay={() => {}}
              showMusicianDisplay={this.switchToMusician}
              showTrackDisplay={() => {}}
              showInstrumentDisplay={() => {}}
              hideInstrumentDisplay={() => {}}
              handleCollection={() => {}}
              type="musician"
              special={true}
              data={data}/>
          </div>
        </div>
        {/* starting navigation and content container */}
      </div>
    );
  }
}

export default withRouter(SearchRoute);
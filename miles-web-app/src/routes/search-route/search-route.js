import '../album-route/album-route.css';

import React, { Component } from 'react';
import Graph from '../../components/album-graph/graph';
import CustomizedMenus from './menu/menu';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { SearchBar } from '../../components';
import { 
  getCytoAlbum, getCytoMusician, getCytoTrack, getCytoInstrument 
} from '../../scripts/converter';

import { 
  instrumentService, albumService, musicianService, trackService
 } from '../../service';
/**
 * @author Pavlo Rozbytskyi
 * Search component to handle searching data in the 
 * discographie.
 */
class SearchRoute extends Component {
  constructor(props){
    super(props);

    this.state = {
      type: '', // type allows user to filter results 
    }
  }

  componentDidMount () {
    // be sure that all another screens are disabled when 
    // search screen must be showed
    this.props.showSearchScreen();
  }

  render() {
    // don't show this component if not active
    if(!this.props.active)
      return null;

    //parsing browser search-bar query
    const values = queryString.parse(this.props.location.search);
    // check q parameter is defined in search-bar
    const query = values.q ? values.q : '';
    // finding all data user is searching for
    var instruments = instrumentService.getAllContainingSubstring(query);
    var albums = albumService.getAllContainingSubstring(query);
    var tracks = trackService.getAllContainingSubstring(query);
    var musicians = musicianService.getAllContainingSubstring(query);
    // counting results to print it out for the user
    var count = instruments.length + albums.length + musicians.length + tracks.length;
    // data array where are all finded elements stored 
    var data = [];
    // user has ability to filter data by type 
    // and then data of some type will be shown on the screen
    switch(this.state.type){
      // display data only certain type 
      case "Albums": 
        // converting array with albums to array with cytoscape albums
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
      // by default show all results
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
        <SearchBar
          back={true}
          name={"Search results"} 
          onNavbarButtonPress={() => {
            this.props.history.goBack();
          }}
          switchToSearch={this.processSearch}/>

        <div className="container horizontal full-height">
          {/* Menu container */}
          <div>
            <CustomizedMenus 
              changeMenuItem={this.chooseFilterType}
              data={[
                {name: 'Albums', count: albums.length}, 
                {name: 'Musicians', count: musicians.length},
                {name: 'Instruments', count: instruments.length}, 
                {name: 'Tracks', count: tracks.length}
              ]}/>
          </div>
          {/* container with results */}
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

  /**
   * after users press to filter results this function
   * gives you wanted data type should be displayed 
   */
  chooseFilterType = (type) => {
    this.setState({type: type});
  } 
  /**
   * switching to album
   */
  switchToAlbum = (albumName) => {
    this.props.history.push(`/album?name=${albumName}`);
  }
  /**
   * processing new search
   * @param {String} query - search query
   */
  processSearch = (query) => {
    this.props.history.push(`/search?q=${query}`)
  }
  /**
   * switching to musician
   */
  switchToMusician = (musicianName) => {
    var albumName = albumService.getFirstAlbum()[0];
    var query = queryString.stringify({name: albumName, m: musicianName});
    this.props.history.push(`/album?${query}`);
  }
}

export default withRouter(SearchRoute);
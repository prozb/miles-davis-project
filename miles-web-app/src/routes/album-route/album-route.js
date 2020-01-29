import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import './album-route.css';
import { SearchBar, NavigationBar, Timeline, AlbumGraph, TrackDisplay } from '../../components';
import { albumService, musicianService, trackService, instrumentService } from '../../service';
import { getCytoElementsMusicianTrackAlbum, 
         getCytoElementsMusicianInstrumentAlbum,
         getCytoElementsInstrumentMusician,
         getSpecialCaseElements
  } from '../../scripts/helpers';

/**
 * @author Pavlo Rozbytskyi
 * 
 * component representing showing menu to the user 
 */
class AlbumRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      collapseNavbar: true,
      album: '',
      musicians: [],
      tracks: [],
      trackDisplay: false,
      trackName: '',
      musicianDisplay: false,
      musicianName: '',
      instrumentDisplay: false,
      instrumentName: '',
      specialCase: false,
    };
    this.data = [];
    this.specialCaseFunction = getSpecialCaseElements;
  }

  componentDidMount() {
    // getting values from the query string
    const values = queryString.parse(this.props.location.search);
    if(values.name){
      // if values from query string exist, get album name
      this.props.showAlbums(values.name);
      this.setCurrentAlbum(values.name);
    }else{
      // if values from query string does not exist, get first album
      // and set this album as current album
      var albumName = albumService.getFirstAlbum()[0];
      this.props.showAlbums(albumName);
      this.setCurrentAlbum(albumName);
    }
  }
  /**
   * getting all musicians of current album to component state
   * @param album - current album
   */
  getMusiciansOfAlbum = (album) => {
    var musicians = [];
    album[1].musicians.forEach(mus => {
      var musicianObject = musicianService.getMusicinaByName(mus);
      musicians.push(musicianObject);
    });
    return musicians;
  }

  /**
   * setting all tracks of current album to component state
   * @param album - current album
   */
  getTracksOfAlbum = (album) => {
    return trackService.getAllTracksOfAlbum(album[0]);
  }
  /**
   * switching from current album to next album
   * choosen by user  
   * @param {string} albumName  - name of the next album chosen by user
   */
  switchToAlbum = (albumName) => {
    this.props.history.push(`/album?name=${albumName}`);
    this.setCurrentAlbum(albumName);
  }
  /**
   * setting album by name to current webpage state
   * @param {string} albumName - name of the album
   */
  setCurrentAlbum = (albumName) => {
    var album = albumService.getAlbumByName(albumName);
    var musicians = this.getMusiciansOfAlbum(album);
    var tracks = this.getTracksOfAlbum(album);

    this.setState({
      album: album,
      name: albumName,
      musicians: musicians,
      tracks: tracks,
      trackDisplay: false,
      trackName: '',
      musicianDisplay: false,
      musicianName: '',
      instrumentDisplay: false,
      instrumentName: '',
      specialCase: false,
    });
  }
  /**
   * collapsing navbar
   */
  onNavbarButtonPress = () => {
    this.setState({collapseNavbar: !this.state.collapseNavbar});
  }
  /**
   * show track description
   * @param {string} trackName - track which description to show
   */
  showTrackDisplay = (trackName) => {
    this.setState({
      trackDisplay: true, 
      trackName: trackName
    });
  }
  /**
   * show instrument display
   * @param {string} trackName - track which description to show
   */
  showInstrumentDisplay = (name) => {
    this.setState({
      musicianDisplay: false,
      instrumentDisplay: true, 
      instrumentName: name
    });
  }

  /**
   * hide instrument display
   */
  hideInstrumentDisplay = () => {
    this.setState({
      musicianDisplay: true,
      instrumentDisplay: false, 
      instrumentName: ''
    });
  }

  /**
   * hide track display
   */
  hideTrackDisplay = () => {
    this.setState({
      trackDisplay: false, 
      trackName: ''
    });
  }
  /**
   * handle collection of selected nodes
   * @param {Array} elements - selected nodes
   */
  handleCollection = (elements) => {
    var type = this.getCurrentGraphType();

    switch(type){
      case 'album': 
        this.specialCaseFunction = getSpecialCaseElements;
        this.data = elements;
        this.setState({
          specialCase: true,
          trackDisplay: false,
          musicianDisplay: false,
          instrumentDisplay: false,   
        });
        break;
      case 'musician':
        break;
      default: 
        break;
    }
  }

  /**
   * showing musician perspective
   * @param {string} albumName - album name
   */
  showMusicianDisplay = (albumName) => {
    this.setState({
      trackDisplay: false,
      musicianDisplay: true, 
      musicianName: albumName,
      instrumentDisplay: false,
      instrumentName: '',
    });
  }
  /**
   * getting type of current graph to display: musician, album, or track
   */
  getCurrentGraphType = () => {
    if(this.state.trackDisplay)
      return 'track';
    else if(this.state.musicianDisplay)
      return 'musician';
    else if(this.state.instrumentDisplay)
      return 'instrument';
    return 'album';
  }
  /**
   * hinding musicians display
   */
  hideMusicianDisplay = () => {
    this.setState({
      musicianDisplay: false, 
      musicianName: '',
      trackDisplay: false,
      trackName: '',
    });
  }

  render() {
    const {
        album, musicians, tracks, musicianDisplay, 
        musicianName, instrumentDisplay, instrumentName,
        specialCase 
      } = this.state;
    const collapseStyle = this.state.collapseNavbar ? {display: 'flex', flex: 1} : {display: 'none'};
    const graphType = this.getCurrentGraphType();
    var data1 = [];
    var data2 = [];
    var type1 = "";
    var type2 = "";

    var elements = [];
    if(album){
      if(musicianDisplay){
        elements = getCytoElementsMusicianInstrumentAlbum(musicianName);
        data1 = musicianService.getAlbumsOfMusician(musicianName);
        data2 = musicianService.getInstrumentsOfMusician(musicianName);
        type1 = "album";
        type2 = "instrument";
      }else if(instrumentDisplay) {
        elements = getCytoElementsInstrumentMusician(instrumentName);
        data1 = instrumentService.getMusiciansOfInstrument(instrumentName).map(elem => elem[0]);
        data2 = [];
        type1 = "musician";
        type2 = "";
      }else if(specialCase) {
        elements = this.specialCaseFunction(this.data);
      }else {
        elements = getCytoElementsMusicianTrackAlbum(tracks, musicians, album);
        data1 = this.state.musicians.map(elem => elem[0]);
        data2 = this.state.tracks.map(elem => elem[0]);
        type1 = "musician";
        type2 = "track";
      }
    }
 
    if(!this.props.active)
			return null;
    return (
      <div className="full-height">
        <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
          {/* search bar container */}
          <div>
            <SearchBar name={this.state.name} onNavbarButtonPress={this.onNavbarButtonPress}/>
          </div>
        </div>
        {/* starting navigation and content container */}
        <div className="full-height" style={{flex: 2, display: 'flex', flexDirection: 'row'}}>
          {/* navigation container */}
          <div style={collapseStyle}>
            <NavigationBar 
              showMusicianDisplay={this.showMusicianDisplay}
              showTrackDisplay={this.showTrackDisplay}
              showAlbumsDisplay={this.switchToAlbum}
              showInstrumentDisplay={this.showInstrumentDisplay}
              data1={data1} 
              data2={data2}
              type1={type1}
              type2={type2}
            />
          </div>
          {/* end navigation container */}
          
          {/* starting content container */}
          <div className="vertical hide-scrollbar" style={{flex: 7,  overflow: 'scroll'}}>
            <Timeline highlighted={this.state.name} switchToAlbum={this.switchToAlbum} style={{marginTop: -20, height: 200, top: 20, marginBottom: 100,}}/>

            <div className="data-box-size">
              {!this.state.trackDisplay ? 
                <AlbumGraph 
                  type={graphType}
                  switchToAlbum={this.switchToAlbum}
                  hideMusicianDisplay={this.hideMusicianDisplay}
                  showMusicianDisplay={this.showMusicianDisplay}
                  showTrackDisplay={this.showTrackDisplay}
                  showInstrumentDisplay={this.showInstrumentDisplay}
                  hideInstrumentDisplay={this.hideInstrumentDisplay}
                  handleCollection={this.handleCollection}
                  data={elements}/> : 
                <TrackDisplay 
                  album={this.state.album}
                  name={this.state.trackName}
                  hideTrackDisplay={this.hideTrackDisplay}/>
              }
            </div>
          </div>
          {/* ending content container */}
        </div>
        {/* starting navigation and content container */}
      </div>
    );
  }
}

export default withRouter(AlbumRoute);
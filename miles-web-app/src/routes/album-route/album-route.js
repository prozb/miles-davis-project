import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import './album-route.css';
import { SearchBar, NavigationBar, Timeline, AlbumGraph, TrackDisplay } from '../../components';
import { albumService, musicianService, trackService, instrumentService } from '../../service';
import { 
    getAlbumPerspective, 
    getMusicianPerspective,
    getInstrumentPerspective,
    getCompoundForMusicians
  } from '../../scripts/converter';

/**
 * @author Pavlo Rozbytskyi
 * in this component is main user interaction where 
 * are showed different perspectives for the user.
 */
class AlbumRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseNavbar: false,
      album: '',
      trackName: '',
      musicianName: '',
      instrumentName: '',
    // cytoscape graph instance stays the same 
    // for all perspectives (musician, album, track, instrument) and we have 
    // to let the graph instance know which perspective to display
    // e.g to adjust styles and event handlers etc. 
    // That's why we need to keep the type of perspective in state of  
    // current component in perspective variable and past it into 
    // the graph instance.
      perspective: '', // current perspective
    };
    this.specialCaseFunction = getCompoundForMusicians;
  }

  componentDidMount() {
    // just be sure that just albums component will be showed
    this.props.showAlbums();
    // getting values from the query string
    const values = queryString.parse(this.props.location.search);
    // there are two values of the query string: n stands for 
    // name of the album and m stands for musicians name

    // if name of the album defined, show this album on the display
    if(values.n){
      // if values from query string exist, get album name
      this.props.showAlbums(values.n);
      this.setCurrentAlbum(values.n);
      // show musician if exists in the url
      if(values.m){
        this.showMusicianDisplay(values.m);
      }
    }else{
      // if values from query string does not exist, get first album
      // and set this album as current album
      var albumName = albumService.getFirstAlbum().id;
      this.setCurrentAlbum(albumName);
    }
  }

  render() {
    // don't show the component if not active
    if(!this.props.active)
      return null;
    // getting data from state
    const {
        album, perspective,
        musicianName, instrumentName,
        trackName
      } = this.state;
    // style to toggle navigation bar 
    const collapseStyle = this.state.collapseNavbar ? 
      {display: 'flex', flex: 1} : {display: 'none'};

    // data1 and data2 will be past into navigation bar
    var data1 = [];
    var data2 = [];
    //type1 and type2 will be past into navigation bar
    var type1 = "";
    var type2 = "";
    
    // this elements array will be rendered on the graph instance
    var elements = [];
    // try to show some elements if the album exists
    if(album){
      // preparing data for corresponding perspectives
      switch(perspective){
        // data for musician's perspective
        case 'musician': 
          elements = getMusicianPerspective(musicianName);
          data1 = musicianService.getAlbumsNamesOfMusician(musicianName);
          data2 = musicianService.getInstrumentsNamesOfMusician(musicianName);
          type1 = "album";
          type2 = "instrument";
          break;
        // data for instrument's perspective
        case 'instrument':
          elements = getInstrumentPerspective(instrumentName);
          data1 = instrumentService
            .getMusiciansOfInstrument(instrumentName)
            .map(elem => elem.id);
          data2 = [];
          type1 = "musician";
          type2 = "";
          break;
        // data for track's perspective
        case 'track':
          break;
        // data for special case perspective where are dependencies 
        // e.g. between two musicians
        case 'special': 
          elements = this.specialCaseFunction(this.data);
          break;
        // data for albums perspective is showed by defaul 
        default: 
          var musicians = albumService.getMusiciansOfAlbum(album);
          var tracks = trackService.getAllTracksOfAlbum(album.id);

          elements = getAlbumPerspective(tracks, musicians, album);
          data1 = musicians
            .map(elem => elem ? elem.id : null)
            .filter(e => e && e !==null);
          data2 = tracks
            .map(elem => elem ? elem.id : null)
            .filter(e => e && e !==null);
            
          type1 = "musician";
          type2 = "track";

          break;
      }
    }
 
    return (
      <div className="full-height">
        <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
          {/* search bar container */}
          <div>
            <SearchBar 
              button={false}
              name={album[0]} 
              onNavbarButtonPress={this.collapseNavbar}
              switchToSearch={this.switchToSearch}/>
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
            <Timeline 
              highlighted={album.id} 
              switchToAlbum={this.switchToAlbum} 
              style={{marginTop: -20, height: 200, top: 20, marginBottom: 100,}}/>

            <div className="data-box-size">
              {perspective !== 'track' ? 
                <AlbumGraph 
                  type={perspective}
                  switchToAlbum={this.switchToAlbum}
                  hideMusicianDisplay={this.hideMusicianDisplay}
                  showMusicianDisplay={this.showMusicianDisplay}
                  showTrackDisplay={this.showTrackDisplay}
                  showInstrumentDisplay={this.showInstrumentDisplay}
                  hideInstrumentDisplay={this.hideInstrumentDisplay}
                  handleCollection={this.handleCollection}
                  data={elements}/> : 
                <TrackDisplay 
                  album={album}
                  name={trackName}
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

  /**
   * setting all tracks of current album to component state
   * @param album - current album
   */
  getTracksOfAlbum = (album) => {
    return trackService.getAllTracksOfAlbum(album.id);
  }
  /**
   * switching from current album to next album
   * choosen by user  
   * @param {string} albumName  - name of the next album chosen by user
   */
  switchToAlbum = (albumName) => {
    this.props.history.push(`/album?n=${albumName}`);
    this.setCurrentAlbum(albumName);
  }

  /**
   * switching from album screen to next search screen
   * @param {string} query - query
   */
  switchToSearch = (query) => {
    this.props.history.push(`/search?q=${query}`);
  }
  /**
   * setting album by name to current webpage state
   * @param {string} albumName - name of the album
   */
  setCurrentAlbum = (albumName) => {
    var album = albumService.getByName(albumName);

    this.setState({
      album: album,
      trackName: '',
      musicianName: '',
      instrumentName: '',
      perspective: 'album',
    });
  }
  /**
   * hide navbar
   */
  collapseNavbar = () => {
    this.setState({collapseNavbar: !this.state.collapseNavbar});
  }
  /**
   * show track description
   * @param {string} trackName - track which description to show
   */
  showTrackDisplay = (trackName) => {
    this.setState({
      trackName: trackName, 
      perspective: 'track'
    });
  }
  /**
   * show instrument display
   * @param {string} trackName - track which description to show
   */
  showInstrumentDisplay = (name) => {
    this.setState({
      instrumentName: name,
      perspective: 'instrument'
    });
  }

  /**
   * hide instrument display
   */
  hideInstrumentDisplay = () => {
    this.setState({
      instrumentName: '',
      perspective: 'musician'
    });
  }

  /**
   * hide track display
   */
  hideTrackDisplay = () => {
    this.setState({
      trackName: '',
      perspective: 'album'
    });
  }
  /**
   * handle collection of selected nodes different for each 
   * perspective
   * @param {Array} elements - array with selected cytoscape nodes
   */
  handleCollection = (elements) => {
    var {perspective} = this.state;

    switch(perspective){
      // handling selected musicians of the albums perspective
      case 'album': 
        // there are special cases for musicians, albums and instruments perspective
        // and for each of them should be provided one function. 
        this.specialCaseFunction = getCompoundForMusicians;
        // storing returned collection in class variable to 
        // process it by rerender
        this.data = elements;
        this.setState({perspective: 'special'});
        break;
      case 'musician':
        break;
      default: 
        break;
    }
  }

  /**
   * showing musician perspective
   * @param {string} musicianName - album name
   */
  showMusicianDisplay = (musicianName) => {
    this.setState({
      musicianName: musicianName,
      instrumentName: '',
      perspective: 'musician'
    });
  }
  /**
   * hiding musicians display
   */
  hideMusicianDisplay = () => {
    this.setState({
      musicianName: '',
      trackName: '',
      perspective: 'album',
    });
  }
}

export default withRouter(AlbumRoute);
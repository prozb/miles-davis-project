import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import './album-route.css';
import { SearchBar, NavigationBar, Timeline, GraphComponent } from '../../components';
import { albumService, musicianService } from '../../service';

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
    };
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
   * setting all musicians of current album to component state
   * @param album - current album
   */
  setMusiciansOfAlbum = (album) => {
    var musicians = [];
    album[1].musicians.forEach(mus => {
      var musicianObject = musicianService.getMusicinaByName(mus);
      musicians.push(musicianObject);
    });
    this.setState({musicians: musicians});
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
    this.setState({
      album: album,
      name: albumName,
    });

    this.setMusiciansOfAlbum(album);
  }
  /**
   * collapsing navbar
   */
  onNavbarButtonPress = () => {
    this.setState({collapseNavbar: !this.state.collapseNavbar});
  }

  render() {
    const collapseStyle = this.state.collapseNavbar ? {display: 'flex', flex: 1} : {display: 'none'};

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
            <NavigationBar />
          </div>
          {/* end navigation container */}
          
          {/* starting content container */}
          <div className="vertical hide-scrollbar" style={{flex: 7,  overflow: 'scroll'}}>
            {/* <div className="hide-scrollbar" style={{flex: 7,  overflow: 'scroll'}}> */}
              <Timeline highlighted={this.state.name} switchToAlbum={this.switchToAlbum} style={{marginTop: -20, height: 200, top: 20}}/>
            {/* </div> */}

            <div>
              <GraphComponent data={this.state.musicians}/>
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
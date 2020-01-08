import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import './album-route.css';
import { SearchBar, NavigationBar, Timeline } from '../../components';
import { albumService } from '../../service';

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
          <div className="hide-scrollbar" style={{flex: 7,  overflow: 'scroll'}}>
            <Timeline highlighted={this.state.name} switchToAlbum={this.switchToAlbum} style={{marginTop: -20, height: 200, top: 20}}/>
          </div>
            {/* ending content container */}
        </div>
        {/* starting navigation and content container */}
      </div>
    );
  }
}

export default withRouter(AlbumRoute);
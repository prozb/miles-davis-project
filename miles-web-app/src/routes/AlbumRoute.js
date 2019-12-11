import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import TimelineComponent from '../components/TimelineComponent';
import '../App.css';
import '../styles/album-route.css';
import SearchBar from '../components/SearchBar';
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
      collapseNavbar: false,
    };
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    this.setState({name: values.name});
  }

  switchToAlbum = (albumName) => {
    this.setState({name: albumName});
  }

  onNavbarButtonPress = () => {
    this.setState({collapseNavbar: !this.state.collapseNavbar});
  }

  render() {
    const collapseStyle = this.state.collapseNavbar ? {display: 'flex'} : {display: 'none'};
    return (
      <div className="album-container">
        <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
          {/* search bar container */}
          <div>
            <SearchBar name={this.state.name} onNavbarButtonPress={this.onNavbarButtonPress}/>
          </div>
        </div>
        {/* starting navigation and content container */}
        <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
          {/* navigation container */}
          <div style={collapseStyle} className="navigation-container">
            <p>asdasdasdasdasdasdfasjfalks;dfjkasdhk</p>
          </div>
          {/* end navigation container */}
          
          {/* starting content container */}
          <div className="hide-scrollbar" style={{flex: 7,  overflow: 'scroll'}}>
            <TimelineComponent switchToAlbum={this.switchToAlbum} style={{marginTop: -20, height: 200, top: 20}}/>
          </div>
          {/* ending content container */}
        </div>
        {/* starting navigation and content container */}
      </div>
    );
  }
}

export default withRouter(AlbumRoute);
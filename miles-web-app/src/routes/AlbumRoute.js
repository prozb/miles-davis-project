import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import TimelineComponent from '../components/TimelineComponent';
import '../App.css';
import SearchBar from '../components/SearchBar';
import NavigationBar from '../components/NavigationBar';
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
    };
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    if(values.name)
      this.props.showAlbums(values.name);
    this.setState({name: values.name});
  }

  switchToAlbum = (albumName) => {
    this.props.history.push(`/album?name=${albumName}`);
    this.setState({name: albumName});
  }

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
            <TimelineComponent highlighted={this.state.name} switchToAlbum={this.switchToAlbum} style={{marginTop: -20, height: 200, top: 20}}/>
          </div>
            {/* ending content container */}
        </div>
        {/* starting navigation and content container */}
      </div>
    );
  }
}

export default withRouter(AlbumRoute);
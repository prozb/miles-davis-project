import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import TimelineComponent from '../components/TimelineComponent';
import '../App.css';
import SearchBar from '../components/SearchBar';
import NavigationBar from '../components/NavigationBar';
import Triangle from '../components/Triangle';
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
    this.setState({name: values.name});
  }

  switchToAlbum = (albumName) => {
    this.setState({name: albumName});
  }

  onNavbarButtonPress = () => {
    this.setState({collapseNavbar: !this.state.collapseNavbar});
  }

  render() {
    const collapseStyle = this.state.collapseNavbar ? {display: 'flex', flex: 1} : {display: 'none'};
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
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <div className="triangle-container" style={{alignSelf: 'center', paddingLeft: 10}}><Triangle left/></div>
              <TimelineComponent switchToAlbum={this.switchToAlbum} style={{marginTop: -20, height: 200, top: 20}}/>
              <div className="triangle-container" style={{alignSelf: 'center', paddingRight: 10}}><Triangle right/></div>
            </div>
            
            <div className="full-height album-content">content section</div>
          </div>
          {/* ending content container */}
        </div>
        {/* starting navigation and content container */}
      </div>
    );
  }
}

export default withRouter(AlbumRoute);
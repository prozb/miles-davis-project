import React, { Component } from 'react';
import '../album-route/album-route.css';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { SearchBar } from '../../components';
import CustomizedMenus from './menu/menu';

class SearchRoute extends Component {
  constructor(props){
    super(props);
  }
  /**
   * switching from album screen to next search screen
   * @param {string} query - query
   */
  switchToSearch = (query) => {
    this.props.history.push(`/search?q=${query}`);
  }

  render() {
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

        <div className="container ">
          <CustomizedMenus data={[
              {name: 'Albums', count: 1}, {name: 'Musicians', count: 0},
              {name: 'Instruments', count: 20}, {name: 'Tracks', count: 5}
            ]}/>
        </div>
        {/* starting navigation and content container */}
      </div>
    );
  }
}

export default withRouter(SearchRoute);
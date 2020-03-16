import React, { Component } from 'react';
import './navigation.css';
import NavigationSection from './nav-section/nav-section';

export default class NavigationBar extends Component {
  /**
   * handle click on menu item of different types
   */
  handleOnSectionClick = (name, type) => {
    switch(type){
      case "track": 
        this.props.showTrackDisplay(name);
        break;
      case "album": 
        this.props.showAlbumsDisplay(name);
        break;
      case "musician": 
        this.props.showMusicianDisplay(name);
        break;
      case "instrument": 
        this.props.showInstrumentDisplay(name);
        break;
      default: 
        break;
    }
  }

  render() {
    const { type1, type2, data1, data2 } = this.props;
    return (
      <div className="navigation-container">
        <NavigationSection 
          data={data1} 
          type={type1}
          handleOnSectionClick={this.handleOnSectionClick}/>
        
        {type2 !== '' ? 
          (
            <NavigationSection 
              data={data2} 
              type={type2}
              handleOnSectionClick={this.handleOnSectionClick}/>
          ) : null}
      
      </div>
    );
  }
}

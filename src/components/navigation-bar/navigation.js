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
    const { collapseClass, type1, type2, data1, data2, className } = this.props;
    {/* <div className="navigation-container"> */}
    if(!collapseClass) return null;
    return (
        <div className={`${className} navigation-container mh-100 no-scrollbar`}>
          <NavigationSection 
            className="my-2"
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

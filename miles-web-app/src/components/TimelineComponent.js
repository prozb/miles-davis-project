import React, { Component } from 'react';
import TimelineItem from './TimelineItem';
import '../styles/timeline.css';
import {getDistanceBetweenAlbums, getIdFromName, getReleasedYearFromDate} from '../scripts/helpers';
import albums from '../data/album-info.json';
import Triangle from './Triangle';

/**
 * component for displaying all albums
 * @author Pavlo Rozbytskyi
 */
export default class TimelineComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeline: []
    };
  }

  componentDidMount () {
    this.setState({timeline: this.getAllAlbumComponents()});
  }
  
  getAllAlbumComponents = () => {
    var timeline = [];

    for(var i = 0; i < Object.entries(albums).length; i++){
      if(i + 1 <  Object.entries(albums).length){
        // getting actual album data
        var album1 = Object.entries(albums)[i];
        var album2 = Object.entries(albums)[i + 1];
        
        timeline.push(
          <TimelineItem 
            showTooltip={this.props.showTooltip}
            switchToAlbum={this.props.switchToAlbum}
            style={i === 0 ? {paddingLeft: 50,} : {}}
            itemId={getIdFromName(album1[0])}
            name={album1[0]} 
            icon={album1[1].icon} 
            date={album1[1].released}/>
        );
        timeline.push(
            <div className="line-container">
              <svg width={getDistanceBetweenAlbums(album1, album2)} height='14px'>
                <line x1="0" y1="0" x2={getDistanceBetweenAlbums(album1, album2)} y2="0" style={{stroke: 'green', strokeWidth: '30'}}/>
              </svg>
            </div>
        );
      }else{
        var album1 = Object.entries(albums)[i];

        // last element
        timeline.push(
          <TimelineItem 
            showTooltip={this.props.showTooltip}
            switchToAlbum={this.props.switchToAlbum}
            style={{paddingRight: 50,}}
            itemId={getIdFromName(album1[0])}
            name={album1[0]} 
            icon={album1[1].icon} 
            date={getReleasedYearFromDate(album1[1].released)}/>
        );
      }
    }

    return timeline;
  }

  render() {
    const {style} = this.props;
    return (
      <div className="timeline-container" style={style}>
				{this.state.timeline}
      </div>
    );
  }
}

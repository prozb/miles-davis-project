import React, { Component } from 'react';
import TimelineItem from './timeline-item/timeline-item';
import './timeline.css';
import { getDistanceBetweenAlbums } from '../../scripts/helpers';
import { albumService } from '../../service';
import Triangle from './triangle/triangle';
import {albumWidthTimeline} from '../../scripts/constants';

/**
 * component for displaying all albums
 * @author Pavlo Rozbytskyi
 * @version added getting data from parent 
 */
export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeline: [],
      highlithed: '',
    };
    this.timelineRef = React.createRef();
    // storing positions of albums in pixels
    this.positions = {};
  }
  
  render() {
    const {style, className, move, moveEnd, highlighted} = this.props;
    // move timeline if need
    if(move){
      this.moveTimelineItems();
      // on the first render the ref.current ist null and 
      // you have to rerender component
      if(this.timelineRef.current !== null){
        moveEnd();
      }else{
        this.forceUpdate();
      }
    }

    return (
      <div className={className} style={{display: 'flex', flexDirection: 'row',  width: '100%',  height: 200}}>
        <div className="triangle-container" style={{alignSelf: 'center',}}> 
          <Triangle onClick={this._handleLeftClick} left={true}/> 
        </div>

          <div ref={this.timelineRef} 
            className="timeline-container" style={style}>
            {this.getAllAlbumComponents()}
          </div>
        
          <div className="triangle-container" style={{alignSelf: 'center', paddingRight: 5}}>
            <Triangle onClick={this._handleRightClick} right={true}/>
          </div>
        </div>
    );
  }
  /**
   * moving the timeline if need
   */
  moveTimelineItems = () => {
    const {highlighted} = this.props; 
    // move timeline if ref initialized and album is not on the screen
    if(this.timelineRef && this.timelineRef.current && 
      !this.isAlbumOnScreen(highlighted)){
        // position of the album
        var albumPos = this.positions[highlighted];
        var visibleLen = this.timelineRef.current.clientWidth; 
        //move
        if(this.isAlbumRight(highlighted)){
          var rightPos = this.timelineRef.current.scrollLeft + visibleLen;
          var diff     = (albumPos - rightPos) + (visibleLen / 6);
          //moving right
          this.timelineRef.current.scrollLeft += diff;
        }else{
          var leftPos = this.timelineRef.current.scrollLeft;
          var diff    = (leftPos - albumPos) + (visibleLen / 6); 
          //moving left
          this.timelineRef.current.scrollLeft -= diff;
        }
    }
  }
  /**
   * checking the album is hidden right on the timeline
   */
  isAlbumRight = (name) => {
    var albumPos   = this.positions[name];
    var leftPos    = this.timelineRef.current.scrollLeft;
    var visibleLen = this.timelineRef.current.clientWidth; 

    return albumPos > (visibleLen + leftPos);
  }
  /**
   * checking the album is displayed
   */
  isAlbumOnScreen = (name) => {
    var albumPos   = this.positions[name];
    var leftPos    = this.timelineRef.current.scrollLeft;
    var visibleLen = this.timelineRef.current.clientWidth; 
    
    if(leftPos <= albumPos && (leftPos + visibleLen) >= albumPos){
      return true;
    }
    return false;
  }
  /**
   * getting converting all albums to timeline
   */
  getAllAlbumComponents = () => {
    const {data, highlighted, switchToAlbum, showTooltip} = this.props; 
    // storing timeline in this array
    var timeline = [];
    // needed for react keys
    var keyCounter = 0;
    // current position
    var position = 0;
    for(var i = 0; i < data.length; i++){
      if(i + 1 <  data.length){
        // getting actual album data
        var album1 = data[i];
        var album2 = data[i + 1];

        // adding position to positions array
        this.positions[album1.id] = position;
        // adding album to timeline
        timeline.push(
          <TimelineItem 
            highlighted={highlighted}
            showTooltip={showTooltip}
            switchToAlbum={switchToAlbum}
            style={i === 0 ? {paddingLeft: 50,} : {}}
            itemId={i}
            key={keyCounter++}
            name={album1.id} 
            icon={album1.icon} 
            date={album1.released}/>
        );
        // adding width of the album to current position to get position of the 
        // line start and than add distance to next album
        var distance = getDistanceBetweenAlbums(album1, album2);
        position += (distance + albumWidthTimeline); // so we get position of the next album
        this.positions[album2.id] = position; 
        //line between two components
        timeline.push(
          <div key={keyCounter++} className="line-container">
            <svg width={distance} height='15px'>
              <line stroke="#3B6295" strokeWidth="20" 
              x1="0" y1="0" x2={distance} y2="0"/>  
            </svg>
          </div>
        );
      }else{
        var album3 = data[i];
        //add position of the last element to the positions object
        this.positions[album3.id] = position;
        // last element
        timeline.push(
          <TimelineItem 
            highlighted={highlighted}
            showTooltip={showTooltip}
            switchToAlbum={switchToAlbum}
            style={{paddingRight: 50,}}
            itemId={i}
            key={keyCounter++}
            name={album3.id} 
            icon={album3.icon} 
            date={album3.released}/>
        );
      }
    }
    return timeline;
  }
  /**
   * moving timeline to left after pressing on left triangle
   */
  _handleLeftClick = (event) => {
      this.timelineRef.current.scrollLeft -= 600;
  }
  /**
   * moving timeline to right after pressing on right triangle
   */
  _handleRightClick = (event) => {
    this.timelineRef.current.scrollLeft += 600;
  }
}

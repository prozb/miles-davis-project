import React, { Component } from 'react';
import TimelineItem from './TimelineItem';
import '../styles/timeline.css';
import {getDistanceBetweenAlbums, getIdFromName} from '../scripts/helpers';
import albums from '../data/album-info.json';
import Triangle from '../components/Triangle';

/**
 * component for displaying all albums
 * @author Pavlo Rozbytskyi
 */
export default class TimelineComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeline: [],
      highlithed: '', 
    };
    this.timelineRef = React.createRef();
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
            itemId={`${getIdFromName(album1[0])}${i}`}
            name={album1[0]} 
            icon={album1[1].icon} 
            date={album1[1].released}/>
        );
        timeline.push(
            <div key={`line_${i}`} className="line-container">
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
            itemId={`${getIdFromName(album1[0])}${i}`}
            name={album1[0]} 
            icon={album1[1].icon} 
            date={album1[1].released}/>
        );
      }
    }

    return timeline;
  }

  _handleLeftClick = (event) => {
      this.timelineRef.current.scrollLeft -= 600;
  }

  _handleRightClick = (event) => {
    this.timelineRef.current.scrollLeft += 600;
}
  render() {
    const {style} = this.props;

    return (
      <div style={{display: 'flex', flexDirection: 'row',  width: '95%',  height: 200}}>
        <div className="triangle-container" style={{alignSelf: 'center',}}> 
          <Triangle onClick={this._handleLeftClick} left={true}/> 
        </div>

          <div ref={this.timelineRef} className="timeline-container" style={style}>
            {this.state.timeline}
          </div>
        
          <div className="triangle-container" style={{alignSelf: 'center', paddingRight: 10}}>
            <Triangle onClick={this._handleRightClick} right={true}/>
          </div>
        </div>
    );
  }
}

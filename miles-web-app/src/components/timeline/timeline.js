import React, { Component } from 'react';
import TimelineItem from './timeline-item/timeline-item';
import './timeline.css';
import { getDistanceBetweenAlbums } from '../../scripts/helpers';
import { albumService } from '../../service';
import { Triangle } from '..';

/**
 * component for displaying all albums
 * @author Pavlo Rozbytskyi
 */
export default class Timeline extends Component {
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
    var albums = albumService.getAll();
    for(var i = 0; i < albums.length; i++){
      if(i + 1 <  albums.length){
        // getting actual album data
        var album1 = albums[i];
        var album2 = albums[i + 1];

        timeline.push(
          <TimelineItem 
            highlighted={this.props.highlighted}
            showTooltip={this.props.showTooltip}
            switchToAlbum={this.props.switchToAlbum}
            style={i === 0 ? {paddingLeft: 50,} : {}}
            itemId={i}
            key={i}
            name={album1[0]} 
            icon={album1[1].icon} 
            date={album1[1].released}/>
        );
        timeline.push(
          <div key={`line_${i}`} className="line-container">
            <svg width={getDistanceBetweenAlbums(album1, album2)} height='15px'>
              <line x1="0" y1="0" x2={getDistanceBetweenAlbums(album1, album2)} y2="0" style={{stroke: '#3B6295', strokeWidth: '20'}}/>  
            </svg>
          </div>
        );
      }else{
        var album3 = albums[i];

        // last element
        timeline.push(
          <TimelineItem 
            highlighted={this.props.highlighted}
            showTooltip={this.props.showTooltip}
            switchToAlbum={this.props.switchToAlbum}
            style={{paddingRight: 50,}}
            itemId={i}
            key={i}
            name={album3[0]} 
            icon={album3[1].icon} 
            date={album3[1].released}/>
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
    const {style, className} = this.props;
    return (
      <div className={className} style={{display: 'flex', flexDirection: 'row',  width: '100%',  height: 200}}>
        <div className="triangle-container" style={{alignSelf: 'center',}}> 
          <Triangle onClick={this._handleLeftClick} left={true}/> 
        </div>

          <div ref={this.timelineRef} className="timeline-container" style={style}>
            {this.getAllAlbumComponents()}
          </div>
        
          <div className="triangle-container" style={{alignSelf: 'center', paddingRight: 5}}>
            <Triangle onClick={this._handleRightClick} right={true}/>
          </div>
        </div>
    );
  }
}

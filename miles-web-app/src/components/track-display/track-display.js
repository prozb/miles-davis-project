import './track-display.css';
import React, { Component } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {trackService} from '../../service';
/**
 * @author Pavlo Rozbytskyi
 * component for representation of all musicians played on current traсk
 * and which instrument played this musician on this track
 */
export default class TrackDisplay extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    const { name, album } = this.props;
    const elements = trackService.getMusicianInstrumentRelationOnTrack(name, album[0]);
    console.log(elements);
    return(
      <div className="track-display-container">
        <VerticalTimeline
        layout={"1-column"}>
          <VerticalTimelineElement
            contentStyle={{backgroundColor: '#ECD6A8'}}
            contentArrowStyle={{borderRight: '15px solid #ECD6A8'}}
            iconOnClick={this.props.hideTrackDisplay}
            className="vertical-timeline-element--education"
            date={this.props.album[1].released}
            iconStyle={{backgroundColor: '#E1AC3C'}}
            >
            <h3 className="vertical-timeline-element-title">{this.props.name}</h3>
            {/* <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4> */}
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas natus, porro dolorum vero sed quia doloremque eligendi. Odit vero vel at hic, quasi reiciendis voluptatem omnis aut asperiores quaerat? Consectetur!
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    )
  }
}

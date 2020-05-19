import './track-display.css';
import React, { Component } from 'react';
import 'react-vertical-timeline-component/style.min.css';
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {MusicianTooltip, InstrumentTooltip} from './tooltip';
/**
 * @author Pavlo Rozbytskyi
 * component for representation of all musicians played on current traсk
 * and which instrument played this musician on this track
 */
export default class TrackDisplay extends Component {
  constructor (props){
    super(props);

    this.musicians = [];
    this.instruments = [];
  }
  render() {
    const { name, album, className, data, hideTrackDisplay, instruments,
    musicians, style, show } = this.props;
    
    if(!show) return null;

    return(
      <div className={className} style={style}>
        <div className="w-100 row justify-content-end pt-3 br-5">
          <FontAwesomeIcon icon={faTimes} onClick={hideTrackDisplay}/>
        </div>
      
        <div className="w-100 row px-5 overflow-auto">
          <div className="w-100 row">
            <div className="col">
              <h2>{name}</h2>
              <h5 className="text-secondary">On "{album.id}" album</h5>
            </div>
            <div className="row w-100">
              <p className="text-secondary pl-5">
                {musicians} musicians
              </p>
              <p className="text-secondary ml-auto">
                {instruments} instruments
              </p>
            </div>
          </div>

          <div className="col pl-5">
            {data}
          </div>
        </div>
      </div>
    )
  }

  /**
   * getting tooltip of musician or instrument
   * @param {Object} node - musician or instrument object
   * @param {String} type - type of node: musician or instrument
   */
  getTooltip = (node, type) => {
    switch(type){
      case "musician":
        // displaing tooltip for the musician
        return <MusicianTooltip musician={node}/>;
      case "instrument":
        return <InstrumentTooltip instrument={node}/>;
      default: 
        return null;
    }
  }
}

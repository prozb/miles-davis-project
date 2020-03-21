import './track-display.css';
import React, { Component } from 'react';
import 'react-vertical-timeline-component/style.min.css';
import Avatar from 'react-avatar';
import { musicianService, instrumentService } from '../../service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
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
    const { name, album, className, data, hideTrackDisplay } = this.props;

    return(
      <div className={className}>
        <div className="w-100 row justify-content-end pt-3 br-5">
          <FontAwesomeIcon icon={faTimes} onClick={hideTrackDisplay}/>
        </div>
      
        <div className="w-100 row px-5">
          <div className="w-100 row">
            <div className="col">
              <h2>{name}</h2>
              <h5 className="text-secondary">On "{album.id}" album</h5>
            </div>
            <div className="row w-100">
              <p className="text-secondary pl-5">
                {this.musicians.length} musicians
              </p>
              <p className="text-secondary ml-auto">
                {this.instruments.length} instruments
              </p>
            </div>
          </div>

          <div className="col pl-5">
            {this.getContent()}
          </div>
        </div>
      </div>
    )
  }
  
  componentWillMount() {
    const { data } = this.props;
    const musNotFilter = data.map(relation => Object.keys(relation)[0]);
    const instNotFilter = data.map(relation => Object.values(relation)[0]);
    
    this.musicians = [...new Set(musNotFilter)];
    this.instruments = [...new Set(instNotFilter)];
  }
  /**
   * getting content
   */
  getContent = () => {
    const { data } = this.props;
    const content = data.map((relation, index) => {
      let musicianName   = Object.keys(relation)[0];
      let instrumentName = relation[musicianName];
      // getting objects by names
      let musician   = musicianService.getByName(musicianName);
      let instrument = instrumentService.getByName(instrumentName); 
      
      let musicianAvatar = <Avatar className="box-shadow my-auto" 
        round={true} src={musician.icon} size={100} name={musician.id}/>;
      let instrumentAvatar = <Avatar className="box-avatar my-auto" 
        src={instrument.url} round={true} size={70} name={instrument.id}/>;

      return (
        <div className="row my-3" key={index}>
          <div className="row w-75">
            {musicianAvatar}
            <h6 className="my-auto ml-4">{musician.id}</h6>
          </div>
          <div className="row w-25 justify-content-end">
            {instrumentAvatar}
          </div>
        </div>
      )
    });
    return content; 
  }
}

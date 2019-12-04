import React, { Component } from 'react';
import '../styles/timeline-item.css';
import { Tooltip } from 'reactstrap';

export default class TimelineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
        mouseEntered: false,
    };
  }
  
  digIntoAlbum = () => {
    alert('dig into the album')
  }

  render() {
    const { icon, name, date, itemId } = this.props;
    const itemClass = this.state.mouseEntered ? "item-container-hovered" : "item-container"
    return (
      <div className="vertical-timeline">
        {/* album container start */}
        <div id={itemId}
            onClick={this.digIntoAlbum}
            onMouseEnter={() => this.setState({mouseEntered: !this.state.mouseEntered})} 
            onMouseLeave={() => this.setState({mouseEntered: !this.state.mouseEntered})}
            className={itemClass}
            style={{backgroundImage: `url(${icon})`}}>
          {/* start information about each album */}
          <Tooltip style={{borderRadius: 10}} placement="top" isOpen={this.state.mouseEntered} target={itemId}>
            <div className="information-container">
              <img src={icon} alt="album" width={150}/>
              <p style={{paddingTop: 10}}>{name}</p>
            </div>
          </Tooltip>
          {/* end information about each album */}
        </div>
        {/* album container start */}

        {/* date start */}
        <div>
          <p className="lead">{date}</p>
        </div>
        {/* date end */}
      </div>
    );
  }
}

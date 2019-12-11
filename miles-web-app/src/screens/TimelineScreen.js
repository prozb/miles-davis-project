import React, { Component } from 'react';
import TimelineComponent from '../components/TimelineComponent';
import InfoDisplay from '../components/InfoDisplay';
import '../App.css';


export default class TimelineScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  
  render() {
    return (
      <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
          {/* starting info display component */}
          <div style={{display: 'flex', flex: 1, alignItems: 'flex-start'}}>
            <InfoDisplay/>
          </div>
          {/* ending info display component */}

          {/* starting timeline component */}
          <div style={{display: 'flex', alignItems: 'flex-end', flex: 3,}}>
              <TimelineComponent showTooltip switchToAlbum={this.props.switchToAlbum} style={{marginBottom: 20,}}/>
          </div>
          {/* ending timeline component */}
      </div>
    );
  }
}

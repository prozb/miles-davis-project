import React, { Component } from 'react';
import '../App.css';
import StartButton from '../components/StartButton';
import AlbumScreen from '../screens/AlbumScreen';
import StartScreen from '../screens/StartScreen';
import TimelineScreen from '../screens/TimelineScreen';
import {Link} from "react-router-dom";

export default class HomeRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
			simulationStarted: true,
			timelineScreen: true,
			albumScreen: false,
			albumName: '',
			hideComponent: false,
    };
	}
	
	/**
   * starting simulation
   */
  startSimulation = () => {
    this.setState({
      simulationStarted: !this.state.simulationStarted,
      timelineScreen: true,
      albumName: ''
    });
	}
	
	/**
   * switching from timeline to album
   * @param {string} album name
   */
  switchToAlbum = (name) => {
    this.setState({
      albumScreen: true,
      timelineScreen: false,
      albumName: name,
    });
  }

  /**
   * switching back from album to timeline
   */
  switchToTimeline = () => {
    this.setState({
      albumScreen: false,
      timelineScreen: true,
      albumName: '',
    })
  }

  getСurrentScreen = () => {
    if(this.state.simulationStarted && this.state.timelineScreen)
      return <TimelineScreen switchToAlbum={this.switchToAlbum}/>
    
    if(this.state.simulationStarted && this.state.albumScreen)
      return <AlbumScreen switchToTimeline={this.switchToTimeline} name={this.state.albumName}/>
    
    return <StartScreen/>
  }

  render() {
    return (
       <div className="vertical-container">
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
          <button className="btn btn-success" onClick={this.goFull}>go full</button>
        </div>
        
        {/* start application container */}
        <div className="app-container">
          {/* application screens */}
          {this.getСurrentScreen()}
        </div>
        {/* end application container */}

        {/* button container start */}
        <div className="horizontal-container start-button-container">
          <StartButton started={this.state.simulationStarted} 
            startSimulation={this.startSimulation}/>
        </div>
        {/* button container end */}
      </div>
    );
  }
}


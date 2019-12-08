import React from 'react';
import './App.css';
import StartButton from './components/StartButton';
import TimelineComponent from './components/TimelineComponent';
import AlbumScreen from './screens/AlbumScreen';
import StartScreen from './screens/StartScreen';
import TimelineScreen from './screens/TimelineScreen';

/**
 * @author Pavlo Rozbytskyi
 */
class App extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      simulationStarted: true,
      timelineScreen: true,
      albumScreen: false,
    }
  }
  /**
   * starting simulation
   */
  startSimulation = () => {
    this.setState({
      simulationStarted: !this.state.simulationStarted,
      timelineScreen: true,
    });
  }


  getСurrentScreen = () => {
    if(this.state.simulationStarted && this.state.timelineScreen)
      return <TimelineScreen/>
    
    if(this.state.simulationStarted && this.state.albumScreen)
      return <AlbumScreen/>
    
    return <StartScreen/>
  }
  render () {
    const appContainerClass = this.state.isFull ? 
    "app-container app-container-full" : "app-container";
    return (
      <div className="vertical-container">
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
          <button className="btn btn-success" onClick={this.goFull}>go full</button>
        </div>
        
        {/* start application container */}
        <div className={appContainerClass}>
          {/* application screens */}
          {this.getСurrentScreen()}
        </div>
        {/* end application container */}

        {/* button container start */}
        <div className="horizontal-container start-button-container">
          <StartButton started={this.state.simulationStarted} startSimulation={this.startSimulation}/>
        </div>
        {/* button container end */}
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.css';
import StartButton from './components/StartButton';
import InfoDisplay from './components/InfoDisplay';
import Timeline from './components/Timeline';
import Fullscreen from "react-full-screen";

const item = {
  "Young Man with a Horn": {
    "id": "Young_Man_with_a_Horn",
    "label": "Blue Note",
    "released": "1952",
    "recorded": [
        "May 9, 1952"
    ],
    "icon": "https://upload.wikimedia.org/wikipedia/en/f/f8/Miles_Davis_Young_Man_With_a_Horn.jpg"
  },
}

const item1 = { 
"Blue Period": {
    "id": "Blue_Period",
    "label": "Prestige",
    "released": "1953",
    "icon": "https://upload.wikimedia.org/wikipedia/en/2/2f/Blue_Period_%28Miles_Davis_album_-_cover_art%29.jpg"
},
}
/**
 * @author Pavlo Rozbytskyi
 */
class App extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      simulationStarted: true,
      isFull: false,
    }
  }
  /**
   * starting simulation
   */
  startSimulation = () => {
    this.setState({simulationStarted: !this.state.simulationStarted});
  }

  goFull = () => {
    this.setState({ isFull: false });
  }

  render () {
    const appContainerClass = this.state.isFull ? 
    "app-container app-container-full" : "app-container";
    return (
      <div className="vertical-container">
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
          <button className="btn btn-success" onClick={this.goFull}>go full</button>
        </div>
        
        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({isFull})}
        >
        {/* start application container */}
        <div className={appContainerClass}>
          <div style={{flex: 8}}></div>
          {this.state.simulationStarted && <InfoDisplay/>}
          <div className="timeline-container">
            <Timeline/>
          </div>
        </div>
        {/* start application  */}

        {/* button container start */}
        <div className="horizontal-container start-button-container">
          <StartButton started={this.state.simulationStarted} startSimulation={this.startSimulation}/>
        </div>
        {/* button container end */}
        </Fullscreen>
      </div>
    );
  }
}

export default App;

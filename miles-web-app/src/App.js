import React from 'react';
import './App.css';
import StartButton from './components/StartButton';
import InfoDisplay from './components/InfoDisplay';
import Timeline from './components/Timeline';
import Fullscreen from "react-full-screen";

/**
 * @author Pavlo Rozbytskyi
 */
class App extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      simulationStarted: false,
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
    this.setState({ isFull: true });
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

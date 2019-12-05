import React from 'react';
import './App.css';
import StartButton from './components/StartButton';
import InfoDisplay from './components/InfoDisplay';
import Timeline from './components/Timeline';

/**
 * @author Pavlo Rozbytskyi
 */
class App extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      simulationStarted: true
    }
  }
  /**
   * starting simulation
   */
  startSimulation = () => {
    this.setState({simulationStarted: !this.state.simulationStarted});
  }

  render () {
    return (
      <div className="vertical-container">
        {/* start application container */}
        <div className="app-container">
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
      </div>
    );
  }
}

export default App;

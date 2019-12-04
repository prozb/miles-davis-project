import React from 'react';
import './App.css';
import StartButton from './components/StartButton';
import InfoDisplay from './components/InfoDisplay';
import Timeline from 'react-visjs-timeline';

const options = {
  width: '100%',
  height: '100px',
  stack: true,
  showMajorLabels: true,
  showCurrentTime: true,
  zoomMin: 1000000,
  type: 'background',
  format: {
    minorLabels: {
      minute: 'h:mma',
      hour: 'ha'
    }
  }
}

const items = [{
  start: new Date(2010, 7, 15),
  end: new Date(2010, 8, 2),  // end is optional
}]
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
          {this.state.simulationStarted && <InfoDisplay/>}
          <div className="timeline-container">
            <Timeline options={options} items={items}/>
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

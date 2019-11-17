import React, {Component} from 'react';
import './App.css';
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import About from './screens/About';
import Contact from './screens/Contact';
import NoMatch from './screens/NoMatch';
import Exploration from './screens/Exploration';
import NavigationBar from './components/NavigationBar';

// Photo by Chris Bair on Unsplash
class App extends Component{
  render(){
    return (
      <React.Fragment>
        <NavigationBar/>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/exploration" component={Exploration}/>
            <Route component={NoMatch}/>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}



export default App;

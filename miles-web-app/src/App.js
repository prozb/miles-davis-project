import React from 'react';
import './App.css';
import { AlbumRoute, HomeRoute } from './routes';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

/**
 * @author Pavlo Rozbytskyi
 * This is first screen of the application. Default page is homepage
 * and from the homepage you can visit albums page.   
 */
class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      showHome: true,
      showAlbums: false,
    }
  } 

  showAlbums = (name) => {
    this.setState({
      showHome: false,
      showAlbums: true,
    });
  }

  render () {
    return (
      // router to switch between main pages
      <Router>
        <Route path='/' render={() => <HomeRoute
           active={this.state.showHome} 
           showAlbums={this.showAlbums}/>
        }/>
        <Route path='/album' render={() => <AlbumRoute 
          active={this.state.showAlbums} 
          showAlbums={this.showAlbums}/>
        }/>
      </Router>
    );
  }
}

export default App;

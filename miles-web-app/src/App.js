import React from 'react';
import './App.css';
import { AlbumRoute, HomeRoute, SearchRoute } from './routes';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

/**
 * @author Pavlo Rozbytskyi
 * This is main component of the application. 
 *   
 * There are three main routes in this application: 
 * 1. HomeRoute, 2. AlbumsRoute, 3. SearchRoute
 * Switching between routes is possible with React Router
 */
class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      //state variables needed to figure out active route
      showHome: true,
      showAlbums: false,
      showSearch: false,
    }
  } 

  render () {
    return (
      // react router with three main routes
      <Router>
        <Route path='/' render={() => <HomeRoute
           //if component is not active, it won't be rendered
           active={this.state.showHome} 
           showHome={this.showHome}
           showAlbums={this.showAlbums}/>
        }/>
        <Route path='/album' render={() => <AlbumRoute 
          active={this.state.showAlbums} 
          showAlbums={this.showAlbums}
          showSearchScreen={this.showSearchScreen}/>
        }/>
        <Route path='/search' render={() => <SearchRoute 
          active={this.state.showSearch} 
          showSearchScreen={this.showSearchScreen}/>
        }/>
      </Router>
    );
  }
  // hiding all screens except albums screen
  showAlbums = () => {
    this.setState({
      showHome: false,
      showAlbums: true,
      showSearch: false,
    });
  }
  // hiding all screens except home screen
  showHome = () => {
    this.setState({
      showHome: true,
      showAlbums: false,
      showSearch: false,
    });
  }
  // hiding all screens except search screen
  showSearchScreen = () => {
    this.setState({
      showHome: false,
      showAlbums: false,
      showSearch: true,
    });
  }
}

export default App;

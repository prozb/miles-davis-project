import React from 'react';
import './App.css';
import HomeRoute from './routes/HomeRoute';
import AlbumRoute from './routes/AlbumRoute';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

/**
 * @author Pavlo Rozbytskyi
 */
class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      showHome: true,
      showAlbums: false,
      albumName: ''
    }
  } 

  showAlbums = (name) => {
    this.setState({
      showHome: false,
      showAlbums: true,
      albumName: 'name',
    });
  }

  render () {
    return (
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

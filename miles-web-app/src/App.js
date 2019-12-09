import React from 'react';
import './App.css';
import HomeRoute from './routes/HomeRoute';
import AlbumRoute from './routes/AlbumRoute';
import Button from '@material-ui/core/Button';

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
      showAlbums: false
    }
  } 

  showAlbums = () => {
    this.setState({
      showAlbums: true,
      showHome: false,
    });
  }

  render () {
    return (
      <Router>
        <Route path='/' render={() => <HomeRoute showAlbums={this.showAlbums}/>}/>
        <Route path='/album' render={() => <AlbumRoute/>}/>
      </Router>
    );
  }
}

export default App;

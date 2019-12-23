import React, { Component } from 'react';
import '../App.css';
import StartButton from '../components/StartButton';
import AlbumScreen from '../screens/AlbumScreen';
import StartScreen from '../screens/StartScreen';
import TimelineScreen from '../screens/TimelineScreen';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class HomeRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
			simulationStarted: false,
			timelineScreen: false,
			albumScreen: false,
			albumName: '',
			hideComponent: false,
    };
	}
	
	/**
   * starting simulation
   */
  startSimulation = () => {
    this.setState({
      simulationStarted: !this.state.simulationStarted,
      timelineScreen: true,
      albumName: ''
    });
	}
	
	/**
   * switching from timeline to album
   * @param {string} album name
   */
  switchToAlbum = (name) => {
    this.setState({
      albumScreen: true,
      timelineScreen: false,
      albumName: name,
    });
	}

  /**
   * switching back from album to timeline
   */
  switchToTimeline = () => {
    this.setState({
      albumScreen: false,
      timelineScreen: true,
      albumName: '',
    })
  }

  getСurrentScreen = () => {
    if(this.state.simulationStarted && this.state.timelineScreen)
      return <TimelineScreen switchToAlbum={this.switchToAlbum}/>
    
    if(this.state.simulationStarted && this.state.albumScreen)
      return <AlbumScreen switchToTimeline={this.switchToTimeline} name={this.state.albumName}/>
    
    return <StartScreen/>
  }

	getApplicationContainer = () => {
		return <div className="vertical-container">				
				{/* start application container */}
				<div className="app-container">
					{/* application screens */}
					{this.getСurrentScreen()}
				</div>
				{/* end application container */}

				{/* button container start */}
				<div className="horizontal-container start-button-container">
					<StartButton started={this.state.simulationStarted} 
						startSimulation={this.startSimulation}/>
				</div>
				{/* button container end */}
			</div>
	}

	getJumbotron = () => {
		return <div className="jumbotron">
			<h1 className="display-4">Miles Davis Discography</h1>
			<p className="lead">Hey, try to explore complex Miles Davis discography dataset 
				with Neo4j.
			</p>

			<p className="lead jumbo-button">
				<a className="btn btn-primary btn-lg" href="application.html" target="_blank" role="button">Explore dataset &raquo;</a>
			</p>
		</div>
	}

	getNavigationBar = () => {
		return <nav className="navbar navbar-expand-lg navbar-light">
      <a className="navbar-brand" href="#"><img src="./assets/alto-saxophone.gif" alt="alto saxophone" width="40"/></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active" data-toggle="collapse" data-target=".navbar-collapse.show">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item"  data-toggle="collapse" >
              <a className="nav-link" href="#about" data-target=".navbar-collapse.show">About</a>
          </li>
          <li className="nav-item" data-toggle="collapse">
            <a className="nav-link" href="#exploration" data-target=".navbar-collapse.show">Explore</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
	}

	getContent = () => {
		return <div>
			<a name="about"></a>

			<div className="container">
				<div className="row padding">
					<div className="col-lg-6">
						<h2>Project description</h2>
						
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime possimus consectetur sed quibusdam veritatis et iusto quae hic sequi </p>
						<p>ratione corporis perspiciatis quas, ad cupiditate impedit iure odit reiciendis ducimus.ratione corporis perspiciatis quas, ad cupiditate impedit iure odit reiciendis ducimus.</p>
						<br/>
					</div>
					<div className="col-lg-6">
							<img src="assets/davis.png" className="img-fluid "/>
					</div>
				</div>
    	</div>

			<hr className="col-xs-12"></hr>

			<div className="card-holder container">
        <div className="row">
					{/* <!-- neo4j container --> */}
					<div className="col-md-4 custom-card d-flex align-items-stretch">
						<div className="card text-center">
							<img src="assets/miles-davis.png" className="card-img-top" alt="vis js logo"></img>
							<div className="card-body">
								<h5 className="card-title">Discography of Miles Davis</h5>
								<p className="card-text">Miles Davis was an American jazz trumpeter, bandleader, and composer. He is among the most influential and acclaimed figures in the history of jazz and 20th century music.</p>
								<a target="blank" href="https://en.wikipedia.org/wiki/Miles_Davis" className="btn btn-outline-primary">More info&raquo;</a>
							</div>
						</div>
					</div>
					{/* <!-- neo4j container --> */}
					<div className="col-md-4 custom-card d-flex align-items-stretch">
						<div className="card text-center">
							<img src="assets/neo4j.png" className="card-img-top" alt="vis js logo"></img>
							<div className="card-body">
								<h5 className="card-title">Neo4j - the graph database</h5>
								<p className="card-text">Neo4j is a highly scalable native graph database, purpose-built to leverage not only data but also data relationships.
									</p>
								<a target="blank" href="https://neo4j.com/" className="btn btn-outline-primary">More info&raquo;</a>
							</div>
						</div>
					</div>
					{/* <!-- neovis container --> */}
					<div className="col-md-4  custom-card d-flex align-items-stretch">
							<div className="card text-center">
								<img src="assets/vis-js.png" className="card-img-top" alt="vis js logo"></img>
								<div className="card-body">
									<h5 className="card-title">Vis.js visualization</h5>
									<p className="card-text">The library is designed to be easy to use, to handle large amounts of dynamic data, and to enable manipulation of and interaction with the data.</p>
									<a target="blank" href="https://visjs.org/" className="btn btn-outline-primary">More info&raquo;</a>
								</div>
							</div>
						</div>
				</div>
    	</div>
			<hr className="col-xs-12"></hr>
		</div>
	}

	getCredits = () => {
		return <div>
			<div className="container credits">
				<p>
					Photo by Alex Paganelli on Unsplash
				</p>
			</div>
			<hr className="col-xs-12"></hr>
		</div>
	}

	getFooter = () => {
		return <footer className="page-footer font-small my-footer">
			<a name="contact"></a>

      <div className="container text-center text-md-left">
      <p className="lead">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi, est qui distinctio recusandae veritatis soluta aliquid dolorem laboriosam eligendi aspernatur alias libero vel quibusdam quo facilis cumque iusto repudiandae dolor.</p>
      </div>
      
      {/* <!-- Copyright --> */}
      <div className="footer-copyright text-center py-3">© 2019 Copyright:
        <a target="blank" href="https://rozbitski.de"> rozbitski.de</a>
      </div>
    </footer>
	}

	switchToAlbum = (albumName) => {
		this.setState({hideComponent: true});
		this.props.history.push(`/album?name=${albumName}`);
	}

  render() {
		if(!this.props.active)
			return null;
    return (
			<div>
				{this.getNavigationBar()}
				{this.getJumbotron()}
				{this.getContent()}
				{/* <!-- root application container --> */}
    		<div className="container">
					{this.getApplicationContainer()}
    		</div>
				{this.getCredits()}
				{this.getFooter()}
			</div>
    );
  }
}

export default withRouter(HomeRoute);
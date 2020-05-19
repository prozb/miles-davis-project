import React, { Component } from 'react';
import './home-route.css';
import { withRouter } from 'react-router-dom';
import fetchFiles from '../../network/fetchFiles';
import store from '../../store';
import config from '../../assets/config.json';

/**
 * @author Pavlo Rozbytskyi
 * Home component is just html website representing 
 * whole project 
 */
class HomeRoute extends Component {
	constructor(props){
		super(props);

		store.subscribe(() => {
			let loading = store.getState().fileState.loading;
			let files = store.getState().fileState.files;

			if(!loading && files.albums !== 0){
				this.props.history.push(`/album`)
			}
    });
	}

	render() {
    return (
			<div>
				{this.getNavigationBar()}
				{this.getJumbotron()}
				{this.getContent()}
				{/* <!-- root application container --> */}
				{this.getApplicationContainer()}
				{this.getCredits()}
				{this.getFooter()}
			</div>
    );
	}
	// container with image of the application and green button 
	// to step into the application 
	getApplicationContainer = () => {
		return <div className="container">
			<a alt="screenshots section" name="screenshots"/>
				<h3 className="mb-3">{config.homepage_config.screenshots_title}</h3>		

				<div className="row my-5">
					<div className="col-lg-7">
						<img src={require('../../assets/musician-screen.png')} alt="musician screen of the application"/>
					</div>
					<div className="col-lg-5">
						<h4>{config.homepage_config.screenshots_musician}</h4>
						<p className="card-text info-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, fugiat illoe, tenetur nesciunt beatae sunt fuga iure, at dolorum, sed dolore vitae laborum doloremque consequatur. Suscipit ex, quis magni fugit id nobis excepturi tempora sunt omnis eaque corporis numquam velit dicta aperiam at.</p>
					</div>
				</div>
				
				<div className="row my-5">
					<div className="col-lg-4">
						<h4>{config.homepage_config.screenshots_special}</h4>
						<p className="card-text info-text">Lorem ipsum dolor si Illum, fugiat illo. Vel recusandae odio ipsam aspernatur totam cumque, tenetur nesciunt beatae sunt fuga iure, at dolorum, sed dolore vitae laborum doloremque consequatur. Suscipit ex, quis magni fugit id nobis excepturi tempora sunt omnis eaque corporis numquam velit dicta aperiam at.</p>
					</div>
					<div className="col-lg-8">
						<img src={require('../../assets/special-end-screen.png')} alt="spezialansicht screen of the application"/>
					</div>
				</div>

				<div className="row my-5">
					<div className="col-lg-8">
						<img src={require('../../assets/search-end-screen.png')} alt="search screen of the application"/>
					</div>
					<div className="col-lg-4">
						<h4>{config.homepage_config.screenshots_search}</h4>
						<p className="card-text info-text">Lorem ipsum dolor si Illum, fugiat illo. Vel recusandae odio ipsam aspernatur totam cumque, tenetur nesciunt beatae sunt fuga iure, at dolorum, sed dolore vitae laborum doloremque consequatur. Suscipit ex, quis magni fugit id nobis excepturi tempora sunt omnis eaque corporis numquam velit dicta aperiam at.</p>
					</div>
				</div>
			</div>
	}
	// jumbotron
	getJumbotron = () => {
		return <div className="jumbotron">
			<div className="container"> 
				<h1 className="display-4">{config.homepage_config.jumbo_title}</h1>
				<p className="display-5 lead w-90">{config.homepage_config.jumbo_subtitle}</p>

				<p className="lead jumbo-button">
					<button className="btn btn-primary btn-lg" onClick={() => this.handlePress('miles-dataset')}>
						{config.homepage_config.jubmo_button} &raquo;
					</button>
				</p>
			</div>
		</div>
	}
	// navbar of the website
	getNavigationBar = () => {
		return <nav className="navbar navbar-expand-lg navbar-light">
      <a className="navbar-brand" href="/">
				<img src="./assets/alto-saxophone.gif" alt="alto saxophone" width="40"/>
			</a>
      <button className="navbar-toggler" type="button" 
				data-toggle="collapse" data-target="#navbarNav" 
				aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active" data-toggle="collapse" data-target=".navbar-collapse.show">
            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item"  data-toggle="collapse" >
              <a className="nav-link" href="#about" data-target=".navbar-collapse.show">About</a>
          </li>
          <li className="nav-item" data-toggle="collapse">
            <a className="nav-link" href="#discographies_section" data-target=".navbar-collapse.show">Discographies</a>
          </li>
          <li className="nav-item" data-toggle="collapse">
            <a className="nav-link" href="#screenshots" data-target=".navbar-collapse.show">Screenshots</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
	}
	// content of the project description
	getContent = () => {
		return <div>
			<a alt="about section" name="about"/>

			<div className="container">
				<div className="row padding">
					<div className="col-lg-8">
						<h2>{config.homepage_config.project_title}</h2>
						<p className="info-text">{config.homepage_config.project_description}</p>

						<h3>{config.homepage_config.goal_title}</h3>
						<p className="card-text info-text">{config.homepage_config.project_goal}</p>
						<p className="card-text info-text">Jeder ist herzlich eingeladen bei diesem Projekt mitzumachen. Den 
							Code finden Sie auf GitHub unter
							<a href="https://github.com/prozb/miles-davis-project" alt="this project on github"> prozb/miles-davis-project</a>.
						</p>
					</div>
					<div className="col-lg-4">
							<img alt="graph representation" src="assets/davis.png" className="img-fluid"/>
					</div>
				</div>
    	</div>

			<hr className="col-xs-12"></hr>

			<a alt="discographies section" name="discographies_section"></a>
			<div className="card-holder container">
				<h3>{config.homepage_config.discographies_title}</h3>
				<p className="card-text info-text">{config.homepage_config.discographies_description}</p>

				<p className="card-text info-text">Außerdem wird neben diesem Projekt zur Visualisierung der 
					Diskografien an einem <a href="https://github.com/prozb/discography-scraper">prozb/discography-scraper</a> zur
					automatisierten Erstellung 
					der Diskografien gearbeitet. Die Idee ist die Daten für diese 
					Applikation automatisch aus Wikipedia zu extrahieren, diese 
					können danach sofort in dieser Applikation visualisieren. Nach der 
					Entwicklung dieses Programmes lassen sich Diskografien von 
					anderen Bands in wenigen Minuten erstellen.
				</p>
        <div className="row">
					{this.getAllBands()}
				</div>	
    	</div>
			<hr className="col-xs-12"></hr>
		</div>
	}

	/**
	 * getting card of the band
	 */
	getBandCard = (band) => {
		return (
			<div key={band.name} className="col-md-4 custom-card d-flex align-items-stretch">
				<div className="card text-center">
					<img src={band.src} className="card-img-top" alt={band.alt}></img>
					<div className="card-body">
						<h5 className="card-title h4">{band.name}</h5>
						<p className="card-text info-text">{band.info}</p>
						<button onClick={() => this.handlePress(band.discography)} href={band.url} className="btn btn-outline-primary">{config.homepage_config.erkunden} &raquo;</button>
					</div>
				</div>
			</div>
		)
	}
	/**
	 * getting all bands cards 
	 */
	getAllBands = () => {
		return config.homepage_discografies.map(band => this.getBandCard(band));
	}

	handlePress = path => {
		fetchFiles(path);
	}
	// credits of the webpage
	getCredits = () => {
		return <div>
			<div className="container credits">
			</div>
			<hr className="col-xs-12"></hr>
		</div>
	}
	// footer of the webpage
	getFooter = () => {
		return ( 
		<footer className="page-footer font-small my-footer">
			<div className="container text-center">
				<p>Jumbotron foto is made by Alex Paganelli on Unsplash</p>
			</div>

			<a name="contact"> </a>

      <div className="container text-center">
      <p >If you have any questions or want to cooperate
				just write me short email: 
				<a href="mailto:pavlo@rozbitski.de"> Pavlo Rozbytskyi, pavlo@rozbitski.de</a>
			</p>
      </div>
			<hr className="col-xs-12"></hr>
      <div className="footer-copyright text-center pb-3">© {new Date().getFullYear()} Copyright: Pavlo Rozbytskyi
      </div>
    </footer>
		)
	}
}

export default withRouter(HomeRoute);
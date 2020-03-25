import './tooltip.css';
import React, { Component } from 'react';
/**
 * @author Pavlo Rozbytskyi
 * @version 1.0.0
 * tooltip for musicians
 */
export default class MusicianTooltip extends Component {
  render() {
    const {musician} = this.props;
    // getting deathdate of the musician
    var deathdate = musician.deathdate !== "" ? (<p>deathdate: {musician.deathdate}</p>) : "";
    // block with image
    const imgBlock = musician.icon ? 
      (<div className="container text-center w-100">
        <img className="mx-auto" src={musician.icon} alt={musician.label}/>
      </div>) : null; // add react avatar
    
    return (
      <div className="container tooltip-container pt-5">
        {imgBlock}
        <div className="container text-center text-wrap pb-3">
          <h4>{musician.id}</h4>
          <p>involved in {musician.albums.length} albums</p>
          <div className="text-wrap instruments-div">
            <p>played on {musician.instruments.toString()}</p>
          </div>
          <p>birthdate: {musician.birthdate}</p>
          {deathdate}
          <a rel="noopener noreferrer" target="_blank" href={musician.url}>link to the biography</a>
        </div>
      </div>
    );
  }
}

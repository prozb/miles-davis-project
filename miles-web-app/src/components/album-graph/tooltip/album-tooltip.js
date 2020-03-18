import './tooltip.css';
import React, { Component } from 'react';
/**
 * @author Pavlo Rozbytskyi
 * @version 1.0.0
 * tooltip for albums
 */
export default class AlbumTooltip extends Component {
  render() {
    const {album} = this.props;
     // getting block with image
    const imgBlock = album.icon ? 
    (<div class="container image-container">
      <img src={album.icon} alt={album.label}/>
    </div>) : null; // add react avatar

    return (
       <div class="container tooltip-container">
        {imgBlock}

        <div class="container text-center">
          <h4>{album.id}</h4>
          <p>{album.musicians.length} musicians worked on</p>
          <p>release date: {album.released}</p>
          <p>label: {album.label}</p>
          <p>producers: {album.producers}</p>
          <a target="_blank" href={album.url}>link to a album info</a>
        </div>
      </div>
    );
  }
}

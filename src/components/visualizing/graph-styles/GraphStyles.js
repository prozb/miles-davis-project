import {getInitials} from '../../../scripts/helpers';
/**
 * this file contains all styles of cytoscape instance
 * @author Pavlo Rozbytskyi
 */

  // sizes of secondary nodes e.g. musician node on 
 // albums perspective
 const defaultWidth     = 100;
 const defaultHeight    = 100;
 const defaultBorder    = '5px';
 const trackWidth       = 50;
 const trackHeight      = 50;
 const edgeWidth        = 5;
 // sizes of main nodes e.g. musicians node 
 // on musicians perspective
 const mainWidth     = 130;
 const mainHeight    = 130;
 const mainBorder    = '7px';
 const mainFontSize  = '20';
 // colors and shapes
 const musicianColor   = '#469B30';
 const whiteColor      = '#FFFFFF';
 const musicianShape   = 'ellipse';
 const albumShape      = 'square';
 const albumColor      = '#EEC748';
 const instrumentShape = 'diamond';
 const instrumentColor = '#f18867';
 const trackShape      = 'round-triangle';
 const trackColor      = '#E1AC3C';
 /**
  * style of the album edge
  */
 export const albumEdge = {
  selector: 'edge[type="album"]',
  style: {
    'line-color': albumColor,
    'width': edgeWidth,
  }
 };
 /**
  * musicians edge style
  */
 export const musicianEdge = {
  selector: 'edge[type="musician"]',
  style: {
    'line-color': musicianColor,
    'width': edgeWidth,
  }
 };
 /**
  * instruments edge style
  */
 export const instrumentEdge = {
  selector: 'edge[type="instrument"]',
  style: {
    'line-color': instrumentColor,
    'width': edgeWidth,
  }
 }
 /**
  * edge to track style
  */
 export const trackEdge = {
  selector: 'edge[type="track"]',
  style: {
    'line-color': trackColor,
  }
 }
 /**
  * styles of the instrument
  */
 export const instrumentNode = {
  selector: 'node[type="track"]',
  style: {
    width: trackWidth,
    height: trackHeight,
    shape: trackShape,
    content: 'data(label)',
    'background-color': trackColor,
    'background-image': 'none',
  }
 }
/**
 * general style of all nodes
 */
 export const nodeStyle = {
  selector: 'node[icon]',
  style: {
    'background-fit': 'contain',
    'background-image': function(elem){
      // return image if exists
      var icon = elem.data().icon;
      if(icon && icon !== "" && icon !== 'none'){
        return icon;
      }
      // create svg if not exist
      const initial = getInitials(elem.data().label);
      const svgImage = `<svg xmlns="http://www.w3.org/2000/svg"
        width="46" height="46" 
        style="background-color:rgb(52, 73, 94);-moz-border-radius: 0px;">
        <text 
          style="font-size: 20px; font-weight: 400"
          font-family="HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,
          Helvetica,Arial,Lucida Grande,sans-serif"  text-anchor="middle" 
          y="50%" x="50%" dy="0.35em" fill="white">${initial}</text>
        Sorry, your browser does not support inline SVG.
      </svg>`
      // creating url
      const svgUrl = encodeURI("data:image/svg+xml;utf8," + svgImage);
      //returning svg url
      return svgUrl;
    }
  }
 }
 /**
  * default style of musician
  */
 const musicianStyle = {
  selector: 'node[type="musician"]',
  style: {
    width: defaultWidth,
    height: defaultHeight,
    shape: musicianShape,
    content: 'data(label)',
    'border-color': musicianColor,
    'background-color': whiteColor,
    'border-width': defaultBorder,
    'text-margin-y': -10
  }
 };

 /**
   * getting style of musician nodes and edges for each perspective
   * @param {string} type - type of perspective should be displayed
   * possible types are: musician, track, album
   */
  export const getMusicianStyle = (type) => {
    // deep copy
    let musician = JSON.parse(JSON.stringify(musicianStyle));

    switch(type){
      //musician style on albums perspective
      case "album":
        musician.style['text-margin-y'] = -5;
        break;
      //musician style on musicians perspective
      case "musician": 
        musician.style.width = mainWidth;
        musician.style.height = mainHeight;
        musician.style['border-width'] = mainBorder;
        musician.style['font-weight'] = 'bold';
        musician.style['font-size'] = mainFontSize;
        break;
      case "special": 
        musician.style['text-margin-y'] = '-5';
        break;
      default: 
        break;
    }
    return musician;
  }
  /**
   * style of the album
   */
  const albumStyle = {
    selector: 'node[type="album"]',
    style: {
      width: defaultWidth,
      height: defaultHeight,
      shape: albumShape,
      content: 'data(label)',
      'border-color': albumColor,
      'background-color': whiteColor,
      'border-width': defaultBorder,
      'text-margin-y': -10
    }
  };
  /**
   * getting style of album nodes and edges for each perspective
   * @param {string} type - type of current perspective
   * possible types are: musician, track, album
   */
  export const getAlbumStyle = (type) => {
    let album = JSON.parse(JSON.stringify(albumStyle));

    switch(type){
      case "musician":
        album.style['text-margin-y'] = '-5';
        break;
      case "album": 
        album.style.width = mainWidth;
        album.style.height = mainHeight;
        album.style['border-width'] = mainBorder;
        album.style['font-weight'] = 'bold';
        album.style['font-size'] = mainFontSize;
        break;
      case "special": 
        album.style['text-margin-y'] = '-5';
        break;
      default: 
        break;
    }
    return album;
  }

  /**
   * default instrument's style
   */
  const instrumetStyle = {
    selector: 'node[type="instrument"]',
    style: {
      width: defaultWidth,
      height: defaultHeight,
      shape: instrumentShape,
      content: 'data(label)',
      'background-color': whiteColor,
      'border-color': instrumentColor,
      'border-width': defaultBorder,
      'text-margin-y': -10
    }
  };
  /**
   * getting style of instrument nodes and edges for each perspective
   * @param {string} type - type of perspective should be displayed
   * possible types are: musician, track, album
   */
  export const getInstrumentStyle = (type) => {
    // deep copy of the instrument
    let instrument = JSON.parse(JSON.stringify(instrumetStyle));

    switch(type){
      case "musician": 
      instrument.style['text-margin-y'] = '-5';
        break;
      case "instrument":
        instrument.style.width = mainWidth;
        instrument.style.height = mainHeight;
        instrument.style['border-width'] = mainBorder;
        instrument.style['text-margin-y'] = '-10';
        instrument.style['font-weight'] = 'bold';
        instrument.style['font-size'] = mainFontSize;
        break;
      default: 
        break;
    }
    return instrumetStyle;
  }
import './graph.css';
import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';

Cytoscape.use(coseBilkent);
/**
 * @author Pavlo Rozbytskyi
 * component renders all musicians of each album
 */
export default class Graph extends React.Component {
  constructor(props){
    super(props);
  }

  /**
   * node click handler
   * @param {Object} node - node data
   */
  handleNodeClick = (node) => {
    const {type} = this.props;
    switch(node.type) {
      case "track":
        // showing track display 
        this.props.showTrackDisplay(node.label);
        break;
      case "album":
        // handling pressing on album node
        
        break;
      case "musician":
        this.handlePressOnMusician(type, node.label);
        break;
      default:
        break;
    }
  }

  /**
   * handle pressing on album depending on different types of perspectives
   * @param {string} type - type of perspectives
   * @param {string} label - label of musician to be displayed
   */
  handlePressOnMusician = (type, label) => {
    switch(type){
      case "album":
        this.props.showMusicianDisplay(label);
        break;
      case "musician": 
        this.props.hideMusicianDisplay();
        break;
      default: 
        break;
    }
  }
  /**
   * handle pressing on album depending on different types of perspectives
   */
  handlePressOnAlbum = (type) => {
    switch(type){
      case "album":
        break;
      case "musician": 
        break;
      default: 
        break;
    }
  }
  /**
   * getting style of musician nodes and edges for each perspective
   * @param {string} type - type of perspective should be displayed
   * possible types are: musician, track, album
   */
  getMusicianStyle = (type) => {
    // default style
    var musicianStyle = {
      selector: 'node[type="musician"]',
      style: {
        width: 100,
        height: 100,
        shape: 'ellipce',
        content: 'data(label)',
        'border-color': '#36A8AB',
        'border-width': '5px'
      }
    };

    switch(type){
      case "musician":
        musicianStyle.style.width = 130;
        musicianStyle.style.height = 130;
        musicianStyle.style['border-width'] = '15px';
        musicianStyle.style['text-margin-y'] = '-10';
        musicianStyle.style['font-weight'] = 'bold';
        musicianStyle.style['font-size'] = '20';
        break;
      case "album": 
        musicianStyle.style.width = 100;
        musicianStyle.style.height = 100;
        musicianStyle.style['border-width'] = '5px';
        musicianStyle.style['text-margin-y'] = '-5';
        break;
      default: 
        break;
    }
    return musicianStyle;
  }

  /**
   * getting style of album nodes and edges for each perspective
   * @param {string} type - type of perspective should be displayed
   * possible types are: musician, track, album
   */
  getAlbumStyle = (type) => {
    // default style
    var albumStyle = {
      selector: 'node[type="album"]',
      style: {
        width: 100,
        height: 100,
        shape: 'ellipce',
        content: 'data(label)',
        'border-color': '#2E6299',
        'font-size': '20'
      }
    };

    switch(type){
      case "album":
        albumStyle.style.width = 130;
        albumStyle.style.height = 130;
        albumStyle.style['border-width'] = '15px';
        albumStyle.style['text-margin-y'] = '-10';
        albumStyle.style['font-weight'] = 'bold';
        albumStyle.style['font-size'] = '20';
        break;
      case "musician": 
        albumStyle.style.width = 100;
        albumStyle.style.height = 100;
        albumStyle.style['border-width'] = '5px';
        albumStyle.style['text-margin-y'] = '-5';
        break;
      default: 
        break;
    }
    return albumStyle;
  }
  render(){
    // dont render component if album not set 
    if(this.props.data.length === 0)
      return null;
    const {type} = this.props;
    const musiciansStyle = this.getMusicianStyle(type);
    const albumStyle = this.getAlbumStyle(type);

    return <CytoscapeComponent 
      stylesheet={[
        musiciansStyle,
        albumStyle,
        {
          selector: 'node[icon]',
          style: {
            'background-image': 'data(icon)',
          }
        },
        {
          selector: 'node[type="track"]',
          style: {
            width: 50,
            height: 50,
            shape: 'ellipce',
            content: 'data(label)',
            'background-color': '#E1AC3C'
          }
        },
        {
          selector: 'node[type="instrument"]',
          style: {
            width: 90,
            height: 90,
            shape: 'ellipce',
            content: 'data(label)',
          }
        },
        {
          selector: 'edge[type="track"]',
          style: {
            'line-color': '#E1AC3C',
          }
        },
        {
          selector: 'edge[type="musician"]',
          style: {
            'line-color': '#36A8AB',
            'width': 5,
          }
        },
      ]}
      cy={(cy) => { 
        this.cy = cy;
        this.cy.layout({name:'cose-bilkent', spacingFactor: 2}).run();
        this.cy.on('boxselect', 'node', evt => {
          var selected = this.cy.$(':selected');
        });
        this.cy.on('tap', 'node', evt => this.handleNodeClick(evt.target.data()));
      }}
      elements={this.props.data} 
      style={{ width: '100%', height: '100%'}}
      layout={{name: 'cose-bilkent', spacingFactor: 2}}/>;
  }
}

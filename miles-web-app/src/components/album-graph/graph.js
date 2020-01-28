import './graph.css';
import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import popper from 'cytoscape-popper';
Cytoscape.use( popper );
Cytoscape.use(coseBilkent);
/**
 * @author Pavlo Rozbytskyi
 * component renders all musicians of each album
 */
export default class Graph extends React.Component {
  constructor(props){
    super(props);

    this.callCount = 0;
    this.selectedSize = 0;
  }

  /**
   * node click handler
   * @param {Object} node - node data
   */
  handleNodeClick = (node) => {
    const {type} = this.props;

    switch(type) {
      // handling all clicks on track perspective
      case "track":
        // showing track display 
        break;
      case "instrument":
        // showing track display 
        this.handleInstrumentsPerspectiveClicks(node.type, node.label);
        break;
      // handling all clicks on album perspective
      case "album":
        this.handleAlbumPerspectiveClicks(node.type, node.label);
        break;
      // handling all clicks on album perspective
      case "musician":
        this.handleMusiciansPerspectiveClicks(node.type, node.label);
        break;
      case "special":
        break;
      default:
        break;
    }
  }
  /**
   * handle pressing on nodes in special perspective
   * @param {string} type - type of perspectives
   * @param {string} label - label of instrument to be displayed
   */
  handleSpecialCase = (type, label) => {
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
   * handle pressing on nodes in instrument perspective
   * @param {string} type - type of perspectives
   * @param {string} label - label of instrument to be displayed
   */
  handleInstrumentsPerspectiveClicks = (type, label) => {
    switch(type){
      case "musician": 
        this.props.showMusicianDisplay(label);
        break;
      case "instrument": 
        this.props.hideInstrumentDisplay();
        break;
      default: 
        break;
    }
  }
  /**
   * handle pressing on nodes in album perspective
   * @param {string} type - type of perspectives
   * @param {string} label - label of musician to be displayed
   */
  handleMusiciansPerspectiveClicks = (type, label) => {
    switch(type){
      case "album":
        this.props.switchToAlbum(label);
        break;
      case "musician": 
        this.props.hideMusicianDisplay();
        break;
      case "instrument": 
        this.props.showInstrumentDisplay(label);
        break;
      default: 
        break;
    }
  }
  /**
   * handle pressing on album depending on different types of perspectives
   * @param {string} type - type of perspectives
   * @param {string} label - label of album to be displayed
   */
  handleAlbumPerspectiveClicks = (type, label) => {
    switch(type){
      case "album":
        break;
      case "musician": 
        this.props.showMusicianDisplay(label);
        break;
      case "track": 
        this.props.showTrackDisplay(label);
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
        shape: 'ellipse',
        content: 'data(label)',
        'border-color': '#36A8AB',
        'border-width': '5px'
      }
    };

    switch(type){
      case "musician":
        musicianStyle.style.width = 130;
        musicianStyle.style.height = 130;
        musicianStyle.style['border-width'] = '5px';
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
        shape: 'square',
        content: 'data(label)',
        'border-color': '#2E6299',
        'font-size': '20'
      }
    };

    switch(type){
      case "album":
        albumStyle.style.width = 130;
        albumStyle.style.height = 130;
        albumStyle.style['border-width'] = '5px';
        albumStyle.style['text-margin-y'] = '-10';
        albumStyle.style['font-weight'] = 'bold';
        albumStyle.style['font-size'] = '20';
        break;
      case "musician": 
        albumStyle.style.width = 100;
        albumStyle.style.height = 100;
        albumStyle.style['border-width'] = '2px';
        albumStyle.style['text-margin-y'] = '-5';
        break;
      default: 
        break;
    }
    return albumStyle;
  }

  /**
   * getting style of instrument nodes and edges for each perspective
   * @param {string} type - type of perspective should be displayed
   * possible types are: musician, track, album
   */
  getInstrumentStyle = (type) => {
    // default style
    var instrumetStyle = {
      selector: 'node[type="instrument"]',
      style: {
        width: 100,
        height: 100,
        shape: 'diamond',
        content: 'data(label)',
        'border-color': '#FBE44D',
      }
    };
    
    switch(type){
      case "musician": 
        instrumetStyle.style.width = 100;
        instrumetStyle.style.height = 100;
        instrumetStyle.style['border-width'] = '2px';
        instrumetStyle.style['text-margin-y'] = '-5';
        break;
      case "instrument":
        instrumetStyle.style.width = 130;
        instrumetStyle.style.height = 130;
        instrumetStyle.style['border-width'] = '5px';
        instrumetStyle.style['text-margin-y'] = '-10';
        instrumetStyle.style['font-weight'] = 'bold';
        instrumetStyle.style['font-size'] = '20';
        break;
      default: 
        break;
    }
    return instrumetStyle;
  }

  render(){
    // dont render component if album not set 
    if(this.props.data.length === 0)
      return null;
    const {type} = this.props;
    const musiciansStyle = this.getMusicianStyle(type);
    const albumStyle = this.getAlbumStyle(type);
    const instrumentStyle = this.getInstrumentStyle(type);

    return <CytoscapeComponent 
      stylesheet={[
        musiciansStyle,
        albumStyle,
        instrumentStyle,
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
            shape: 'round-triangle',
            content: 'data(label)',
            'background-color': '#E1AC3C'
          }
        },
        {
          selector: 'edge[type="track"]',
          style: {
            'line-color': '#E1AC3C',
          }
        },
        {
          selector: 'edge[type="instrument"]',
          style: {
            'line-color': '#FBE44D',
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
        this.cy.unbind("tap");
        this.cy.bind('tap', 'node', evt => { 
          this.handleNodeClick(evt.target.data())
        });

        this.cy.unbind("cxttap");
        this.cy.bind('cxttap', 'node', evt => { 
          let node = evt.target;

          let popper = node.popper({
            content: () => {
              let div = document.createElement('div');

              div.innerHTML = 'Sticky Popper content';
              document.body.appendChild( div );
              return div;
            }
          });

          let update = () => {
            popper.scheduleUpdate();
          };
          node.on('position', update);
          cy.on('pan zoom resize', update);
        });

        this.cy.unbind("boxselect");
        this.cy.bind('boxselect', 'node', evt => { 
          if(this.callCount === 0){
            var selected = this.cy.$(':selected');
            this.props.handleCollection(selected);
            // call function to trigger
            this.selectedSize = selected.length;
            this.callCount++;
          }else{
            this.callCount++;
          }

          if(this.callCount >= this.selectedSize){
            this.callCount = 0;
            this.selectedSize = 0;
            this.cy.$(':selected').unselect();
          }
        });
      }}
      elements={this.props.data} 
      style={{ width: '100%', height: '100%'}}
      layout={{name: 'cose-bilkent', spacingFactor: 2}}/>;
  }
}

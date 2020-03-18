import './graph.css';
import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import popper from 'cytoscape-popper';
import tippy, {sticky} from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { musicianService, albumService, instrumentService } from '../../service';
import { renderToString } from 'react-dom/server'
import {getInitials} from '../../scripts/helpers';
import {MusicianTooltip, AlbumTooltip, InstrumentTooltip} from './tooltip';

Cytoscape.use( popper );
Cytoscape.use(coseBilkent);
/**
 * @author Pavlo Rozbytskyi
 * component renders all musicians of each album
 */
export default class Graph extends React.Component {
  constructor(props){
    super(props);
    // needed to fix event handlers of collections
    this.callCount = 0;
    this.selectedSize = 0;
  }

  handleSpecialPerspective = (type, label) => {
    switch(type){
      case "musician": 
        this.props.showMusicianDisplay(label);
        break;
      case "instrument": 
        // this.props.showInstrumentDisplay(label);
        break;
      case "album": 
        this.props.switchToAlbum(label);
        break;
      default: 
        break;
    }
  }
  /**
   * node click handler
   * @param {Object} node - node data
   */
  handleNodeClick = (node) => {
    const {type, special} = this.props;

    if(special){
      this.handleSpecialPerspective(node.type, node.label);
      return;
    }
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
        shape: 'square',
        content: 'data(label)',
        'border-color': '#469B30',
        'background-color': '#FFFFFF',
        'border-width': '5px',
        'text-margin-y': -10
      }
    };

    switch(type){
      case "album":
        musicianStyle.style.width = 100;
        musicianStyle.style.height = 100;
        musicianStyle.style['border-width'] = '5px';
        musicianStyle.style['text-margin-y'] = '-5';
        break;
      case "musician": 
        musicianStyle.style.width = 130;
        musicianStyle.style.height = 130;
        musicianStyle.style['border-width'] = '7px';
        musicianStyle.style['text-margin-y'] = '-10';
        musicianStyle.style['font-weight'] = 'bold';
        musicianStyle.style['font-size'] = '20';
        break;
      case "special": 
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
   * getting tooltip html of node
   */
  getTooltipByOfNode = (node) => {
    var data = node.data();

    switch(data.type){
      case "musician":
        //getting musician object
        var musician = musicianService.getByName(data.label);
        // displaing tooltip for the musician
        return renderToString(<MusicianTooltip musician={musician}/>)
      case "album":
        //getting album object
        var album = albumService.getByName(data.label);
        // displaying album tooltip
        return renderToString(<AlbumTooltip album={album}/>)
      case "instrument":
        //getting instrument object
        var instrument = instrumentService.getByName(data.label);
        //displaying instrument tooltip
        return renderToString(<InstrumentTooltip instrument={instrument}/>)
      default: 
        break;
    }

    // switch(data.type){
    //   : 
    //     return "Nice track"
    // }
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
        shape: 'ellipse',
        content: 'data(label)',
        'border-color': '#2E6299',
        'font-size': '20'
      }
    };

    switch(type){
      case "musician":
        albumStyle.style.width = 100;
        albumStyle.style.height = 100;
        albumStyle.style['border-width'] = '5px';
        albumStyle.style['text-margin-y'] = '-5';
        break;
      case "album": 
        albumStyle.style.width = 130;
        albumStyle.style.height = 130;
        albumStyle.style['border-width'] = '8px';
        albumStyle.style['text-margin-y'] = '-10';
        albumStyle.style['font-weight'] = 'bold';
        albumStyle.style['font-size'] = '20';
        break;
      case "special": 
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
        'border-color': '#f18867',
      }
    };
    
    switch(type){
      case "musician": 
        instrumetStyle.style.width = 100;
        instrumetStyle.style.height = 100;
        instrumetStyle.style['border-width'] = '5px';
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
    {/* 'background-image': 'data(icon)', */}
    return <CytoscapeComponent 
      stylesheet={[
        musiciansStyle,
        albumStyle,
        instrumentStyle,
        {
          selector: 'node[icon]',
          style: {
            'background-image': function(elem){
              // return image if exists
              var icon = elem.data().icon;
              if(icon && icon !== "" && icon !== 'none'){
                return icon;
              }
              // create svg if not exist
              const initial = getInitials(elem.data().label);
              const svgImage = `<svg xmlns="http://www.w3.org/2000/svg" pointer-events="none" width="46" height="46" style="width: 46px; border-radius: 0px; -moz-border-radius: 0px; background-color: #34495e; height: 46px">
                  <text text-anchor="middle" y="50%" x="50%" dy="0.35em" pointer-events="auto" fill="#ffffff" font-family="HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif" style="font-size: 20px; font-weight: 400">${initial}</text> 
                </svg>`

              const svgUrl = encodeURI("data:image/svg+xml;utf8," + svgImage);
              //returning svg url
              return svgUrl;
            },
            'background-fit': 'contain'
          }
        },
        {
          selector: 'node[type="track"]',
          style: {
            width: 50,
            height: 50,
            shape: 'round-triangle',
            content: 'data(label)',
            'background-color': '#E1AC3C',
            'background-image': 'none',
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
            'line-color': '#f18867',
            'width': 5,
          }
        },
        {
          selector: 'edge[type="musician"]',
          style: {
            'line-color': '#469B30',
            'width': 5,
          }
        },
        {
          selector: 'edge[type="album"]',
          style: {
            'line-color': '#2E6299',
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
          let dummyDomEle = document.createElement('div');
          let ref = node.popperRef();
          let tip = new tippy(dummyDomEle, { // tippy options:
            // mandatory:
            appendTo: document.body,
            flip: ["top", "left"],
            interactive: true,
            sticky: true,
            animation: 'scale',
            arrow: false,
            plugins: [sticky],
            trigger: 'manual', // call show() and hide() yourself
            lazy: false, // needed for onCreate()
            onCreate: instance => { instance.popperInstance.reference = ref; }, // needed for `ref` positioning
            // your custom options follow:
            content: () => {
              let content = document.createElement('div');
              content.innerHTML = this.getTooltipByOfNode(node);
              return content;
            },
            popperOptions: {
              positionFixed: true
            }
          });

          if(node.data().type !== 'track')
            tip.show();
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

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
import {MusicianTooltip, AlbumTooltip, InstrumentTooltip} from './tooltip';
import {albumEdge, musicianEdge, 
  instrumentEdge, trackEdge, nodeStyle, instrumentNode,
  getMusicianStyle, getAlbumStyle, getInstrumentStyle} from './graph-styles/GraphStyles';

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

  render(){
    // dont render component if album not set 
    if(this.props.data.length === 0)
      return null;
    const {type, className} = this.props;
    // getting styles of musician, album, instrument
    const musiciansStyle = getMusicianStyle(type);
    const albumStyle = getAlbumStyle(type);
    const instrumentStyle = getInstrumentStyle(type);

    return (<CytoscapeComponent 
      className={className}
      stylesheet={[
        musiciansStyle,
        albumStyle,
        instrumentStyle,
        trackEdge,
        instrumentEdge,
        musicianEdge,
        albumEdge,
        nodeStyle,
        instrumentNode
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
            // needed for `ref` positioning
            onCreate: instance => { instance.popperInstance.reference = ref; }, 
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
      minZoom={0.3}
      maxZoom={5}
      elements={this.props.data} 
      layout={{name: 'cose-bilkent', spacingFactor: 2}}
      />)
  }

  /**
   * special perspectives show compound elements e.g. 
   * on which albums played musicians together.  
   */
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
   * Click handler for all nodes.
   * 
   * graph component shows different perspectives and each perspective
   * shows his own nodes on the screen. Nodes of different types have 
   * different event hanlers.
   *
   * e.g.: on the musician perspective are placed albums and instruments of 
   * the musician. Press on instrument should navigate user to instruments 
   * perspective, press on album node should navigate user to 
   * album's perspective. 
   * 
   * @param {Object} node - node
   */
  handleNodeClick = (node) => {
    // getting type of current perspective (musician, album, insturment)
    switch(this.props.type) {
      // handling all clicks on track perspective
      case "special": 
        // handle clicks on special perspective
        this.handleSpecialPerspective(node.type, node.label);
        break;
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
      default:
        break;
    }
  }
  /**
   * handle pressing on nodes in instrument perspective
   * @param {string} type - type current perspective
   * @param {string} label - name of the node
   */
  handleInstrumentsPerspectiveClicks = (type, label) => {
    switch(type){
      // press on musician in the instrument perspective
      // leads user to musician perspective
      case "musician": 
        this.props.showMusicianDisplay(label);
        break;
      // press on instrument in the instrument perspective
      // leads user back to musicians perspective
      case "instrument": 
        this.props.hideInstrumentDisplay();
        break;
      default: 
        break;
    }
  }
  /**
   * handle pressing on nodes in musician perspective
   * @param {string} type - type of current perspective
   * @param {string} label - name of pressed node
   */
  handleMusiciansPerspectiveClicks = (type, label) => {
    switch(type){
      // press on album in the musician perspective
      // leads user to albums perspective
      case "album":
        this.props.switchToAlbum(label);
        break;
      // press on musician in the musician perspective
      // leads user back to albums perspective
      case "musician": 
        this.props.hideMusicianDisplay();
        break;
      // press on instrument in the musician perspective
      // leads user to instrument's perspective
      case "instrument": 
        this.props.showInstrumentDisplay(label);
        break;
      default: 
        break;
    }
  }
  /**
   * handle pressing on nodes in album perspective
   * @param {string} type - type of current perspective
   * @param {string} label - name of the pressed node
   */
  handleAlbumPerspectiveClicks = (type, label) => {
    switch(type){
      case "album":
        break;
      // press on musician in the album perspective
      // leads user to musician's perspective
      case "musician": 
        this.props.showMusicianDisplay(label);
        break;
      // press on track in the album perspective
      // leads user to track's perspective
      case "track": 
        this.props.showTrackDisplay(label);
        break;
      default: 
        break;
    }
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
  }
}

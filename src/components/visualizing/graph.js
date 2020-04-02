import './graph.css';
import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import popper from 'cytoscape-popper';
import tippy, {sticky} from 'tippy.js';
import ReactTooltip from 'react-tooltip'
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
    const {
      type, className,
      handlePressOnAlbum,
      handlePressOnMusician,
      handlePressOnTrack,
      handlePressOnInstrument
    } = this.props;
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

        this.cy.bind('tap', 'node[type="album"]', function(evt) {
          handlePressOnAlbum(evt.target);
        });

        this.cy.bind('tap', 'node[type="musician"]', function(evt) {
          handlePressOnMusician(evt.target);
        });

        this.cy.bind('tap', 'node[type="instrument"]', function(evt) {
          handlePressOnInstrument(evt.target);
        });

        this.cy.bind('tap', 'node[type="track"]', function(evt) {
          handlePressOnTrack(evt.target);
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

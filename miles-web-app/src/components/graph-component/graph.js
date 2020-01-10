import './graph.css';
import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import { getCytoElementsMusicianTrackAlbum } from '../../scripts/helpers';

Cytoscape.use(coseBilkent);
/**
 * @author Pavlo Rozbytskyi
 * component renders all musicians of each album
 */
export default class Graph extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    // dont render component if album not set 
    if(this.props.album === '')
      return null;

    const elements = getCytoElementsMusicianTrackAlbum(this.props.tracks, this.props.musicians, this.props.album);
    if(elements.length === 0)
      return null;


      // style: [
      //   {
      //     selector: 'node[type="human"]',
      //     style: {
      //       'shape': 'triangle',
      //       'background-color': 'red'
      //     }
      //   },
      //   {
      //     selector: 'node[type="mouse"]',
      //     style: {
      //       'shape': 'square',
      //       'background-color': 'blue'
      //     }
      //   }
      // ]
    return <CytoscapeComponent 
      stylesheet={[
        {
          selector: 'node',
          style: {
            width: 70,
            height: 70,
            shape: 'ellipce',
            content: 'data(label)',
            'background-image': 'data(icon)'
          }
        },
      ]}
      cy={(cy) => { 
        this.cy = cy;
        this.cy.layout({name:'cose-bilkent', spacingFactor: 2}).run();
        this.cy.on('boxselect', 'node', evt => {
          var selected = this.cy.$(':selected');
          {/* console.log(selected); */}
        });
      }}
      elements={elements} 
      style={{ width: '100%', height: '800px'}}
      layout={{name: 'cose-bilkent', spacingFactor: 2}}/>;
  }
}

import './graph.css';
import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { getTrackPerspective } from '../../scripts/converter';

// Cytoscape.use(coseBilkent);
/**
 * @author Pavlo Rozbytskyi
 * component renders all musicians of each album
 */
export default class TrackGraph extends React.Component {
  /**
   * node click handler
   * @param {Object} node - node data
   */
  render(){
    // dont render component if album not set 
    if(this.props.album === '')
      return null;
    const elements = getTrackPerspective(this.props.data);

    if(elements.length === 0)
      return null;
    return <CytoscapeComponent 
      stylesheet={[
        {
          selector: 'node[type="musician"]',
          style: {
            width: 100,
            height: 100,
            shape: 'ellipse',
            content: 'data(label)',
            'background-image': 'data(icon)',
            'border-color': '#36A8AB',
            'border-width': '5px'
          }
        },
        {
          selector: 'node[type="instrument"]',
          style: {
            width: 140,
            height: 140,
            shape: 'rectangle',
            content: 'data(label)',
            'background-image': 'data(icon)',
            'border-color': '#E1AC3C',
            'border-width': '5px'
          }
        },
        {
          selector: 'edge',
          style: {
            'line-color': '#36A8AB',
          }
        },
      ]}
      cy={(cy) => { 
        this.cy = cy;
        this.cy.layout({name:'grid', spacingFactor: 2}).run();
      }}
      elements={elements} 
      style={{ width: '100%', height: '500px'}}
      layout={{name: 'grid', spacingFactor: 2,}}/>;
  }
}

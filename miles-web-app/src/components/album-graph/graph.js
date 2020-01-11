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
    switch(node.type) {
      case "track":
        // showing track display 
        this.props.showTrackDisplay(node.label);
        break;
      case "album":
        // handling pressing on album node
        break;
      case "musician":
        this.props.showMusicianDisplay(node.label);
        break;
      default:
        break;
    }
  }

  render(){
    // dont render component if album not set 
    console.log('grapg component')
    if(this.props.data.length === 0)
      return null;
    return <CytoscapeComponent 
      stylesheet={[
        {
          selector: 'node[type="musician"]',
          style: {
            width: 100,
            height: 100,
            shape: 'ellipce',
            content: 'data(label)',
            'border-color': '#36A8AB',
            'border-width': '5px'
          }
        },
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
          }
        },
        {
          selector: 'node[type="album"]',
          style: {
            width: 130,
            height: 130,
            shape: 'ellipce',
            content: 'data(label)',
            'border-color': '#2E6299',
            'border-width': '15px',
            'text-margin-y': '-10',
            'font-weight': 'bold',
            'font-size': '20'
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

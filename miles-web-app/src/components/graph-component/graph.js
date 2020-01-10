import './graph.css';
import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { getCytoElementsMusicianTrackAlbum } from '../../scripts/helpers';

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

    const elements = getCytoElementsMusicianTrackAlbum([], this.props.data, this.props.album);
    if(elements.length === 0)
      return null;

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
        this.cy.layout({name:'random', spacingFactor: 0.5}).run();
        this.cy.on('boxselect', 'node', evt => {
          var selected = this.cy.$(':selected');
          {/* console.log(selected); */}
        });
      }}
      elements={elements} 
      style={{ width: '100%', height: '800px'}}
      layout={{name: 'random', spacingFactor: 0.5}}/>;
  }
}

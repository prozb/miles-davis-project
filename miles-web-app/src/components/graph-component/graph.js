import './graph.css';
import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

/**
 * @author Pavlo Rozbytskyi
 * component renders all musicians of each album
 */
export default class Graph extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      elements: [],
    };
  }
  
  render(){
    const elements = this.props.data.map((musician, index) => {
      return { data: {id: index, label: musician[0], icon: musician[1].icon === '' ? 'none' : musician[1].icon}}
    });
    if(elements.length === 0)
      return null;

    console.log(elements);

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
        this.cy = cy 
        cy.layout({name:'random', spacingFactor: 0.5}).run();
      }}
      elements={elements} 
      style={{ width: '100%', height: '800px'}}
      layout={{name: 'random', spacingFactor: 0.5}}/>;
  }
}

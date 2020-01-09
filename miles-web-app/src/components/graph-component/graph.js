import './graph.css';
import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import {diffAlbums} from '../../scripts/helpers';

/**
 * @author Pavlo Rozbytskyi
 * component renders all musicians of each album
 */
export default class Graph extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      elements: [],
      maxIndex: 0,
    };
  }

  componentDidMount () {
    const elements = this.props.data.map((musician, index) => {
      return { data: {id: index, label: musician[0]}}
    });

    this.setState({elements: elements, maxIndex: elements[elements.length - 1].data.id});
  }

  static getDerivedStateFromProps(props, state) {
    if(props.data) {
      var newState = diffAlbums(state.elements, props.data, state.maxIndex);
   
      if(newState && newState.maxIndex && newState.elements){
        return {
          maxIndex: newState.maxIndex,
          elements: newState.elements,
        }
      }
      return {}
    }
  }
  
  render(){
    const { elements } = this.state;
    if(elements.length === 0)
      return null;
    return <CytoscapeComponent 
      cy={(cy) => { 
        this.cy = cy 
        cy.layout({name:'random', spacingFactor: 0.5}).run();
      }}
      elements={elements} 
      style={{ width: '100%', height: '800px'}}
      layout={{name: 'random', spacingFactor: 0.5}}/>;
  }
}

import './tooltip.css';
import React, { Component } from 'react';
/**
 * @author Pavlo Rozbytskyi
 * @version 1.0.0
 * tooltip for instruments
 */
export default class InstrumentTooltip extends Component {
  render() {
    const {instrument} = this.props;
     // getting block with image
    const imgBlock = instrument.url ? 
    (<div className="container image-container pt-5 w-100">
      <img className="mx-auto" src={instrument.url} alt={instrument.label}/>
    </div>) : null; // add react avatar

    return (
       <div className="container tooltip-container">
        {imgBlock}

        <div className="container text-center">
          <h4>{instrument.id}</h4>
          <p>{instrument.musicians.length} musicians played on this instrumet</p>
        </div>
      </div>
    );
  }
}

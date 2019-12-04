import React, { Component } from 'react';
/**
 * start button component
 * @author Pavlo Rozbytskyi
 */
const startedName = "btn btn-success";
const endedName   = "btn btn-danger";
const startText   = "Start exploration";
const endText     = "End exploration"

export default class StartButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {style} = this.props;
    const buttonClass = !this.props.started ? startedName : endedName;
    const buttonName  = !this.props.started ? startText : endText;
    return (
      <button style={style} className={buttonClass} onClick={this.props.startSimulation}>
          {buttonName}
      </button>
    );
  }
}

import React, { Component } from 'react';

/**
 * @author Pavlo Rozbytskyi
 * 
 * component representing showing menu to the user 
 */
export default class AlbumScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {name} = this.props;
    return (
      <div>
        <button onClick={this.props.switchToTimeline}>back</button>
        {name}
      </div>
    );
  }
}

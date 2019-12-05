import React, { Component } from 'react';
import TimelineItem from './TimelineItem';
import '../styles/timeline.css';

const item = {
    "Young Man with a Horn": {
      "id": "Young_Man_with_a_Horn",
      "label": "Blue Note",
      "released": "1952",
      "recorded": [
          "May 9, 1952"
      ],
      "icon": "https://upload.wikimedia.org/wikipedia/en/f/f8/Miles_Davis_Young_Man_With_a_Horn.jpg"
    },
  }
  
const item1 = { 
	"Blue Period": {
			"id": "Blue_Period",
			"label": "Prestige",
			"released": "1953",
			"icon": "https://upload.wikimedia.org/wikipedia/en/2/2f/Blue_Period_%28Miles_Davis_album_-_cover_art%29.jpg"
	},
}

/**
 * component for displaying all albums
 * @author Pavlo Rozbytskyi
 */
export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

	getX = (item1, item2) => {
		// getting years

		// calculating distance between albums
	}

  render() {
    return (
      <div className="timeline-container">
				<TimelineItem 
					itemId={item["Young Man with a Horn"].id}
					name={Object.keys(item)[0]} 
					icon={item["Young Man with a Horn"].icon} 
					date={item["Young Man with a Horn"].released}/>
					
				<TimelineItem 
					itemId={item1["Blue Period"].id}
					name={Object.keys(item1)[0]} 
					icon={item1["Blue Period"].icon} 
					date={item1["Blue Period"].released}/>
      </div>
    );
  }
}

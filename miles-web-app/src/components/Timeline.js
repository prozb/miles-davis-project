import React, { Component } from 'react';
import TimelineItem from './TimelineItem';
import '../styles/timeline.css';
import LineTo from 'react-lineto';

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

const item2 = {
		"Tutu": {
			"id": "Tutu",
			"released": "September 1986",
			"icon": "https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Miles_Davis-Tutu_%28album_cover%29.jpg/220px-Miles_Davis-Tutu_%28album_cover%29.jpg"
	}
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

				<div className="line-container">
					<svg width={100} height='10px'>
						<line x1="0" y1="0" x2="100" y2="0" style={{stroke: 'green', strokeWidth: '30'}}/>
					</svg>
				</div>

				<TimelineItem 
					itemId={item1["Blue Period"].id}
					name={Object.keys(item1)[0]} 
					icon={item1["Blue Period"].icon} 
					date={item1["Blue Period"].released}/>

				<div className="line-container">
					<svg width={500} height='10px'>
						<line x1="0" y1="0" x2="500" y2="0" style={{stroke: 'green', strokeWidth: '30'}}/>
					</svg>
				</div>

				<TimelineItem 
					itemId={item2["Tutu"].id}
					name={Object.keys(item2)[0]} 
					icon={item2["Tutu"].icon} 
					date={1986}/>
      </div>
    );
  }
}

// var tracks = require('../assets/cream-dataset/tracks.json');
var config = require('../assets/config.json');
var tracks = require(`../assets/${config["dataset_directory"]}/tracks.json`);

/**
 * @author Pavlo Rozbytskyi
 * tracks Data Access Object layer provides basic read functionality  
 */
class TrackRepository {
  constructor () { 
    this.allTracks = tracks.map(element => { 
      var obj = {};
      obj[0] = element.id;
      obj[1] = {
        albums: element.albums
      }
      return obj;
    });
  }
  getAll = () => {
    return this.allTracks;
  }
}

export const trackRepository = new TrackRepository();
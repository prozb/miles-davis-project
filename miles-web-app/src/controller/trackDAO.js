var tracks = require('../assets/tracks.json');
/**
 * @author Pavlo Rozbytskyi
 * tracks Data Access Object layer provides basic read functionality  
 */
class TrackDAO {
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

export const trackDAO = new TrackDAO();
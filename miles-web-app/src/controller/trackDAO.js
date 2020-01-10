var tracks = require('../assets/tracks.json');
/**
 * @author Pavlo Rozbytskyi
 * tracks Data Access Object layer provides basic read functionality  
 */
class TrackDAO {
  getAll = () => {
    return Object.entries(tracks);
  }
}

export const trackDAO = new TrackDAO();
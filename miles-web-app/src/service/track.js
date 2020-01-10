import { trackDAO } from '../controller';
/**
 * @author Pavlo Rozbytskyi
 * track service layer extends basic functionality from track dao
 */
class TrackService {
  /** 
   * getting track object by name
   * @param {string} name - track name
   */
  getTrackByName = (name) => {
    return trackDAO.getAll().filter(track => track[0] === name)[0];
  }
  /**
   * getting all tracks of the album
   * @param {string} name - album name
   */
  getAllTracksOfAlbum = (name) => {
    var tracks = [];
    trackDAO.getAll().forEach(track => {
      track[1].albums.forEach(album => {
        if(Object.keys(album)[0] === name && !tracks.includes(track[0])){
          tracks.push(track[0]);
        }
      });
    });

    return tracks.map(track => this.getTrackByName(track));
  }
}

export const trackService = new TrackService(); 
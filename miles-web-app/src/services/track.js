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
  /**
   * getting all instrument - musician relations by track and album name
   * @param {string} trackName - track name 
   * @param {string} albumName - album name  
   */
  getMusicianInstrumentRelationOnTrack = (trackName, albumName) => {
    var relations = trackDAO.getAll()
      .filter(track => track[0] === trackName)[0][1].albums
      .filter(album => Object.keys(album)[0] === albumName)[0];
    return Object.entries(relations)[0][1];
  }

  getAllContainingSubstring = (query) => {
    return trackDAO.getAll().filter(track => track[0].includes(query));
  }
}

export const trackService = new TrackService(); 
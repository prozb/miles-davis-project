import { trackRepository } from '../repository';
/**
 * @author Pavlo Rozbytskyi
 * track service layer extends basic functionality from track dao
 */
class TrackService {
  /** 
   * getting track object by name
   * @param {string} name - track name
   */
  getByName = (name) => {
    return trackRepository.getAll().filter(track => track[0] === name)[0];
  }
  /**
   * getting all tracks of the album
   * @param {string} name - album name
   */
  getAllTracksOfAlbum = (name) => {
    var tracks = [];
    trackRepository.getAll().forEach(track => {
      track[1].albums.forEach(album => {
        if(Object.keys(album)[0] === name && !tracks.includes(track[0])){
          tracks.push(track[0]);
        }
      });
    });

    return tracks.map(track => this.getByName(track));
  }
  /**
   * getting all instrument - musician relations by track and album name
   * @param {string} trackName - track name 
   * @param {string} albumName - album name  
   */
  getMusicianInstrumentRelations = (trackName, albumName) => {
    try{
      var relations = trackRepository.getAll()
        .filter(track => track[0] === trackName)[0][1].albums
        .filter(album => Object.keys(album)[0] === albumName)[0];
      return Object.entries(relations)[0][1];
    }catch(err){
      console.error(err);
      return [];
    }
  }

  getAllContainingSubstring = (query) => {
    if(query === '')
      return [];
    return trackRepository.getAll().filter(track => track[0].includes(query));
  }
}

export const trackService = new TrackService(); 
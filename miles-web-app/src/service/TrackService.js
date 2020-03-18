import { trackRepository } from '../repository';
/**
 * @author Pavlo Rozbytskyi
 * track service layer extends basic functionality from track dao
 */
class TrackService {
  /** 
   * getting track object by name or null if don't exist
   * @param {string} name - track name
   */
  getByName = (name) => {
    var filtered = trackRepository
      .getAll()
      .filter(track => track.id === name);

    return filtered.length > 0 ? filtered[0] : null;
  }
  /**
   * getting all tracks of the album
   * @param {string} name - album name
   */
  getAllTracksOfAlbum = (name) => {
    var tracks = [];

    try{
      //getting all tracks
      trackRepository.getAll().forEach(track => {
        // going all albums of the track
        track.albums.forEach(album => {
          // checking name from parameter is equal to album name in track
          // and pushing it to collection if not present
          if(Object.keys(album)[0] === name && !tracks.includes(track.id)){
            tracks.push(track.id);
          }
        });
      });
    }catch(err){
      console.error(err);
    }

    return tracks
      .map(track => this.getByName(track))
      .filter(track => track && track !== null);
  }
  /**
   * getting all instrument - musician relations on track of certain album
   * @param {string} trackName - track name 
   * @param {string} albumName - album name  
   */
  getMusicianInstrumentRelations = (trackName, albumName) => {
    // finding track with trackName
    var relations = trackRepository.getAll()
      .filter(track => track.id === trackName);
    // checking track exists and albums of track exist
    if(!relations || !relations[0] || !relations[0].albums){
      return [];
    }
    // loop over all albums of the track and find album with albumName
    relations = relations[0].albums.filter(album => {
        return Object.keys(album)[0] === albumName;
    });
    
    if(!relations || !relations[0]){
      return [];
    }
    var convertedRel = relations[0];
    return Object.entries(convertedRel)[0][1];
  }
  /**
   * getting all tracks containing in their's names 
   * the search query
   * @param {String} query - search query
   */
  getAllContainingSubstring = (query) => {
    if(query === '')
      return [];
    return trackRepository
      .getAll()
      .filter(track => track && track !== null && track.id.includes(query));
  }
}

export const trackService = new TrackService(); 
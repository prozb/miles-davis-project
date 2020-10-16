import { trackRepository } from "../repository";
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
      .filter((track) => track.id === name);

    return filtered.length > 0 ? filtered[0] : null;
  };
  /**
   * getting all tracks of the album
   * @param {string} name - album name
   */
  getAllTracksOfAlbum = (name) => {
    var tracks = this.getAllTracksNamesOfAlbum(name);

    return tracks
      .map((track) => this.getByName(track))
      .filter((track) => track && track !== null);
  };

  /**
   * getting all tracks names of the album
   * @param {string} name - album name
   */
  getAllTracksNamesOfAlbum = (name) => {
    var tracks = [];

    try {
      //getting all tracks
      trackRepository.getAll().forEach((track) => {
        // going all albums of the track
        track.albums.forEach((album) => {
          // checking name from parameter is equal to album name in track
          // and pushing it to collection if not present
          if (Object.keys(album)[0] === name && !tracks.includes(track.id)) {
            tracks.push(track.id);
          }
        });
      });
    } catch (err) {
      console.error(err);
    }

    return tracks.filter((track) => track && track !== null);
  };
  /**
   * getting information about - musician relations on track of certain album
   * @param {string} trackName - track name
   * @param {string} albumName - album name
   */
  getRelationsInfo = (trackName, albumName) => {
    let data = this.getMusicianInstrumentRel(trackName, albumName);
    let musNotFilter = data.map((relation) => Object.keys(relation)[0]);
    let instNotFilter = data.map((relation) => Object.values(relation)[0]);
    // storing musician and instruments
    let musicians = [...new Set(musNotFilter)];
    let instruments = [...new Set(instNotFilter)];

    return { musicians: musicians.length, instruments: instruments.length };
  };
  /**
   * getting all instrument - musician relations on track of certain album
   * @param {string} trackName - track name
   * @param {string} albumName - album name
   */
  getMusicianInstrumentRel = (trackName, albumName) => {
    // finding track with trackName
    var relations = trackRepository
      .getAll()
      .filter((track) => track.id === trackName);
    // checking track exists and albums of track exist
    if (!relations || !relations[0] || !relations[0].albums) {
      return [];
    }
    // loop over all albums of the track and find album with albumName
    relations = relations[0].albums.filter((album) => {
      return Object.keys(album)[0] === albumName;
    });

    if (!relations || !relations[0]) {
      return [];
    }
    var convertedRel = relations[0];
    return Object.entries(convertedRel)[0][1];
  };
  /**
   * getting all tracks containing in their's names
   * the search query
   * @param {String} query - search query
   */
  getContaining = (query) => {
    if (query === "") return [];
    return trackRepository
      .getAll()
      .filter((track) => track && track !== null && track.id.includes(query));
  };
}

export const trackService = new TrackService();

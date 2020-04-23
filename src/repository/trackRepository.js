import store from '../store';

/**
 * @author Pavlo Rozbytskyi
 * @version 2.1.0 - added getting data from redux 
 * tracks Data Access Object layer provides basic read functionality  
 */
class TrackRepository {
  /**
   * gettig all track objects from the file
   * 
   * track objects have following properties
   * {String} id - track name 
   * {String} albums - albums where the track is in
   */
  constructor () { 
    this.allTracks = [];
    store.subscribe(() => {
      let tracks = store.getState().fileState.files.tracks;
      this.allTracks = this.getValidated(tracks ? tracks : []);
    });
  }
  getAll = () => {
    return this.allTracks;
  }

  getValidated = tracks => {
    return tracks
      // validate all tracks
      .map(track => { 
        var validated = {};
        // returning null if track not exist or the name is invalid
        if(!track.id || !track || track.id === ""){
          return null; 
        }
        validated.id = track.id;
        // validating albums array
        if(!track.albums){
          validated.albums = [];
        }else{
          var validAlbums = track.albums
            .filter(e => e !== null)
            .map(albums => {
              // validate albums name
              var albumsName = Object.keys(albums)[0];

              if(!albumsName || albumsName === ""){
                return null;
              }
              // validate references
              var newValues = Object.values(albums)[0]
                .filter(ref => {
                  // checking reference - musician to instrument exists
                  if(!ref){
                    return false;
                  }
                  //getting musician and instrument name from the reference
                  var musician = Object.keys(ref)[0];
                  var instrument = ref[musician];
                  if(!musician || !instrument || musician === "" || instrument  === ""){
                    return false;
                  }
                  return true;
                });
              var validatedAlbums = {};
              validatedAlbums[albumsName] = newValues;
              return validatedAlbums;
            })
            .filter(e => e && e !== null);
          validated.albums = validAlbums;
        }
        return validated;
      })
      // filter invalid tracks out
      .filter(track => track && track !== null);
  }
}

export const trackRepository = new TrackRepository();
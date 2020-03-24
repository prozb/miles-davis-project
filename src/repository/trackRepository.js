// var tracks = require('../assets/cream-dataset/tracks.json');
var config = require('../assets/config.json');
var tracks = require(`../assets/${config["dataset_directory"]}/tracks.json`);

/**
 * @author Pavlo Rozbytskyi
 * @version 2.0.0 added data validation
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
    this.allTracks = tracks
      // validate all tracks
      .map(track => { 
        var validated = {};
        // returning null if track not exist or the name is invalid
        if(!track || track.id === ""){
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
    // this.allTracks = tracks.map(element => { 
    //   var obj = {};
    //   obj[0] = element.id;
    //   obj[1] = {
    //     albums: element.albums
    //   }
    //   return obj;
    // });
  }
  getAll = () => {
    return this.allTracks;
  }
}

export const trackRepository = new TrackRepository();
import {validURL} from '../scripts/helpers';

var config = require('../assets/config.json');
var albums = require(`../assets/${config["dataset_directory"]}/albums.json`);
/**
 * @author Pavlo Rozbytskyi
 * @version 2.0.0
 * album Data Access Object layer provides basic read functionality  
 */
class AlbumRepository {
  /**
   * getting and validating all albums from the file
   * 
   * album objects have following properties
   * {String} id - albums name 
   * {String} url - url to e.g. wikipedia or another website
   * {String} icon - url to musicians picture, which should be displayed
   * {String} label - label which published the album
   * {String} released - release date
   * {Array} recorded - array with the recording dates
   * {Array} studios - studios, where the album is recorded
   * {Array} producers - producers of the album
   * {Array} musicians - musicians played on the album
   */
  constructor() {
    this.allAlbums = albums
      .map(album => {
        // validating data from the file
        var validated = {};
        // skip the album if name inconsistent
        if(!album || album.id === ""){
          return null;
        }
        validated.id = album.id;
        // checking valid url
        if(validURL(album.url)){
          validated.url = album.url;
        }else{
          validated.url = "";
        }
        // checking valid icon url
        if(validURL(album.icon)){
          validated.icon = album.icon;
        }else{
          validated.icon = "";
        }
        // check label
        if(!album.label){
          validated.label = "";
        }
        validated.label = album.label;
        // checking release date
        if(album.released === null){
          validated.released = "";
        }else{
          validated.released = album.released;
        }
        // checking record dates array
        if(album.recorded === null){
          validated.recorded = [];
        }else{
          validated.recorded = album.recorded.filter(e => e !== null); 
        }
        // checking studios array
        if(album.studios === null){
          validated.studios = [];
        }else{
          validated.studios = album.studios.filter(e => e !== null); 
        }
        // checking producers array
        if(album.producers === null){
          validated.producers = [];
        }else{
          validated.producers = album.producers.filter(e => e !== null); 
        }
        // checking musicians array
        if(album.musicians === null){
          validated.musicians = [];
        }else{
          validated.musicians = album.musicians.filter(e => e !== null); 
        }

        return validated;
      })
      .filter(album => album !== null); //filtering inconsistent objects out
    // this.allAlbums = albums.map(elem => {
    //   var obj = {};
    //   obj[0] = elem.id;
    //   obj[1] = {
    //     url: elem.url,
    //     icon: elem.icon,
    //     label: elem.label,
    //     released: elem.released,
    //     recorded: elem.recorded,
    //     studios: elem.studios,
    //     producers: elem.producers,
    //     musicians: elem.musicians,
    //   };
    //   return obj;
    // });
  }
  /**
   * getting all albums
   */
  getAll = () => {
    return this.allAlbums;
  }
}

export const albumRepository = new AlbumRepository();
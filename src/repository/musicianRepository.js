import {validURL} from '../scripts/helpers';
import store from '../store';

/**
 * @author Pavlo Rozbytskyi
 * @version 2.1.0 - added getting data from redux 
 * musicians Data Access Object layer provides basic read functionality  
 */
class MusicianRepository {
  /**
   * gettig all musician objects from the file
   * 
   * musician objects have following properties
   * {String} id - Musicians name 
   * {String} url - url to e.g. wikipedia or another website
   * {String} icon - url to musicians picture, which should be displayed
   * {Array} albums - albums names where this musician played 
   * {Array} instruments - instruments names which this musician played on
   * {String} birthdate - birthdate of the musician 
   * {String} deathdate - deathdate of the musician
   */
  constructor() {
    this.allMusicians = [];
    store.subscribe(() => {
      let musicians = store.getState().fileState.files.musicians;
      this.allMusicians = this.getValidated(musicians ? musicians : []);
    });
  }
  getAll = () => {
    return this.allMusicians;
  }

  getValidated = musicians => {
    return musicians.map(element => {
      var musician = {};

      // checking correct musician name, if not the object is broken
      if(!element || element.id === "" || !element.id){
        return null; 
      }
      musician.id = element.id;

      // checking valid url
      if(element.url && validURL(element.url)){
        musician.url = element.url;
      }else{
        musician.url = "";
      }
      
      // checking valid icon url
      if(element.icon && validURL(element.icon)){
        musician.icon = element.icon;
      }else{
        musician.icon = "";
      }
      // checking albums 
      if(!element.albums || element.albums === null){
        musician.albums = [];
      }else{
        musician.albums = element.albums.filter(e => e !== null && e !== "");;
      }
      // checking instruments
      if(!element.instruments || element.instruments === null){
        musician.instruments = [];
      }else{
        musician.instruments = element.instruments.filter(e => e !== null && e !== "");;
      }
      // checking birthdate
      if(!element.birthdate || element.birthdate === null){
        musician.birthdate = "";
      }else{
        musician.birthdate = element.birthdate;
      }
      // checking deathdate
      if(!element.deathdate || element.deathdate === null){
        musician.deathdate = "";
      }else{
        musician.deathdate = element.deathdate;
      }
      
      return musician;
    });
    // filter out all inconsistent musicians
    this.allMusicians.filter(e => e !== null && e !== "");
  }
}

export const musicianRepository = new MusicianRepository()
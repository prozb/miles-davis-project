import {validURL} from '../scripts/helpers';

var config = require('../assets/config.json');
var musicians = require(`../assets/${config["dataset_directory"]}/musicians.json`);
/**
 * @author Pavlo Rozbytskyi
 * musicians Data Access Object layer provides basic read functionality  
 */
class MusicianRepository {
  // getting all musicians
  /**
   * Musicians objects have following properties
   * {String} id - Musicians name 
   * {String} url - url to e.g. wikipedia or another website
   * {String} icon - url to musicians picture, which should be displayed
   * {Array} albums - albums names where this musician played 
   * {Array} instruments - instruments names which this musician played on
   * {String} birthdate - birthdate of the musician 
   * {String} deathdate - deathdate of the musician
   */
  constructor() {
    this.allMusicians = musicians.map(element => {
      // checking correct musician name, if not the object is broken
      var musician = {};

      if(element.id === ""){
        return null; 
      }
      musician.id = element.id;

      // checking valid url
      if(validURL(element.url)){
        musician.url = element.url;
      }else{
        musician.url = "";
      }
      
      // checking valid icon url
      if(validURL(element.icon)){
        musician.icon = element.icon;
      }else{
        musician.icon = "";
      }
      // checking albums 
      if(element.albums === null){
        musician.albums = [];
      }else{
        musician.albums = element.albums;
      }
      // checking instruments
      if(element.instruments === null){
        musician.instruments = [];
      }else{
        musician.instruments = element.instruments;
      }
      // checking birthdate
      if(element.birthdate === null){
        musician.birthdate = "";
      }else{
        musician.birthdate = element.birthdate;
      }
      // checking deathdate
      if(element.deathdate === null){
        musician.deathdate = "";
      }else{
        musician.deathdate = element.deathdate;
      }
      
      return musician;
    });
    // filter out all inconsistent musicians
    this.allMusicians.filter(musician => musician !== null);
  }
  getAll = () => {
    return this.allMusicians;
  }
}

export const musicianRepository = new MusicianRepository()
import {validURL} from '../scripts/helpers';

var config = require('../assets/config.json');
var instruments = require(`../assets/${config["dataset_directory"]}/instruments.json`);
/**
 * @author Pavlo Rozbytskyi
 * @version 2.0.0 - added data validation 
 * instruments repository layer provides basic read functionality  
 */
class InstrumentRepository {
    /**
     * gettig all instrument objects from the file
     * 
     * instrument objects have following properties
     * {String} id - instruments name 
     * {String} url - link to the image
     * {Array} musicians - musicians played on the instrument
     */
    constructor () {
      this.allInstruments = instruments
      // validation all instruments data
        .map(instrument => {
          var validated = {};
          // returning null if instrument not exist or name is invalid
          if(!instrument.id || !instrument || instrument.id === ""){
            return null; 
          }
          validated.id = instrument.id;
          // validating url of the image
          if(!instrument.url || !validURL(instrument.url)){
            validated.url = "";
          }else{
            validated.url = instrument.url;
          }
          // validating musicians played on this instrument
          if(!instrument.musicians){
            validated.musicians = [];
          }else{
            // filter out all invalid musicians
            validated.musicians = instrument.musicians
              .filter(e => e !== null && e !== "");
          }
          //retur validated instrument
          return validated;
        })
        // filtering invalid instruments out
        .filter(instrument => instrument !== null); 
    }
    /**
    * getting all musicians
    **/ 
    getAll = () => {
      return this.allInstruments;

      // return instruments.map(elem => {
      //   var obj = {};
      //   obj[0] = elem.id;
      //   obj[1] = {
      //     musicians: elem.musicians,
      //     url: elem.url
      //   };
      //   return obj;
      // });
    }
}

export const instrumentRepository = new InstrumentRepository();
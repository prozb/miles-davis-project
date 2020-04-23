import {validURL} from '../scripts/helpers';
import store from '../store';

/**
 * @author Pavlo Rozbytskyi
 * @version 2.1.0 - added data validation 
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
      this.allInstruments = [];

      store.subscribe(() => {
        let instruments = store.getState().fileState.files.instruments;
        this.allInstruments = this.getValidated(instruments ? instruments : []);
      });
    }
    /**
    * getting all musicians
    **/ 
    getAll = () => {
      return this.allInstruments;
    }

    getValidated = (instruments) => {
      return instruments
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
}

export const instrumentRepository = new InstrumentRepository();
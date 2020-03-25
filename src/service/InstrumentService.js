import { instrumentRepository } from '../repository';
import { musicianService } from '../service'; 
/**
 * @author Pavlo Rozbytskyi
 * @version 2.0.0 
 * instrument service layer extends basic functionality from instrument dao
 */
class InstrumentService{
  /**
   * getting all instruments containing in their's names 
   * the search query
   * @param {String} query - search query
   */
  getContaining = (query) => {
    if(query === '')
      return [];
    return instrumentRepository
      .getAll()
      .filter(instrument => instrument && instrument !== null && 
        instrument.id.includes(query));
  }
/**
 * getting instrument by name or null of it don't exist
 * @param {String} name - instrument name
 */
  getByName = (name) => {
    var filtered = instrumentRepository.getAll().filter(instrument => instrument.id === name);
    return filtered.length > 0 ? filtered[0] : null;
  }
  /**
   * getting all musicians played on the instrument
   * @param {string} name - name of the instrument
   */
  getMusiciansOfInstrument = (name) => {
    // var instrument = this.getByName(name);
    // return instrument[1].musicians;
    var instrument = this.getByName(name);
    if(!instrument){
      return [];
    }
    var musicians = instrument.musicians
      .map(mus => musicianService.getByName(mus))
      .filter(e => e && e !== null);
    return musicians;
  } 
}

export const instrumentService = new InstrumentService();
import { instrumentRepository } from '../repository';
import { musicianService } from '../service'; 
/**
 * @author Pavlo Rozbytskyi
 * instrument service layer extends basic functionality from instrument dao
 */
class InstrumentService{
  getAllContainingSubstring = (query) => {
    if(query === '')
      return [];
    return instrumentRepository.getAll().filter(instrument => instrument[0].includes(query));
  }
  getByName = (name) => {
    return instrumentRepository.getAll().filter(instrument => instrument[0] === name)[0];
  }
  /**
   * getting all musicians played on the instrument
   * @param {string} name - name of the instrument
   */
  getMusiciansNamesOfInstrument = (name) => {
    try{
      return this.getByName(name)[1].musicians
        .map(mus => { 
          try{
            return musicianService.getByName(mus);
          }catch(err){
            console.log(err);
            console.log(mus);
          }
        }
      );
    }catch(err){
      console.error(`instrument name: ${name}`)
      console.error(this.getByName(name));

      return [];
    }
  } 
}

export const instrumentService = new InstrumentService();
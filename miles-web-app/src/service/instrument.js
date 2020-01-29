import { instrumentDAO } from '../controller';
import { musicianService } from '../service'; 
/**
 * @author Pavlo Rozbytskyi
 * instrument service layer extends basic functionality from instrument dao
 */
class InstrumentService {
  getByName = (name) => {
    return instrumentDAO.getAll().filter(instrument => instrument[0] === name)[0];
  }
  /**
   * getting all musicians played on the instrument
   * @param {string} name - name of the instrument
   */
  getMusiciansOfInstrument = (name) => {
    try{
      return this.getByName(name)[1].musicians
        .map(mus => { 
          try{
            return musicianService.getMusicinaByName(mus);
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
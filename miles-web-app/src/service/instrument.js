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
    return this.getByName(name)[1].musicians
      .map(mus => musicianService.getMusicinaByName(mus));
  } 
}

export const instrumentService = new InstrumentService();
import { instrumentDAO } from '../controller';
/**
 * @author Pavlo Rozbytskyi
 * instrument service layer extends basic functionality from instrument dao
 */
class InstrumentService {
  getByName = (name) => {
    return instrumentDAO.getAll().filter(instrument => instrument[0] === name)[0];
  }
}

export const instrumentService = new InstrumentService();
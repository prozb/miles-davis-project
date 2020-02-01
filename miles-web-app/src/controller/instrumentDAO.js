var instruments = require('../assets/instruments-cream.json');
/**
 * @author Pavlo Rozbytskyi
 * instruments Data Access Object layer provides basic read functionality  
 */
class InstrumentDAO {
    // getting all musicians
    getAll = () => {
      return Object.entries(instruments);
    }
}

export const instrumentDAO = new InstrumentDAO();
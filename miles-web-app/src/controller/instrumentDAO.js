var instruments = require('../assets/instruments.json');
/**
 * @author Pavlo Rozbytskyi
 * instruments Data Access Object layer provides basic read functionality  
 */
class InstrumentDAO {
    // getting all musicians
    getAll = () => {
      return instruments.map(elem => {
        var obj = {};
        obj[0] = elem.id;
        obj[1] = {
          musicians: elem.musicians,
          url: elem.url
        };
        return obj;
      });
    }
}

export const instrumentDAO = new InstrumentDAO();
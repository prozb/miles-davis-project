var config = require('../assets/config.json');
var instruments = require(`../assets/${config["dataset_directory"]}/instruments.json`);
/**
 * @author Pavlo Rozbytskyi
 * instruments repository layer provides basic read functionality  
 */
class InstrumentRepository {
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

export const instrumentRepository = new InstrumentRepository();
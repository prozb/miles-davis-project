var config = require('../assets/config.json');
var musicians = require(`../assets/${config["dataset_directory"]}/musicians.json`);
/**
 * @author Pavlo Rozbytskyi
 * musicians Data Access Object layer provides basic read functionality  
 */
class MusicianRepository {
  // getting all musicians
  constructor() {
    this.allMusicians = musicians.map(element => {
      var obj = {};
      obj[0] = element.id;
      obj[1] = {
        url: element.url,
        icon: element.icon,
        albums: element.albums,
        instruments: element.instruments,
        birthdate: element.birthdate,
        deathdate: element.deathdate,
      }
      return obj;
    });
  }
  getAll = () => {
    return this.allMusicians;
  }
}

export const musicianRepository = new MusicianRepository()
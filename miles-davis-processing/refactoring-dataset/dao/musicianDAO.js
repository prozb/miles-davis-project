var musicians = require('../assets/musicians.json');
/**
 * @author Pavlo Rozbytskyi
 * musicians Data Access Object layer provides basic read functionality  
 */
class MusicianDAO {
  // getting all musicians
  getAll = () => {
    return Object.entries(musicians);
  }
}

export const musicianDAO = new MusicianDAO()
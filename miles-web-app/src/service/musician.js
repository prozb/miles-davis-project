import { musicianDAO } from '../controller';
/**
 * @author Pavlo Rozbytskyi
 * musician service layer extends basic functionality from musician dao
 */
class MusicianService {
  getMusicinaByName = (name) => {
    return musicianDAO.getAll().filter(musician => musician[0] === name)[0];
  }
}

export const musicianService = new MusicianService(); 

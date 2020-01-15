import { musicianDAO } from '../controller';
import { albumService } from '../service';
/**
 * @author Pavlo Rozbytskyi
 * musician service layer extends basic functionality from musician dao
 */
class MusicianService {
  getMusicinaByName = (name) => {
    return musicianDAO.getAll().filter(musician => musician[0] === name)[0];
  }
  /**
   * getting all instruments played by musician
   * @param {name} name - musicians name
   */
  getInstrumentsOfMusician = (name) => {
    return musicianDAO.getAll().filter(musician => musician[0] === name)[0][1].instruments;
  }
  /**
   * getting all albums on which played musician
   * @param {name} name - musicians name
   */
  getAlbumsOfMusician = (name) => {
    return musicianDAO.getAll().filter(musician => musician[0] === name)[0][1].albums;
  }
  /**
   * getting all album objects of musician
   * @param {string} name - musician name
   */
  getAlbumObjectsOfMusician = (name) => {
    var albums = this.getAlbumsOfMusician(name);
    return albums.map(alb => albumService.getAlbumByName(alb));
  }
}

export const musicianService = new MusicianService(); 

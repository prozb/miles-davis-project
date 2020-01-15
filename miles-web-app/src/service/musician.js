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
    var albums = [];
    try{
      albums = musicianDAO.getAll().filter(musician => musician[0] === name)[0][1].albums;
    }catch(err){
      console.log(err);
    }
    return albums;
  }
  /**
   * getting all album objects of musician
   * @param {string} name - musician name
   */
  getAlbumObjectsOfMusician = (name) => {
    var albObjects = [];
    try{
      var albums = this.getAlbumsOfMusician(name);
      albObjects = albums.map(alb => albumService.getAlbumByName(alb));
    }catch(err){
      console.log(err);
    }
    return albObjects;
  }
}

export const musicianService = new MusicianService(); 

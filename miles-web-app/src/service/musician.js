import { musicianRepository } from '../repository';
import { albumService } from '../service';
/**
 * @author Pavlo Rozbytskyi
 * musician service layer extends basic functionality from musician dao
 */
class MusicianService {
  getByName = (name) => {
    console.log(musicianRepository.getAll());

    try{
      return musicianRepository.getAll().filter(musician => musician[0] === name)[0];
    }catch(err){
      console.error(err);
      return {};
    }
  }
  /**
   * getting all instruments played by musician
   * @param {name} name - musicians name
   */
  getInstrumentsNamesOfMusician = (name) => {
    try{
      return musicianRepository.getAll().filter(musician => musician[0] === name)[0][1].instruments;
    }catch(err){
      console.error(err);
      return [];
    }
  }
  /**
   * getting all albums on which played musician
   * @param {name} name - musicians name
   */
  getAlbumsNamesOfMusician = (name) => {
    var albums = [];
    try{
      albums = musicianRepository.getAll().filter(musician => musician[0] === name)[0][1].albums;
    }catch(err){
      console.log(err);
    }
    return albums;
  }
  /**
   * getting all album objects of musician
   * @param {string} name - musician name
   */
  getAlbumsOfMusician = (name) => {
    var albObjects = [];
    try{
      var albums = this.getAlbumsNamesOfMusician(name);
      albObjects = albums.map(alb => albumService.getByName(alb));
    }catch(err){
      console.log(err);
    }
    return albObjects;
  }

  getAllContainingSubstring = (query) => {
    return musicianRepository.getAll().filter(musician => musician[0].includes(query));
  }
}

export const musicianService = new MusicianService(); 

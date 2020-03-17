import { albumRepository } from '../repository';
import { musicianService } from '.';
/**
 * @author Pavlo Rozbytskyi
 * album service layer extends basic functionality from album dao
 */
class AlbumService {
  /**
   * getting first album
   */
  getFirstAlbum = () => {
    return albumRepository.getAll()[0];
  }

  getByName = (name) => {
    return albumRepository.getAll().filter(album => album[0] === name)[0];
  }

  /**
   * getting all musicians of current album to component state
   * @param album - current album
   */
  getMusiciansOfAlbum = (album) => {
    var musicians = [];
    //interrupt function if album is null
    if(!album){
      return musicians;
    }
    album[1].musicians.forEach(mus => {
      var musicianObject = musicianService.getByName(mus);
      musicians.push(musicianObject);
    });
    // filter null musicians out
    musicians.filter(elem => elem !== null);
    return musicians;
  }

  getAllContainingSubstring = (query) => {
    if(query === '')
      return [];
    return albumRepository.getAll().filter(album => album[0].includes(query));
  }

  getAll = () => {
    return albumRepository.getAll();
  }
}

export const albumService = new AlbumService();
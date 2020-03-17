import { albumRepository } from '../repository';
import { musicianService } from '.';
/**
 * @author Pavlo Rozbytskyi
 * album service layer extends basic functionality from album repository
 */
class AlbumService {
  /**
   * getting first album or null if there aren't any albums in the file
   */
  getFirstAlbum = () => {
    var albums = albumRepository.getAll();
    return albums.length > 0 ? albums[0] : null;
  }

  /**
   * getting album by name or null of it don't exist
   * @param {String} name - album name
   */
  getByName = (name) => {
    var albums = albumRepository.getAll().filter(album => album.id === name);
    return albums.length > 0 ? albums[0] : null;
  }

  /**
   * getting all musicians of current album
   * @param album - current album
   */
  getMusiciansOfAlbum = (album) => {
    var musicians = [];
    //interrupt function if album is null
    if(!album){
      return musicians;
    }
    album.musicians.forEach(mus => {
      // var musicianObject = musicianService.getByName(mus);
      musicians.push(
        musicianService.getByName(mus)
      );
    });
    // filter null musicians out
    musicians.filter(elem => elem !== null);
    return musicians;
  }

  /**
   * getting all albums containing in their's names 
   * the search query
   * @param {String} query - search query
   */
  getAllContainingSubstring = (query) => {
    if(query === '')
      return [];
    return albumRepository
      .getAll()
      .filter(album => album.id.includes(query));
  }
  /**
   * getting all albums from the repository
   */
  getAll = () => albumRepository.getAll();
}

export const albumService = new AlbumService();
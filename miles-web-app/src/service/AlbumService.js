import { albumRepository } from '../repository';
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

  getAllContainingSubstring = (query) => {
    return albumRepository.getAll().filter(album => album[0].includes(query));
  }

  getAll = () => {
    return albumRepository.getAll();
  }
}

export const albumService = new AlbumService();
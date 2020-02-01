import { albumDAO } from '../controller';
/**
 * @author Pavlo Rozbytskyi
 * album service layer extends basic functionality from album dao
 */
class AlbumService {
  /**
   * getting first album
   */
  getFirstAlbum = () => {
    return albumDAO.getAll()[0];
  }

  getAlbumByName = (name) => {
    return albumDAO.getAll().filter(album => album[0] === name)[0];
  }

  getAllContainingSubstring = (query) => {
    return albumDAO.getAll().filter(album => album[0].includes(query));
  }

  getAll = () => {
    return albumDAO.getAll();
  }
}

export const albumService = new AlbumService();
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
}

export const albumService = new AlbumService();
import { albumDAO } from '../controller';
/**
 * @author Pavlo Rozbytskyi
 * album service layer extends basic functionality from album dao
 */
class AlbumService {
  getFirstAlbum = () => {
    return albumDAO.getAll()[0];
  }
}

export const albumService = new AlbumService();
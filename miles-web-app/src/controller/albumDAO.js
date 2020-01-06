var albums = require('../assets/albums.json');
/**
 * @author Pavlo Rozbytskyi
 * album Data Access Object layer provides basic read functionality  
 */
class AlbumDAO {
  constructor() {
    this.allAlbums = Object.entries(albums);
  }
  // reading all albums
  getAll = () => {
    return this.allAlbums;
  }
}

export const albumDAO = new AlbumDAO()
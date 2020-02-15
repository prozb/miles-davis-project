var albums = require('../assets/albums.json');
/**
 * @author Pavlo Rozbytskyi
 * album Data Access Object layer provides basic read functionality  
 */
class AlbumDAO {
  constructor() {
    this.allAlbums = albums.map(elem => {
      var obj = {};
      obj[0] = elem.id;
      obj[1] = {
        url: elem.url,
        icon: elem.icon,
        label: elem.label,
        released: elem.released,
        recorded: elem.recorded,
        studios: elem.studios,
        producers: elem.producers,
        musicians: elem.musicians,
      };
      return obj;
    });
  }
  // reading all albums
  getAll = () => {
    return this.allAlbums;
  }
}

export const albumDAO = new AlbumDAO()
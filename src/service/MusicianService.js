import { musicianRepository } from "../repository";
import { albumService } from ".";
/**
 * @author Pavlo Rozbytskyi
 * musician service layer extends basic functionality from musician dao
 */
class MusicianService {
  /**
   * getting musicians object by name
   * returning null if object not found or error happened
   * @param {String} name - musicians name
   */
  getByName = (name) => {
    try {
      var musician = {};

      // filtering all musicians by name and getting
      // first of filtered
      var found = musicianRepository
        .getAll()
        .filter((musician) => musician.id === name);
      // if not found return null
      if (found.length > 0) {
        return found[0];
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  /**
   * getting all instruments played by musician
   * @param {name} name - musicians name
   */
  getInstrumentsNamesOfMusician = (name) => {
    var musician = this.getByName(name);

    if (musician === null) {
      return [];
    }
    return musician.instruments.filter((e) => e && e !== null);
  };
  /**
   * getting all albums on which played musician
   * @param {name} name - musicians name
   */
  getAlbumsNamesOfMusician = (name) => {
    var musician = this.getByName(name);

    if (musician === null) {
      return [];
    }
    return musician.albums.filter((e) => e && e !== null);
  };
  /**
   * getting all album objects of musician
   * @param {string} name - musician name
   */
  getAlbumsOfMusician = (name) => {
    var albObjects = [];
    try {
      var albums = this.getAlbumsNamesOfMusician(name);
      albObjects = albums
        .map((alb) => albumService.getByName(alb))
        .filter((alb) => alb && alb !== null);
    } catch (err) {
      console.log(err);
    }
    return albObjects;
  };
  /**
   * getting all musicians containing in their's names
   * search query
   * @param {String} query - search query
   */
  getContaining = (query) => {
    if (query === "") return [];
    var found = musicianRepository
      .getAll()
      .filter(
        (musician) =>
          musician && musician !== null && musician.id.includes(query)
      );

    return found;
  };
}

export const musicianService = new MusicianService();

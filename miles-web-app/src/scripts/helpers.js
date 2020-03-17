import {pixelsPerYear} from './constants';

// extracting release date from album
export const getReleaseDateFromAlbum = (album) => {
    if(album){
			return album.released;
    }
    return '';
}

/**
 * checking valid url
 * @param {String} url 
 */
export const validURL = url => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(url);
}
// converting timestamp to years 
export const convertTimestampToYears = (timestamp) => {
    if(timestamp)
        return Math.abs(timestamp / (1000 * 60 * 60 * 24 * 365)); 
    return 0;
}
// extracting release date from album
export const getDistanceBetweenAlbums = (album1, album2) => {
    if(album1 && album2){
        var timeStamp = new Date(getReleaseDateFromAlbum(album1)).getTime() - 
            new Date(getReleaseDateFromAlbum(album2)).getTime();
        return convertTimestampToYears(timeStamp) * pixelsPerYear;
    } 
    return 0;
}

export const getIdFromName = (name) => {
    return name.replace(/:/g, '_')
      .replace(/\s/g, '_')
      .replace(/,/g, '')
      .replace(/\//g, '')
      .replace(/'/g, '')
      .replace(/`/g, '_')
      .replace(/-/g, '_')
      .replace(/\./g, '_');
}

export const getReleasedYearFromDate = (date) => {
  return new Date(date).getFullYear();
}

  /**
   * update current albums if change occured
   * @param {Array} prev - previous musicians
   * @param {Array} current - current musicians to render
   * @param {Number} maxIndex - max id of element
   */
export const diffAlbums = (prev, current, maxIndex) => {
  var curr = current.map(mus => mus[0]);
  //getting compound musicians for previous album and new album
  var compound = prev.filter(mus => curr.includes(mus.data.label));
  // don't perform anything if no data changed
  if(compound.length === prev.length)
    return;
  var coumpoundMaped = compound.map(mus => mus.data.label);
  var newData = curr.filter(mus => !coumpoundMaped.includes(mus));
  var newDataMaped = newData.map(name => {
    return {data: {id: ++maxIndex, label: name}}
  });
  var elements = [...compound, ...newDataMaped];
  return {maxIndex: maxIndex, elements: elements};
}
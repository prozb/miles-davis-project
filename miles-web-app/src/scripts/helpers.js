import {pixelsPerYear} from './constants';
import {instrumentService, musicianService} from '../service'

// extracting release date from album
export const getReleaseDateFromAlbum = (album) => {
    if(album){
			return album[1].released;
    }
    return '';
    
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

  /**
   * converting musicians and tracks to data format readable by 
   * cytoscape
   * @param {Array} tracks tracks to display on graph
   * @param {Array} musicians musicians to display on graph
   * @param {Object} album data for this album
   */
  export const getCytoElementsMusicianTrackAlbum = (tracks, musicians, album) => {
    var index = 0;
    // converting albums, tracks and musicians to format: {data: {id: \d, label: .+, icon}}
    var convAlbum = { data: {id: index++, type: 'album', label: album[0], icon: album[1].icon === '' ? 'none' : album[1].icon} };
    var convTracks = tracks.flatMap(track => {
        var node = { data: {id: index, type: 'track', label: track[0], icon: track[1].icon === '' ? 'none' : track[1].icon} };
        var edge = { data: { source: 0, type: 'track', target: index++, label: 'plays on' } };
        // returning track node and edge from this node to album node
        return [node, edge];
    });
    var convMus = musicians.flatMap(musician => {
        var node = { data: {id: index, type: 'musician', label: musician[0], icon: musician[1].icon === '' ? 'none' : musician[1].icon}}
        var edge = { data: { source: index++, type: 'musician', target: 0, label: 'plays on' } };
        // returning musician node and edge from this node to album node
        return [node, edge];
    });
    // returning array containing all elements of album
    return [convAlbum, ...convTracks, ...convMus]; 
  } 

  /**
   * converting musicians - instrument relations to data format readable by 
   * cytoscape
   * @param {Array} tracks tracks to display on graph
   * @param {Array} musicians musicians to display on graph
   * @param {Object} album data for this album
   */
  export const getCytoElementsMusicianInstrument = (relations) => {
    var index = 0;
    console.log(relations);
    // converting albums, tracks and musicians to format: {data: {id: \d, label: .+, icon}}
    // var converted = relations.map(rel => {
    //     var node = { data: {id: index, type: 'track', label: track[0], icon: track[1].icon === '' ? 'none' : track[1].icon} };
    //     var edge = { data: { source: 0, type: 'track', target: index++, label: 'plays on' } };
    //     // returning track node and edge from this node to album node
    //     return {};
    // });
    // var convMus = musicians.flatMap(musician => {
    //     var node = { data: {id: index, type: 'musician', label: musician[0], icon: musician[1].icon === '' ? 'none' : musician[1].icon}}
    //     var edge = { data: { source: index++, type: 'musician', target: 0, label: 'plays on' } };
    //     // returning musician node and edge from this node to album node
    //     return [node, edge];
    // });
    // // returning array containing all elements of album
    // return [convAlbum, ...convTracks, ...convMus]; 
    return [];
  } 
  /**
   * making array of relations type {string} musician - {string} instrument 
   * to {object} musician - {object} instrument
   * @param {Array} relations - musician - instrument relations
   */
  export const getObjectsToMusicianInstrumentRelation = (relations) => {
    var converted = relations.map(rel => {
      var newRel = {};
      newRel[0] = musicianService.getMusicinaByName(Object.entries(rel)[0][0]);
      newRel[1] = instrumentService.getByName(Object.entries(rel)[0][1]);
      return newRel;
    });
    return converted;
  }
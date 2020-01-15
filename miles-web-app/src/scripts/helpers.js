import {pixelsPerYear} from './constants';
import {instrumentService, musicianService, albumService} from '../service'

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
   * converting instruments and musicians to data format readable by 
   * cytoscape
   * @param {string} instrumentName name of instrument to be displayed
   */
  export const getCytoElementsInstrumentMusician = (name) => {
    var index = 0;  

    var instrument = instrumentService.getByName(name);
    var musicians  = instrumentService.getMusiciansOfInstrument(name);
    // converting albums, tracks and musicians to format: {data: {id: \d, label: .+, icon}}
    var convInstr = { data: {id: index, type: 'instrument', label: instrument[0], icon: instrument[1].url === '' ? 'none' : instrument[1].url} };
    var convMusic = musicians.flatMap(mus => {
      var indexCp = index + 1;
      var node = { data: {id: indexCp, type: 'musician', label: mus[0], icon: mus[1].icon === '' ? 'none' : mus[1].icon} };
      var edge = { data: { source: 0, type: 'musician', target: indexCp} };
      index++;
      // returning track node and edge from this node to album node
      return [node, edge];
    });
    // returning array containing all elements of album
    return [convInstr, ...convMusic]; 
  } 

  /**
   * converting elements to data format readable by 
   * cytoscape
   * @param {Array} elements name of instrument to be displayed
   */
  export const getSpecialCaseElements = (elements) => {
    var index0 = 0;  
    var index1 = 0;
    var compound = [];
    var musicianElems = [];
    var elems = elements.reduce((compound, elem, index) => {
      // getting all albums of musician node
      var albums = musicianService.getAlbumObjectsOfMusician(elem.data().label);
      musicianElems.push({ 
        data: {
        id: index0++, 
        type: "album", 
        label: elem.data().label, 
        icon: elem.data().icon === '' ? 'none' : elem.data().icon
      }});
      if(index === 0){
       return albums;
      }else{
        // getting all names of albums
        var mapped = albums.map(elem => elem[0]);
        // getting compound elements of previous node and current
        var compoundNew = compound.filter(elem => mapped.includes(elem[0]));
        return compoundNew;
      }
    });
    index1 = index0;
    var convElements = elems.map(elem => {
      var convElem = { data: {
        id: index0++, 
        type: "musician", 
        label: elem[0], 
        icon: elem[1].icon === '' ? 'none' : elem[1].icon
      }};
      return convElem;
    });

  var convEdges = [];
    var storedIndex = index1; 
    elems.forEach(elem => {
      for(var i = 0; i < index1; i++){
        convEdges.push({ data: { 
          source: storedIndex, 
          type: 'musician', 
          target: i
        }});
      }
      storedIndex++;
    });
    return [...convElements, ...musicianElems, ...convEdges];
  } 


  /**
   * convertive data for musician perspective to data format readable by 
   * cytoscape
   * @param {string} tracks tracks to display on graph
   */
  export const getCytoElementsMusicianInstrumentAlbum = (musicianName) => {
    var index = 0;
    var musician    = musicianService.getMusicinaByName(musicianName);
    // instruments and albums names
    var instruments = musicianService.getInstrumentsOfMusician(musicianName);
    var albums      = musicianService.getAlbumsOfMusician(musicianName);
    // instruments and albums objects
    var instObjects = instruments.map(instr => instrumentService.getByName(instr));
    var albObjects  = albums.map(alb => albumService.getAlbumByName(alb));
    // converting albums, tracks and musicians to format: {data: {id: \d, label: .+, icon}}
    var convMus   = { data: {id: index++, type: 'musician', label: musician[0], icon: musician[1].icon === '' ? 'none' : musician[1].icon} };
    var convInstr = instObjects.flatMap(instr => {
        var node = { data: {id: index, type: 'instrument', label: instr[0], icon: instr[1].url === '' ? 'none' : instr[1].url} };
        var edge = { data: { source: 0, type: 'instrument', target: index++} };
        // returning instrument node and edge from this node to musician node
        return [node, edge];
    });
    var convAlb = albObjects.flatMap(alb => {
       // console.log(alb);
        var node = { data: {id: index, type: 'album', label: alb[0], icon: alb[1].icon === '' ? 'none' : alb[1].icon}}
        var edge = { data: { source: index++, type: 'musician', target: 0 }};
        // returning musician node and edge from this node to album node
        return [node, edge];
    });
    // // returning array containing all elements of album
    return [convMus, ...convInstr, ...convAlb]; 
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
    var row = 0; 
    // converting albums, tracks and musicians to format: {data: {id: \d, label: .+, icon}}
    var converted = relations.flatMap(rel => {
        var node1 = { data: {
            id: index, 
            type: 'musician', 
            label: rel[0][0], 
            icon: rel[0][1].icon === '' ? 'none' : rel[0][1].icon,
            row: row,
            col: 0,
          }
        };
        index++;
        var node2 = { data: {
            id: index, 
            type: 'instrument', 
            label: rel[1][0], 
            icon: rel[1][1].url === '' ? 'none' : rel[1][1].url,
            row: row++,
            col: 1,
          } 
        };
        index--;
        var edge = { data: { source: index++, target: index} };
        index++;
        // returning track node and edge from this node to album node
        return [node1, node2, edge];
    });
    return converted;
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
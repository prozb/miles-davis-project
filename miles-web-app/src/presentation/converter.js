import {instrumentService, musicianService, albumService} from '../service';
/**
 * @author Pavlo Rozbytskyi
 * @version 1.0.0
 * 
 * converting data from services to objects can be directly
 * displayed by cytoscape instance.
 */

/**
 * convert album to cytoscape element
 * @param {Object} album album object to convert
 * @param {Number} id id of the node
 */
export const getCytoAlbum = (album, id) =>{
  if(id !== undefined){
    return { 
      data: {
        type: "album", 
        label: album.id, 
        icon: album.icon,
        id: id
      }
    }
  }
  return { 
    data: {
      type: "album", 
      label: album.id, 
      icon: album.icon,
    }
  }
}

/**
 * convert musician to cytoscape element
 * @param {Object} musician musician object to convert
 * @param {Number} id id of the node
 */
export const getCytoMusician = (musician, id) =>{
  if(id !== undefined){
    return { 
      data: {
        type: "musician", 
        label: musician.id, 
        icon: musician.icon,
        id: id
      } 
    };
  }
  return { 
    data: {
      type: "musician", 
      label: musician.id, 
      icon: musician.icon,
    } 
  };
}
/**
 * convert instrument to cytoscape element
 * @param {Object} instrument instrument object to convert
 * @param {Number} id id of the node
 */
export const getCytoInstrument = (instrument, id) =>{
  if(id !== undefined){
    return {
      data: {
        type: "instrument", 
        label: instrument.id, 
        icon: instrument.url,
        id: id
      } 
    };
  }
  return {
    data: {
      type: "instrument", 
      label: instrument.id, 
      icon: instrument.url,
    } 
  };
}
/**
 * convert track to cytoscape element
 * @param {Object} track track object to convert
 * @param {Number} id id of the node
 */
export const getCytoTrack = (track, id) =>{
  if(id !== undefined){
    return { 
      data: {
        type: "track", 
        label: track.id, 
        id: id
      }
    };
  }
  return { 
    data: {
      type: "track", 
      label: track.id, 
    }
  };
}
/**
 * ctreating edge between two nodes
 * @param {Object} source source node
 * @param {Object} destination destination node
 */
export const getEdge = (source, destination) => {

}
/**
 * preparing data for the album perspective
 * 
 * connecting musicians and tracks with album
 * @param {Array} tracks tracks to display on graph
 * @param {Array} musicians musicians to display on graph
 * @param {Object} album album to display on graph
 */
export const getAlbumPerspective = (tracks, musicians, album) => {
  var index = 0;
  try{
    // converting albums, tracks and musicians to format: {data: {id: \d, label: .+, icon}}
    var convAlbum = getCytoAlbum(album, index++);
    var convTracks = tracks.flatMap(track => {
        var node = getCytoTrack(track, index);
        var edge = { data: { source: 0, type: 'track', target: index++, label: 'plays on' } };
        // returning track node and edge from this node to album node
        return [node, edge];
    });
    var convMus = musicians.flatMap(musician => {
        var node = getCytoMusician(musician, index);
        var edge = { data: { source: index++, type: 'musician', target: 0, label: 'plays on' } };
        // returning musician node and edge from this node to album node
        return [node, edge];
    });
    // returning array containing all elements of album
    return [convAlbum, ...convTracks, ...convMus]; 
  }catch(err){
    console.error('error occured in getting album perspective')

    return getCytoAlbum(album);
  }
} 

/**
 * converting instruments and musicians to data format readable by 
 * cytoscape
 * @param {string} instrumentName name of instrument to be displayed
 */
export const getInstrumentPerspective = (name) => {
  var index = 0;  

  try{
    var instrument = instrumentService.getByName(name);
    var musicians  = instrumentService.getMusiciansOfInstrument(name);
    // converting albums, tracks and musicians to format: {data: {id: \d, label: .+, icon}}
    var convInstr = getCytoInstrument(instrument, index);
    var convMusic = musicians.flatMap(mus => {
      var indexCp = index + 1;
      var node = getCytoMusician(mus, indexCp);
      var edge = { data: { source: 0, type: 'musician', target: indexCp} };
      index++;
      // returning track node and edge from this node to album node
      return [node, edge];
    });
    // returning array containing all elements of album
    return [convInstr, ...convMusic]; 
  }catch(err){
    console.error(instrumentService.getByName(name));
    return [];
  }
} 

/**
 * converting elements to data format readable by 
 * cytoscape
 * @param {Array} elements name of instrument to be displayed
 */
export const getCompoundForMusicians = (musNodes) => {
  var index0 = 0;  
  var index1 = 0;

  try{
    var compound = [];
    var musicianElems = [];
    
    var filteredNum = musNodes.filter(elem => elem.data().type === "musician");
    var elems = filteredNum.reduce((compound, elem, index) => {
      // getting all albums of musician node
      var albums = musicianService.getAlbumsOfMusician(elem.data().label);
      musicianElems.push({ 
        data: {
        id: index0++, 
        type: "musician", 
        label: elem.data().label, 
        icon: elem.data().icon === '' ? 'none' : elem.data().icon
      }});
      if(index === 0){
      return albums;
      }else{
        // getting all names of albums
        var mapped = albums.map(elem => elem.id);
        // getting compound elements of previous node and current
        var compoundNew = compound.filter(elem => mapped.includes(elem.id));
        return compoundNew;
      }
    });
    index1 = index0;
    var convElements = elems.map(elem => {
      var convElem = { data: {
        id: index0++, 
        type: "album", 
        label: elem.id, 
        icon: elem.icon === '' ? 'none' : elem.icon
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

  }catch(err){
    console.error(err);
    return [];
  }
} 


/**
 * convertive data for musician perspective to data format readable by 
 * cytoscape
 * @param {string} tracks tracks to display on graph
 */
export const getMusicianPerspective = (musicianName) => {
  var index = 0;

  try{
    var musician    = musicianService.getByName(musicianName);
    // instruments and albums names
    var instruments = musicianService.getInstrumentsNamesOfMusician(musicianName);
    var albums      = musicianService.getAlbumsNamesOfMusician(musicianName);
    // instruments and albums objects
    var instObjects = instruments.map(instr => instrumentService.getByName(instr));
    var albObjects  = albums.map(alb => albumService.getByName(alb));
    // converting albums, tracks and musicians to format: {data: {id: \d, label: .+, icon}}
    var convMus   = { data: {id: index++, type: 'musician', label: musician.id, icon: musician.icon === '' ? 'none' : musician.icon} };
    var convInstr = instObjects.flatMap(instr => {
        var node = { data: {id: index, type: 'instrument', label: instr.id, icon: instr.url === '' ? 'none' : instr.url} };
        var edge = { data: { source: 0, type: 'instrument', target: index++} };
        // returning instrument node and edge from this node to musician node
        return [node, edge];
    });
    var convAlb = albObjects.flatMap(alb => {
      // console.log(alb);
        var node = { data: {id: index, type: 'album', label: alb.id, icon: alb.icon === '' ? 'none' : alb.icon}}
        var edge = { data: { source: index++, type: 'album', target: 0 }};
        // returning musician node and edge from this node to album node
        return [node, edge];
    });
    // // returning array containing all elements of album
    return [convMus, ...convInstr, ...convAlb]; 
  }catch(err){
    console.error(musicianService.getByName(musicianName));
    return [];
  }
} 

/**
 * converting musicians - instrument relations to data format readable by 
 * cytoscape
 * @param {Object} relations musician - instrument relation
 */
export const getTrackPerspective = (relations) => {
  var index = 0;
  var row = 0; 

  try{
    // converting albums, tracks and musicians to format: {data: {id: \d, label: .+, icon}}
    var converted = relations.flatMap(rel => {
        var node1 = { data: {
            id: index, 
            type: 'musician', 
            label: rel[0].id, 
            icon: rel[0].icon === '' ? 'none' : rel[0].icon,
            row: row,
            col: 0,
          }
        };

        index++;
        var node2 = { data: {
            id: index, 
            type: 'instrument', 
            label: rel[1].id, 
            icon: rel[1].url === '' ? 'none' : rel[1].url,
            row: row++,
            col: 1,
          } 
        };
        index--;
        var edge = { data: { type: 'musician', source: index++, target: index} };
        index++;
        // returning track node and edge from this node to album node
        return [node1, node2, edge];
    });
    return converted;
  }catch(err){
    console.error(relations);

    return [];
  }
} 
/**
 * making array of relations type {string} musician - {string} instrument 
 * to {object} musician - {object} instrument
 * @param {Array} relations - musician - instrument relations
 */
export const getObjectsToMusicianInstrumentRelation = (relations) => {
  try{
    var converted = relations.map(rel => {
      var newRel = {};
      newRel[0] = musicianService.getByName(Object.entries(rel)[0][0]);
      newRel[1] = instrumentService.getByName(Object.entries(rel)[0][1]);
      return newRel;
    });
    return converted;
  }catch(err){
    console.error(relations);
    return [];
  }
}
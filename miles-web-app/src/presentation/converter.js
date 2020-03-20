import {instrumentService, musicianService, albumService} from '../service';
import {uuid} from '../scripts/helpers';
/**
 * @author Pavlo Rozbytskyi
 * @version 1.0.0
 * 
 * Presentation layer: converting data from services to objects can be directly
 * displayed by cytoscape instance.
 */

/**
 * convert album to cytoscape element
 * @param {Object} album album object to convert
 */
export const getCytoAlbum = (album) =>{
  return { 
    data: {
      type: "album", 
      label: album.id, 
      icon: album.icon,
      id: uuid()
    }
  }
}

/**
 * convert musician to cytoscape element
 * @param {Object} musician musician object to convert
 */
export const getCytoMusician = (musician) =>{
  return { 
    data: {
      type: "musician", 
      label: musician.id, 
      icon: musician.icon,
      id: uuid()
    } 
  };
}
/**
 * convert instrument to cytoscape element
 * @param {Object} instrument instrument object to convert
 */
export const getCytoInstrument = (instrument) =>{
  return {
    data: {
      type: "instrument", 
      label: instrument.id, 
      icon: instrument.url,
      id: uuid()
    } 
  };
}
/**
 * convert track to cytoscape element
 * @param {Object} track track object to convert
 */
export const getCytoTrack = (track) =>{
  return { 
    data: {
      type: "track", 
      label: track.id, 
      id: uuid()
    }
  };
}
/**
 * ctreating edge between two nodes
 * @param {Object} source source node
 * @param {Object} destination destination node
 */
export const getEdge = (source, destination) => {
  return { 
    data: { 
      source: source.data.id, 
      type: destination.data.type, 
      target: destination.data.id
    } 
  }
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
  try{
    // converting albums, tracks and musicians to format: {data: {id: \d, label: .+, icon}}
    var convAlbum = getCytoAlbum(album);
    var convTracks = tracks.flatMap(track => {
        var convTrack = getCytoTrack(track);
        var edge = getEdge(convAlbum, convTrack);
        // returning track node and edge from this node to album node
        return [convTrack, edge];
    });
    var convMus = musicians.flatMap(musician => {
        var convMusician = getCytoMusician(musician);
        var edge = getEdge(convAlbum, convMusician);
        // returning musician node and edge from this node to album node
        return [convMusician, edge];
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
  try{
    var instrument = instrumentService.getByName(name);
    var musicians  = instrumentService.getMusiciansOfInstrument(name);
    // converting albums, tracks and musicians to format: {data: {id: \d, label: .+, icon}}
    var convInstr = getCytoInstrument(instrument);
    var convMusic = musicians.flatMap(mus => {
      var node = getCytoMusician(mus);
      var edge = getEdge(convInstr, node);
      // returning track node and edge from this node to album node
      return [node, edge];
    });
    // returning array containing all elements of album
    return [convInstr, ...convMusic]; 
  }catch(err){
    console.error('error occured by creation instruments perspective');
    return getCytoInstrument(instrument);
  }
} 

/**
 * converting elements to data format readable by 
 * cytoscape
 * @param {Array} elements name of instrument to be displayed
 */
export const getCompoundForMusicians = (nodes) => {
  // getting collection with selected musicians
  let musicians = nodes
  .filter(mus => mus.data().type === "musician")
  .map(mus => { return {data: mus.data()}} );
  try{
    // following lines find common albums of musicians
    let commonAlbums = musicians
      .reduce((accumulator, musician, index, array) => {
        // getting all albums names of the given musician
        let albums = musicianService.getAlbumsNamesOfMusician(musician.data.label);
        // return all albums on the first iteration 
        if(index === 0){
          return albums;
        }
        // getting compound elements of previous musician and current
        let elems = accumulator.filter(elem => albums.includes(elem));
        return elems;
      }, [])
      // converting albums to cytoscape albums  
      .map(albumName => {
        let album = albumService.getByName(albumName);
        return getCytoAlbum(album);
      });
    // creating edges from all musicians to all albums
    let edges = commonAlbums.flatMap(album => {
      let albumMusicianEdges = musicians.map(musician => getEdge(musician, album));
      return [...albumMusicianEdges];
    });

    return [...musicians, ...commonAlbums, ...edges];

  }catch(err){
    console.error('error occured in creating compound albums for musicians');
    return musicians;
  }
} 


/**
 * convertive data for musician perspective to data format readable by 
 * cytoscape
 * @param {string} tracks tracks to display on graph
 */
export const getMusicianPerspective = (musicianName) => {
  try{
    var musician    = musicianService.getByName(musicianName);
    // instruments and albums names
    var instruments = musicianService.getInstrumentsNamesOfMusician(musicianName);
    var albums      = musicianService.getAlbumsNamesOfMusician(musicianName);
    // instruments and albums objects
    var instObjects = instruments.map(instr => instrumentService.getByName(instr));
    var albObjects  = albums.map(alb => albumService.getByName(alb));
    // converting albums, tracks and musicians to format: {data: {id: \d, label: .+, icon}}
    var convMus   = getCytoMusician(musician);
    var convInstr = instObjects.flatMap(instr => {
        var node = getCytoInstrument(instr);
        var edge = getEdge(convMus, node);
        // returning instrument node and edge from this node to musician node
        return [node, edge];
    });
    var convAlb = albObjects.flatMap(alb => {
        var node = getCytoAlbum(alb);
        var edge = getEdge(convMus, node);
        // returning musician node and edge from this node to album node
        return [node, edge];
    });
    // // returning array containing all elements of album
    return [convMus, ...convInstr, ...convAlb]; 
  }catch(err){
    console.error("error occured in creation musicians perspective");
    return getCytoMusician(musician);
  }
} 

/**
 * converting musicians - instrument relations to data format readable by 
 * cytoscape
 * @param {Object} relations musician - instrument relation
 */
export const getTrackPerspective = (relations) => {
  try{
    // converting albums, tracks and musicians to format: {data: {id: \d, label: .+, icon}}
    var converted = relations.flatMap(relation => {
      let musician   = relation[0];
      let instrument = relation[1];
      // converting data in cytoscape objects
      let musConvert  = getCytoMusician(musician);
      let instConvert = getCytoInstrument(instrument);
      let edge        = getEdge(instConvert, musConvert);
      // returning track node and edge from this node to album node
      return [musConvert, instConvert, edge];
    });
    return converted;
  }catch(err){
    console.error('error occured in creation track perspective');
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
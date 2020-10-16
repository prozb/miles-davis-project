import {
  instrumentService,
  musicianService,
  albumService,
  trackService,
} from "../service";
import { uuid } from "../scripts/helpers";
import React from "react";
import Avatar from "react-avatar";
import {
  MusicianTooltip,
  InstrumentTooltip,
} from "../components/visualizing/tooltip";

import { renderToString } from "react-dom/server";
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
export const getCytoAlbum = (album) => {
  return {
    data: {
      type: "album",
      label: album.id,
      icon: album.icon,
      id: uuid(),
    },
  };
};

/**
 * convert musician to cytoscape element
 * @param {Object} musician musician object to convert
 */
export const getCytoMusician = (musician) => {
  return {
    data: {
      type: "musician",
      label: musician.id,
      icon: musician.icon,
      id: uuid(),
    },
  };
};
/**
 * convert instrument to cytoscape element
 * @param {Object} instrument instrument object to convert
 */
export const getCytoInstrument = (instrument) => {
  return {
    data: {
      type: "instrument",
      label: instrument.id,
      icon: instrument.url,
      id: uuid(),
    },
  };
};
/**
 * convert track to cytoscape element
 * @param {Object} track track object to convert
 */
export const getCytoTrack = (track) => {
  return {
    data: {
      type: "track",
      label: track.id,
      id: uuid(),
    },
  };
};
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
      target: destination.data.id,
    },
  };
};
/**
 * preparing data for the album perspective
 *
 * connecting musicians and tracks with album
 * @param {Object} album album to display on graph
 */
export const getAlbumPerspective = (albumName) => {
  let album = albumService.getByName(albumName);
  let musicians = albumService.getMusiciansOfAlbum(album);
  let tracks = trackService.getAllTracksOfAlbum(album.id);

  try {
    // converting albums, tracks and musicians to format: {data: {id: \d, label: .+, icon}}
    let convAlbum = getCytoAlbum(album);
    let convTracks = tracks.flatMap((track) => {
      let convTrack = getCytoTrack(track);
      let edge = getEdge(convAlbum, convTrack);
      // returning track node and edge from this node to album node
      return [convTrack, edge];
    });
    let convMus = musicians.flatMap((musician) => {
      let convMusician = getCytoMusician(musician);
      let edge = getEdge(convAlbum, convMusician);
      // returning musician node and edge from this node to album node
      return [convMusician, edge];
    });
    // returning array containing all elements of album
    return [convAlbum, ...convTracks, ...convMus];
  } catch (err) {
    console.error("error occured in getting album perspective");
    return getCytoAlbum(album);
  }
};

/**
 * getting content of tracks perspective
 */
export const getTrackPerspective = (trackName, albumName, handler) => {
  const data = trackService.getMusicianInstrumentRel(trackName, albumName);
  const content = data.map((relation, index) => {
    // getting musician's name
    let musicianName = Object.keys(relation)[0];
    // getting instrument's name
    let instrumentName = relation[musicianName];
    // getting musician and instrument by name
    let musician = musicianService.getByName(musicianName);
    let instrument = instrumentService.getByName(instrumentName);
    // creating avatar of musician
    let musicianAvatar = (
      <Avatar
        onClick={() => handler(musicianName)}
        className="my-auto box-avatar-deeper"
        round
        src={musician.icon}
        name={musician.id}
      />
    );
    // creating avatar of the instrument
    let instrumentAvatar = (
      <Avatar
        className="box-avatar my-auto"
        round={false}
        src={instrument.url}
        name={instrument.id}
      />
    );
    return (
      <div className="row" key={index}>
        <div className="c-8 mb-2 mx-auto">
          <div className="mb-2 ml-0">
            <div className="avatar-custom p-1">{musicianAvatar}</div>
          </div>
          <div className="mx-auto">
            <h5>{musician.id}</h5>
          </div>
        </div>
        <div className="c-4 mx-auto">{instrumentAvatar}</div>
      </div>
    );
  });
  return content;
};

/**
 * converting instruments and musicians to data format readable by
 * cytoscape
 * @param {string} instrumentName name of instrument to be displayed
 */
export const getInstrumentPerspective = (name) => {
  let instrument = instrumentService.getByName(name);

  try {
    let musicians = instrumentService.getMusiciansOfInstrument(name);
    // converting albums, tracks and musicians to format: {data: {id: \d, label: .+, icon}}
    let convInstr = getCytoInstrument(instrument);
    let convMusic = musicians.flatMap((mus) => {
      let node = getCytoMusician(mus);
      let edge = getEdge(convInstr, node);
      // returning track node and edge from this node to album node
      return [node, edge];
    });
    // returning array containing all elements of album
    return [convInstr, ...convMusic];
  } catch (err) {
    console.error("error occured by creation instruments perspective");
    return getCytoInstrument(instrument);
  }
};
/**
 * preparing data for the perspective where is displayed
 * on which albums some musicians have played together.
 *
 * @param {Array} nodes selected nodes
 */
export const getCompoundForAlbums = (nodes) => {
  // getting collection with selected albums
  let albums = nodes
    .filter((album) => album.data().type === "album")
    .map((album) => {
      return { data: album.data() };
    });

  console.log(albums);
  try {
    // following lines find common albums of musicians
    let commonMusicians = albums
      .reduce((accumulator, album, index, array) => {
        // getting all albums names of the given musician
        let musicians = albumService.getByName(album.data.label).musicians;
        // return all albums on the first iteration
        if (index === 0) {
          return musicians;
        }
        // getting compound elements of previous musician and current
        return accumulator.filter((elem) => musicians.includes(elem));
      }, [])
      // converting albums to cytoscape albums
      .map((musicianName) => {
        let musician = musicianService.getByName(musicianName);
        return getCytoMusician(musician);
      });
    // creating edges from all musicians to all albums
    let edges = commonMusicians.flatMap((musician) => {
      let albumMusicianEdges = albums.map((album) => getEdge(album, musician));
      return [...albumMusicianEdges];
    });

    return [...albums, ...commonMusicians, ...edges];
  } catch (err) {
    console.error("error occured in creating common musicians for albums");
  }
  return albums;
};
/**
 * preparing data for the perspective where is displayed
 * on which albums some musicians have played together.
 *
 * @param {Array} nodes selected nodes
 */
export const getCompoundForMusicians = (nodes) => {
  // getting collection with selected musicians
  let musicians = nodes
    .filter((mus) => mus.data().type === "musician")
    .map((mus) => {
      return { data: mus.data() };
    });
  try {
    // following lines find common albums of musicians
    let commonAlbums = musicians
      .reduce((accumulator, musician, index, array) => {
        // getting all albums names of the given musician
        let albums = musicianService.getAlbumsNamesOfMusician(
          musician.data.label
        );
        // return all albums on the first iteration
        if (index === 0) {
          return albums;
        }
        // getting compound elements of previous musician and current
        let elems = accumulator.filter((elem) => albums.includes(elem));
        return elems;
      }, [])
      // converting albums to cytoscape albums
      .map((albumName) => {
        let album = albumService.getByName(albumName);
        return getCytoAlbum(album);
      });
    // creating edges from all musicians to all albums
    let edges = commonAlbums.flatMap((album) => {
      let albumMusicianEdges = musicians.map((musician) =>
        getEdge(musician, album)
      );
      return [...albumMusicianEdges];
    });

    return [...musicians, ...commonAlbums, ...edges];
  } catch (err) {
    console.error("error occured in creating compound albums for musicians");
    return musicians;
  }
};

/**
 * convertive data for musician perspective to data format readable by
 * cytoscape
 * @param {string} tracks tracks to display on graph
 */
export const getMusicianPerspective = (musicianName) => {
  try {
    var musician = musicianService.getByName(musicianName);

    // instruments and albums names
    var instruments = musicianService.getInstrumentsNamesOfMusician(
      musicianName
    );
    var albums = musicianService.getAlbumsNamesOfMusician(musicianName);
    // instruments and albums objects
    var instObjects = instruments.map((instr) =>
      instrumentService.getByName(instr)
    );
    var albObjects = albums.map((alb) => albumService.getByName(alb));
    // converting albums, tracks and musicians to format: {data: {id: \d, label: .+, icon}}
    var convMus = getCytoMusician(musician);
    var convInstr = instObjects.flatMap((instr) => {
      var node = getCytoInstrument(instr);
      var edge = getEdge(convMus, node);
      // returning instrument node and edge from this node to musician node
      return [node, edge];
    });
    var convAlb = albObjects.flatMap((alb) => {
      var node = getCytoAlbum(alb);
      var edge = getEdge(convMus, node);
      // returning musician node and edge from this node to album node
      return [node, edge];
    });
    // // returning array containing all elements of album
    return [convMus, ...convInstr, ...convAlb];
  } catch (err) {
    console.error("error occured in creation musicians perspective");
    if (!musician) return [];
    return getCytoMusician(musician);
  }
};

/**
 * making array of relations type {string} musician - {string} instrument
 * to {object} musician - {object} instrument
 * @param {Array} relations - musician - instrument relations
 */
export const getObjectsToMusicianInstrumentRelation = (relations) => {
  try {
    var converted = relations.map((rel) => {
      var newRel = {};
      newRel[0] = musicianService.getByName(Object.entries(rel)[0][0]);
      newRel[1] = instrumentService.getByName(Object.entries(rel)[0][1]);
      return newRel;
    });
    return converted;
  } catch (err) {
    console.error(relations);
    return [];
  }
};

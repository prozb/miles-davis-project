const fs = require('fs');
const tracksFile = fs.readFileSync('../old-dataset/album-tracks.json');
const musiciansFile = fs.readFileSync('../old-dataset/musicians.json');
const albums = JSON.parse(tracksFile);
const musicians = JSON.parse(musiciansFile);
const tracks = {};

Object.entries(albums).forEach(album => {
  album[1].tracks.forEach(track => {
    if(track in tracks){
      if(!tracks[track].albums.includes(album[0])){
        tracks[track].albums.push(album[0]);
      }
    }else{
      var trackObject = {};
      trackObject.albums = [];
      trackObject.albums.push(album[0]);
      tracks[track] = trackObject;
    }
  });
});

Object.entries(tracks).forEach(track => {
  var musiciansOfTrack = [];
  track[1].albums.forEach(albumElem => {
    var name = track[0];
    var allMusicians = [];
    Object.entries(musicians).forEach(musician => {
      
      musician[1].tracks.forEach(elem => {
        if(elem.name === name && elem.album === albumElem){
          var obj = {};
          obj[musician[0]] = elem.instrument;
          allMusicians.push(obj);
        }
      })
    });
    var musObj = {};
    musObj[albumElem] = allMusicians;
    musiciansOfTrack.push(musObj);
  });
  track[1].albums = musiciansOfTrack;
});

var json = JSON.stringify(tracks);
fs.writeFileSync('tracks-new1.json', json, 'utf8');
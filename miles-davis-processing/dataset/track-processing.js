const fs = require('fs');
const tracksFile = fs.readFileSync('./album-tracks.json');
const musiciansFile = fs.readFileSync('./musicians.json');
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
      trackObject.musicians = [];
      trackObject.albums.push(album[0]);
      tracks[track] = trackObject;
    }
  });
});

Object.entries(tracks).forEach(track => {
  var name = track[0];
  var allMusicians = [];
  Object.entries(musicians).forEach(musician => {
    
    musician[1].tracks.forEach(elem => {
      if(elem.name === name && !allMusicians.includes(musician[0])){
        allMusicians.push(musician[0]);
      }
    })
  });
  track[1].musicians = allMusicians;
});

var json = JSON.stringify(tracks);
fs.writeFileSync('tracks.json', json, 'utf8');
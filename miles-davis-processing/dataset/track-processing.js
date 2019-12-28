const fs = require('fs');
const tracksFile = fs.readFileSync('./album-tracks.json');
const albums = JSON.parse(tracksFile);
const tracks = {};

Object.entries(albums).forEach(album => {
  album[1].tracks.forEach(track => {
    if(track in tracks){
      // console.log(tracks[track]);
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


var json = JSON.stringify(tracks);
fs.writeFileSync('tracks.json', json, 'utf8');
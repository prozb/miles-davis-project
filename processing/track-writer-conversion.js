const fs = require('fs');
const tracksFile = fs.readFileSync('./dataset/tracks.json');
const tracks = JSON.parse(tracksFile);
const data = {};

Object.entries(tracks).forEach(album => {
    Object.entries(album[1].tracks).forEach(track => { 
        data[track[0]] = track[1].writer;
    });
});

var json = JSON.stringify(data);
fs.writeFileSync('all-tracks.json', json, 'utf8');
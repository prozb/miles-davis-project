const fs = require('fs');
const musiciansFile = fs.readFileSync('./dataset/musicians.json');
const musicians = JSON.parse(musiciansFile);
const data = {};

console.log(Object.keys(musicians).length);
Object.entries(musicians).forEach(musician => {
    var musicianObject = {};
    var musTracks = [];

    var tracks = musician[1].tracks;
    tracks.forEach(track => {
        var trackObject = {};
        var trackName = Object.keys(track)[0];

        trackObject['name'] = trackName;
        trackObject['album'] = track['album'];
        trackObject['instrument'] = track[trackName];

        musTracks.push(trackObject);
    });
    musicianObject['tracks'] = musTracks;
    data[musician[0]] = musicianObject;
});

var json = JSON.stringify(data);
fs.writeFileSync('albums-new.json', json, 'utf8');
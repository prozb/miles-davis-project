const fs = require('fs');
// const tracksFile = fs.readFileSync('./dataset/tracks.json');
const albumsFile = fs.readFileSync('./dataset/albums.json');
const albums = JSON.parse(albumsFile);
const albumInfo = fs.readFileSync('./dataset/album-info.json');
const info = JSON.parse(albumInfo);

const data = {};

// Object.entries(tracks).forEach(albums => {
//     var albumJson = {};
//     albumJson['tracks'] = [];

//     Object.entries(albums[1].tracks).forEach(track => {
//         albumJson['tracks'].push(track[0]);
//     });
//     data[albums[0]] = albumJson;
// })

Object.entries(albums).forEach(album => {

    var albumJson = {};

    albumJson["url"] = info[album[0]].url;
    albumJson["label"] = album[1].label;
    albumJson["released"] = info[album[0]].released;
    albumJson["recorded"] = info[album[0]].recorded;
    albumJson["studios"] = info[album[0]].studios;
    albumJson["producers"] = info[album[0]].producers;
    albumJson["icon"] = album[1].icon;
    data[album[0]] = albumJson;

});

var json = JSON.stringify(data);
fs.writeFileSync('album-info.json', json, 'utf8');
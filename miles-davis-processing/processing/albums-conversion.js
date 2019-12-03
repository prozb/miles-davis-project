const array = require('./album-information');
const fs = require('fs');

const data = {};

array.array.forEach(album => {
    var jsonAlbum = {}

    jsonAlbum['url'] = album.url;
    jsonAlbum['released'] = album.released;
    jsonAlbum['recorded'] = album.recorded;
    jsonAlbum['label'] = album.label;
    jsonAlbum['studios'] = album.studios;
    jsonAlbum['producers'] = album.producers;

    data[album.name] = jsonAlbum;
});

var json = JSON.stringify(data);
fs.writeFileSync('albums.json', json, 'utf8');
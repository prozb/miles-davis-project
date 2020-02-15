const fs = require('fs');
var albums = require('./data/tracks-cream.json');

var albumObjects = Object.entries(albums);
var newObjects = albumObjects.map(element => {
  var obj = {};
  obj.id = element[0];
  obj.albums = element[1].albums;
  return obj;
});

fs.writeFileSync('./cream-dataset/tracks.json', JSON.stringify(newObjects));

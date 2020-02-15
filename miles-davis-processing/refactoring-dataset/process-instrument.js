const fs = require('fs');
var albums = require('./data/instruments.json');

var albumObjects = Object.entries(albums);
var newObjects = albumObjects.map(element => {
  var obj = {};
  obj.id = element[0];
  obj.url = element[1].url;
  obj.musicians = element[1].musicians;
  return obj;
});

fs.writeFileSync('./new-data/instruments.json', JSON.stringify(newObjects));

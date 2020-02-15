const fs = require('fs');
var albums = require('./data/albums.json');

var albumObjects = Object.entries(albums);
var newObjects = albumObjects.map(element => {
  var obj = {};
  obj.id = element[0];
  obj.url = element[1].url;
  obj.icon = element[1].icon;
  obj.label = element[1].label;
  obj.released = element[1].released;
  obj.recorded = element[1].recorded;
  obj.studios = element[1].studios;
  obj.producers = element[1].producers;
  obj.musicians = element[1].musicians;

  return obj;
});

fs.writeFileSync('./new-data/albums.json', JSON.stringify(newObjects));

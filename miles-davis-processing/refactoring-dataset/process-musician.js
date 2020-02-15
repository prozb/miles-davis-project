const fs = require('fs');
var albums = require('./data/musicians-cream.json');

var albumObjects = Object.entries(albums);
var newObjects = albumObjects.map(element => {
  var obj = {};
  obj.id = element[0];
  obj.url = element[1].url;
  obj.icon = element[1].icon;
  obj.albums = element[1].albums;
  obj.instruments = element[1].instruments;
  obj.birthdate = element[1].birthdate;
  obj.deathdate = element[1].deathdate;
  return obj;
});

fs.writeFileSync('./cream-dataset/musicians.json', JSON.stringify(newObjects));

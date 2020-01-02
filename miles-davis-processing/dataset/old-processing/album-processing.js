const fs = require('fs');
const albumInfoFile = fs.readFileSync('./album-info.json');
const musiciansFile = fs.readFileSync('./musicians.json');
const albumInfo = JSON.parse(albumInfoFile);
const musicians = JSON.parse(musiciansFile);
const albums = {};

Object.entries(albumInfo).forEach(info => {  
  if(!(info[0] in albums)){
    var obj = {};
    obj.url = info[1].url;
    obj.label = info[1].label;
    obj.released = info[1].released;
    obj.recorded = info[1].recorded;
    obj.studios = info[1].studios;
    obj.producers = info[1].producers;
    obj.icon = info[1].icon;

    albums[info[0]] = obj;
  }
});

Object.entries(albums).forEach(album => {
  var name = album[0];
  var allMusicians = [];
  Object.entries(musicians).forEach(musician => {
    musician[1].tracks.forEach(elem => {
      if(elem.album === name && !allMusicians.includes(musician[0])){
        allMusicians.push(musician[0]);
      }
    })
  });
  album[1].musicians = allMusicians;
});

var json = JSON.stringify(albums);
fs.writeFileSync('albums.json', json, 'utf8');
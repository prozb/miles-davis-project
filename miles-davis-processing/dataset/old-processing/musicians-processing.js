const fs = require('fs');
const musiciansFile = fs.readFileSync('./musicians.json');
const musicians = JSON.parse(musiciansFile);

const musiciansObj = {};
Object.entries(musicians).forEach(mus => {
  var musObj = {};
  var albumsMus = [];
  var albumsInst = [];
  
  mus[1].tracks.forEach(track => {
    if(!albumsMus.includes(track.album)){
      albumsMus.push(track.album);
    }

    if(!albumsInst.includes(track.instrument)){
      albumsInst.push(track.instrument);
    }
  });

  musObj.albums = albumsMus;
  musObj.instruments = albumsInst;
  musObj.url = "";
  musObj.icon = "";
  musObj.birthdate = "";
  musObj.deathdate = "";

  musiciansObj[mus[0]] = musObj;
});

var json = JSON.stringify(musiciansObj);
fs.writeFileSync('new-musicians.json', json, 'utf8');
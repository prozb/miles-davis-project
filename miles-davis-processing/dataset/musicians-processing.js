const fs = require('fs');
const musiciansFile = fs.readFileSync('./musicians.json');
const albumsFile = fs.readFileSync('./album-info.json');
const musicians = JSON.parse(musiciansFile);
const albums = JSON.parse(albumsFile);

const newMusicians = [];

getMusiciansOfAlbum = (name) => {

}

Object.entries(albums).forEach(album => {
  var mus = {};
  mus.url = album[1].url;
  mus.icon = album[1].icon;
  mus.label = album[1].label;
  mus.released = album[1].released;
  mus.recorded = album[1].recorded;
  mus.studios = album[1].studios;
  mus.producers = album[1].producers;

  newMusicians[album[0]] = mus;
});

console.log(newMusicians);



// var json = JSON.stringify(instruments);
// fs.writeFileSync('new-musicians.json', json, 'utf8');
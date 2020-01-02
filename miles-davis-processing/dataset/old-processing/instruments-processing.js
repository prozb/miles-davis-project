const fs = require('fs');
const musiciansFile = fs.readFileSync('./musicians.json');
const musicians = JSON.parse(musiciansFile);
const instruments = {};

inInstruments = (name) => {
  return name in instruments;
}

Object.entries(musicians).forEach(musician => {
  Object.entries(musician[1].tracks).forEach(track => {
    if(inInstruments(track[1].instrument)){
      var instrument = instruments[track[1].instrument];
      if(!instrument.musicians.includes(musician[0])){
        instrument.musicians.push(musician[0]);
      }
    }else{
      var instrument = {}; 
      instrument.url = '';
      instrument.musicians = [];
      instrument.musicians.push(musician[0]);
      instruments[track[1].instrument] = instrument;
    }
  })
});
var json = JSON.stringify(instruments);
fs.writeFileSync('instruments.json', json, 'utf8');
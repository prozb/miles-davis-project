const neo4j = require('neo4j-driver').v1;
const fs    = require('fs');
// reading music files to create database entries
const musicFile = fs.readFileSync('./dataset/music.json')
const musicians = JSON.parse(musicFile);
// reading configs
const configFile = fs.readFileSync('./processing/config.json');
const config     = JSON.parse(configFile);
const url        = config.url;
const username   = config.username;
const password   = config.password;
// staff to handle database requests

var driver  = null;
var session = null;
try{ 
  driver  = neo4j.driver(url, neo4j.auth.basic(username, password));
  session = driver.session();

  const instruments = getAllInstruments(musicians)
  addInstrumentsToDatabase(instruments);
}catch (err){
  console.log('terminating program.')
  console.error(err)
}

// getting all instruments of all musicians
function getAllInstruments(musicians) {
  var instruments = new Set();
  Object.entries(musicians).forEach(musician => {
    musician[1].tracks.forEach(track => {
        instruments.add(track.instrument);
    })
  });

  return instruments;
}

//adding all instruments into the database
function addInstrumentsToDatabase(data){
  const promises = [];

  data.forEach(instrument => {
      promises.push(addInstrumentToDB(instrument));
  });

  Promise.all(promises)
  .then((results) => {
    console.log(`${results.length} entries are added successfuly`)
  })
  .catch (err => {
    console.log('error occured')
    console.log(err)
  }).finally(() => {
    session.close();
    driver.close();
  });
}
// async function to add instrument into the database
async function addInstrumentToDB(name){
  try{
    instrument = await session.run(
      'create (n:Instrument {name: $name}) return n.name',
      {name: name}
    );
  }catch(err){
    console.log(err);
  }
}
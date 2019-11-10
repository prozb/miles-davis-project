const neo4j = require('neo4j-driver').v1;
const fs    = require('fs');
// reading music files to create database entries
const musicFile  = fs.readFileSync('./dataset/music.json');
const musicians  = JSON.parse(musicFile);
const albumsFile = fs.readFileSync('./dataset/albums.json');
const albums     = JSON.parse(albumsFile);
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

  fillDatabase();
  // clearDatabase();
}catch (err){
  console.log('terminating program.')
  console.error(err)
}
// filling database with initial values
function fillDatabase(){
  const promises = [];
  
  promises.push(addAllAlbumsIntoDB(albums));
  promises.push(addInstrumentsToDatabase(getAllInstruments(musicians)));

  Promise.all(promises)
  .then(() => console.log('successfully inserted all initial values.'))
  .catch(err => {
    console.log('error occured.');
    console.log(err);
  }).finally(() => {
    session.close();
    driver.close();
  });
}
// removing all entries from the database
function clearDatabase(){
  const promises = [];

  promises.push(removeAllAlbumsFromDB());
  promises.push(removeAllInstrumentsFromDB());

  Promise.all(promises)
  .then(() => console.log(`${promises.length} methods executed.`))
  .catch(err => console.log(err))
  .finally(() => { 
    session.close();
    driver.close();
  });
}
// remove all instruments from db
async function removeAllInstrumentsFromDB(){
  await session.run(`match (n:Instrument) delete n`)
  .then(() => console.log('removing all instruments succeeded'))
  .catch(err => {
      console.log('error occured')
      console.log(err);
  });
}
// removing all albums from database
async function removeAllAlbumsFromDB(){
  await session.run(`match (n:Album) delete n`)
  .then(() => console.log('removing all albums succeeded'))
  .catch(err => {
      console.log('error occured')
      console.log(err);
  });
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

// adding all albums into the database
async function addAllAlbumsIntoDB(albums){ 
  const promises = [];

  Object.entries(albums).forEach(album => {
    promises.push(addAlbumIntoDB(album));
  })

  await Promise.all(promises)
  .then(result => {
    console.log(`${result.length} albums added to the database`)
  })
  .catch(err => {
    console.log('error occured');
    console.log(err);
  });
}

async function addAlbumIntoDB(album){
  try{
    await session.run(
      `create (n:Album {name: $name, label: $label, released: $released,
      url: $url}) return n.name`,
      {
        name: album[0], label: album[1].label, 
        released: album[1].released, url: album[1].url
      }
    );
  }catch(err){
    console.log(err);
  }
}
//adding all instruments into the database
async function addInstrumentsToDatabase(data){
  const promises = [];

  data.forEach(instrument => {
      promises.push(addInstrumentToDB(instrument));
  });

  await Promise.all(promises)
  .then((results) => {
    console.log(`${results.length} instruments are added successfuly`)
  })
  .catch (err => {
    console.log('error occured')
    console.log(err)
  });
}
// async function to add instrument into the database
async function addInstrumentToDB(name){
  try{
    await session.run(
      'create (n:Instrument {name: $name}) return n.name',
      {name: name}
    );
  }catch(err){
    console.log(err);
  }
}
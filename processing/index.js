const neo4j = require('neo4j-driver').v1;
const fs    = require('fs');
// reading music files to create database entries
const musicFile  = fs.readFileSync('./dataset/musicians.json');
const musicians  = JSON.parse(musicFile);
const albumsFile = fs.readFileSync('./dataset/album-info.json');
const albums     = JSON.parse(albumsFile);
const tracksFile = fs.readFileSync('./dataset/album-tracks.json');
const tracks     = JSON.parse(tracksFile);
const allTracksF = fs.readFileSync('./dataset/all-tracks.json');
const allTracks  = JSON.parse(allTracksF);
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
}catch (err){
  console.log('terminating program.')
  console.error(err)
}

(async () => {
    if(process.argv[2] === 'clear'){
      await clearDatabase();
      console.log('deleted items from the database.');

      session.close();
      driver.close();
    }else{
      await fillDatabase();
      console.log('added all initial values into the database.');
      session.close();
      driver.close();
    }
})();
// filling database with initial values
async function fillDatabase(){  
  try{
    await addAllLabelstIntoDB(albums);
    await addAllAlbumsIntoDB(albums);
    await addAllTracksToDB(tracks);
    await addAllInstrumentsToDB(musicians);
    await addAllMusiciansToDB(musicians);
    await addAllWriterIntoDB(allTracks);
    await addAllProducersIntoDB(albums);
    await addAllMusicianTrackInstrumentRelation(musicians);
  }catch(err){
    console.log('error occured.');
    console.log(err);
  }
}
// creating track - musician - instrument relations
async function addAllMusicianTrackInstrumentRelation(musicians){
  var count = 0;
  for(musician of Object.entries(musicians)){
    for(var i = 0; i < musician[1].tracks.length; i++){
      var track = musician[1].tracks[i];
      count++;
      // track, musician, instrument, album
      await addTrackMusicianInstrumentRelation(track.name, musician[0], track.instrument, track.album); 
    }
}
  console.log(`${count} track - musician - instrument relations added`)
}
// adding all producers into db
async function addAllProducersIntoDB(albums){
  const producerSet = new Set();
  var producerCount = 0;

  for(var album of Object.entries(albums)){
    for(var i = 0; i < album[1].producers.length; i++){
      // adding producer into db in case when it isn't in db
      if(!producerSet.has(album[1].producers[i])){
        await addProducerIntoDB(album[1].producers[i]);
        producerSet.add(album[1].producers[i]);
        producerCount++;
      }
      await addRelationProducerAlbum(album[1].producers[i], album[0]);
    }
  }
  console.log(`${producerCount} producers added into db`);
}
// track, musician, instrument relation
async function addTrackMusicianInstrumentRelation(track, musician, instrument, album){
  await session.run(`
    match 
      (album:Album {name: $albumName}), (instrument:Instrument {name: $instrumentName}),
      (musician:Musician {name: $musicianName}), (track:Track {name: $trackName})
    where exists((track)-[:PRESENT_IN]->(album))
    merge 
      (musician)-[:PLAYED]->(playing:TrackPlaying 
      {name: toString(split(musician.name, ' ')[0] + split(track.name, ' ')[0] + split(instrument.name, ' ')[0])})
    merge
      (instrument)<-[:PLAYED]-(playing)
    merge
      (track)<-[:PLAYED_ON]-(playing) 
    return playing`, {
      musicianName: musician, albumName: album, 
      instrumentName: instrument, trackName: track
    });
  // console.log(`added relation ${producer} -> ${album}`);
}
// adding relation producer -> album
async function addRelationProducerAlbum(producer, album){
  await session.run(`match (a:Producer), (b:Album) 
    where a.name = {producerName} and b.name = {albumName} 
    merge (a)-[r:PRODUCED]->(b) return type(r)`, {
      producerName: producer, albumName: album
  });
  console.log(`added relation ${producer} -> ${album}`);
}
// adding producer into db
async function addProducerIntoDB(producer){
  await session
  .run(`merge (a {name: $name}) 
        on match set a:Producer 
        on create set a:Producer return a;`, { 
    name: producer 
  })
  .catch(console.log);
}
// adding all writers into db
async function addAllWriterIntoDB(allTracks){
  const writers = new Set();
  
  var count = 0;
  for(var track of Object.entries(allTracks)){
    for(var i = 0; i < track[1].length; i++){
      if(!writers.has(track[1][i])){
        await addWriterIntoDB(track[1][i]);
        writers.add(track[1][i]);
        count++;
      }
      await addRelationWriterTrack(track[1][i], track[0]);
    }
  }
  console.log(`${count} writers added into db`);
}
async function addRelationWriterTrack(writer, track){
  await session.run(`match (a:Writer), (b:Track) 
    where a.name = {writerName} and b.name = {trackName} 
    merge (a)-[r:WROTE]->(b) return type(r)`, {
      writerName: writer, trackName: track
  });
  console.log(`added relation ${writer} -> ${track}`);
}
// adding writer into db
async function addWriterIntoDB(writer){
  await session.
    run(`merge (a {name: $name}) 
          on match set a:Writer 
          on create set a:Writer return a;`, { 
      name: writer 
    })
    .catch(console.log);
}
// adding all labels into db
async function addAllLabelstIntoDB(albums){
  const labels = new Set();
  Object.entries(albums)
    .forEach(album => labels.add(album[1].label));
  
  const promises = [];
  labels.forEach(label => promises.push(addLabelIntoDB(label)));
  await Promise.all(promises);
  console.log(`${promises.length} labels added into db`)
}
// adding one label into database
async function addLabelIntoDB(label){
  await session.
  run(`merge (n:Label {name: $name}) return n`, { 
    name: label 
  })
  .catch(console.log);
}
// removing all entries from the database
async function clearDatabase(){
  await session
  .run(`match ()-[r]-() delete r`)
  .then(() => console.log('removing all relations'))
  .catch(err => {
      console.log('error occured')
      console.log(err);
  });

  await session.run(`match (n) delete n`)
  .then(() => console.log('removing all entries'))
  .catch(err => {
      console.log('error occured')
      console.log(err);
  });  
}
// adding all tracks into the database
async function addAllTracksToDB(tracks){
  var count = 0;
  for(const albumKey of Object.keys(tracks)){
    count += tracks[albumKey].tracks.length;
    for(var i = 0; i < tracks[albumKey].tracks.length; i++){
      await addTrackToDB(tracks[albumKey].tracks[i]);
      await addRelationAlbumTrack(albumKey, tracks[albumKey].tracks[i]);
    }
  }
  console.log(`${count} tracks added to the database`);
}
// creating album -> track relation
// since tracks can be present in different albums,
// you should carefully create new album -> track relation 
// to avoid one repeating track will be included multiple 
// times in different albums
// Oleo -> Album1, Oleo -> Album1, Oleo -> Album2, Oleo -> Album3 etc.
async function addRelationAlbumTrack(album, track){
  await session.run(`match (a:Album), (b:Track) 
    where not (b)-[]-(:Album) and a.name = {albumName} and b.name = {trackName}
    merge (a)<-[r:PRESENT_IN]-(b) return type(r)`, {
      albumName: album, trackName: track
  });
  console.log(`added relation ${album} <- ${track}`);
}
// adding one track to database
async function addTrackToDB(track){
  await session.run(`create (n:Track {name: $name}) return n`, 
  {name: track});
}
// adding all musicians to database
async function addAllMusiciansToDB(musicians){
  const promises = [];
  Object.keys(musicians).forEach(musician => {
    promises.push(addMusicianToDB(musician));
  });

  await Promise.all(promises)
  console.log(`${promises.length} musicians successfully added.`);
}
//adding one musician into db
async function addMusicianToDB(musician){
  await session.run('create (a:Musician {name: $name}) return a', {name: musician})
  .catch(err => { 
    console.log(`musician ${musician} cannot be added`);
    console.log(err);
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
// removing all musicians from database
async function removeAllMusiciansFromDB(){
  await session.run(`match (n:Musician) delete n`)
  .then(() => console.log('removing all musicians succeeded'))
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
  Object.entries(albums)
  .forEach(album => promises.push(addAlbumIntoDB(album)));

  await Promise.all(promises)
  .catch(err => {
    console.log('error occured');
    console.log(err);
  });
  console.log(`albums added to the database`);

  const labelPromises = [];
  Object.entries(albums)
  .forEach(album => labelPromises.push(addRelationAlbumLabel(album[0], album[1].label)));

  await Promise.all(labelPromises)
  .catch(err => {
    console.log('error occured');
    console.log(err);
  });

  console.log(`${labelPromises.length} relations label -> album added to the database`);
}
// adding relation between album and label
async function addRelationAlbumLabel(album, label){
  await session.run(`match (a:Album), (b:Label) 
  where a.name = {albumName} and b.name = {labelName} 
  merge (a)<-[r:PUBLISHED]-(b) return type(r)`, {
    albumName: album, labelName: label
  });
}
// adding albums into the database
async function addAlbumIntoDB(album){
  await session.run(
    `create (n:Album {name: $name, released: $released,
      url: $url, recorded: $recorded, studios: $studios}) return n.name`,
    {
      name: album[0],
      released: album[1].released, url: album[1].url, 
      recorded: album[1].recorded, studios: album[1].studios,
    }
  );
}
//adding all instruments into the database
async function addAllInstrumentsToDB(musicians){
  const instruments = getAllInstruments(musicians);
  const promises = [];

  instruments.forEach(instrument => {
      promises.push(addInstrumentToDB(instrument));
  });

  await Promise.all(promises);
  console.log(`${promises.length} instruments are added successfuly`);
}
// async function to add instrument into the database
async function addInstrumentToDB(name){
  await session.run(
    'merge (n:Instrument {name: $name}) return n.name',
    {name: name}
  );
}
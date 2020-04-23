import {
  fetchFilesBegin,
  fetchFilesSuccess,
  fetchFilesFailture
} from '../actions/fileActions';
import store from '../store';

async function fetchFiles(path) {
  store.dispatch(fetchFilesBegin());
  
  let albums      = await fetch(`discogs/${path}/albums.json`)
  let tracks      = await fetch(`discogs/${path}/tracks.json`)
  let musicians   = await fetch(`discogs/${path}/musicians.json`)
  let instruments = await fetch(`discogs/${path}/instruments.json`)


  if(albums.error || tracks.error ||
    musicians.error || instruments.error){
    let error = null;
    if(albums.error){
      error = albums.error;
    }else if(tracks.error){
      error = tracks.error;
    }else if(musicians.error){
      error = musicians.error;
    }else{
      error = instruments.error;
    }
    store.dispatch(fetchFilesFailture(error));
    return;
  }

  let albumsJSON = await albums.json();
  let tracksJSON = await tracks.json();
  let musiciansJSON = await musicians.json();
  let instrumentsJSON = await instruments.json();

  store.dispatch(fetchFilesSuccess({
    albums: albumsJSON,
    musicians: musiciansJSON,
    tracks: tracksJSON,
    instruments: instrumentsJSON
  }));
}

export default fetchFiles;
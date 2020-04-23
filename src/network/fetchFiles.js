import {
  fetchFilesBegin,
  fetchFilesSuccess,
  fetchFilesFailture
} from '../actions/fileActions';
import store from '../store';

function fetchFiles(path) {
  store.dispatch(fetchFilesBegin());
  fetch(`discogs/${path}/albums.json`)
    .then(res => res.json())
    .then(res => {
      if(res.error){
        throw(res.error);
      }
      console.log(res);
      store.dispatch(fetchFilesSuccess(res));
    })
    .catch(error => {
      store.dispatch(fetchFilesFailture(error));
    });
}

export default fetchFiles;
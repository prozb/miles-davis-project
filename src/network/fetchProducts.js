import {
  fetchFilesBegin,
  fetchFilesSuccess,
  fetchFilesFailture
} from '../actions/fileActions';
import store from '../store';

function fetchFiles(path) {
  store.dispatch(fetchFilesBegin());
  fetch('https://jsonplaceholder.typicode.com/s')
    .then(res => res.json())
    .then(res => {
      if(res.error){
        throw(res.error);
      }
      console.log(res);
      store.dispatch(fetchFilesSuccess(res));
      return res.products;
    })
    .catch(error => {
      store.dispatch(fetchFilesFailture(error));
    });
}

export default fetchFiles;
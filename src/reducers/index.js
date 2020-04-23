import counterReducer from './counterReducer';
import loginReducer from './loginReducer';
import fileReducer from './fileReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  counter: counterReducer, 
  loggedIn: loginReducer,
  fileState: fileReducer
});

export default reducers;
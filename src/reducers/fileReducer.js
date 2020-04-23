import {
  FETCH_FILES_BEGIN,
  FETCH_FILES_SUCCESS,
  FETCH_FILES_FAILTURE,
} from '../actions/fileActions';

const initialState = {
  files: [],
  loading: false,
  error: null
}

export default function productReducer(state = initialState, action) {
  switch(action.type){
    case FETCH_FILES_BEGIN: 
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_FILES_SUCCESS: 
      return {
        ...state,
        loading: false,
        files: action.payload.files
      }
    case FETCH_FILES_FAILTURE: 
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        files: []
      }
    default: 
      return initialState;
  }
}


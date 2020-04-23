export const FETCH_FILES_BEGIN   = 'FETCH_FILES_BEGIN';
export const FETCH_FILES_SUCCESS = 'FETCH_FILES_SUCCESS';
export const FETCH_FILES_FAILTURE = 'FETCH_FILES_FAILTURE';

export const fetchFilesBegin = () => ({
  type: FETCH_FILES_BEGIN
});

export const fetchFilesSuccess = files => ({
  type: FETCH_FILES_SUCCESS,
  payload: { files }
});

export const fetchFilesFailture = error => ({
  type: FETCH_FILES_FAILTURE,
  payload: { error }
});
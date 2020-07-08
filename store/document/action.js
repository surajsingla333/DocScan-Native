import Directory from '../../constants/Directory';
import RNFetchBlob from 'rn-fetch-blob';

export const GET_DOCUMENT = "GET_DOCUMENT";
export const DELETE_DOCUMENT = "DELETE_DOCUMENT";

export const getDocument = (allDocs) => {

  return async dispatch => {

    dispatch({ type: GET_DOCUMENT, documents: { allDocuments: allDocs } });

  }
}

export const deleteDocuments = (docs) => {

  return async dispatch => {

    const del = await RNFetchBlob.fs.unlink(`${Directory.folderDocument}/${docs[i]}`);
  }
}
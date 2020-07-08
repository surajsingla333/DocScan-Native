import { GET_DOCUMENT, DELETE_DOCUMENT } from './action';
// import Image from '../../models/image';

const initialState = {
  documents: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCUMENT:
      return {
        documents: action.documents.allDocuments,
      }
    case DELETE_DOCUMENT:
      return{
        documents: action.documents.deleteDocument,
      }
    default:
      return state;
  }
}
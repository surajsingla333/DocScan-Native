export const GET_DOCUMENT = "GET_DOCUMENT";

export const getDocument = (allDocs) => {

  return async dispatch => {

    dispatch({ type: GET_DOCUMENT, documents: { allDocuments: allDocs } });

  }
}

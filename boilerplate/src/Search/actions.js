export const clearSearch = () => dispatch =>
  dispatch({
    type: "SEARCH",
    payload: ""
  });

export const removeSearchPreference = payload => dispatch =>
  dispatch({
    type: "REMOVE_SEARCH_PREFERENCE",
    payload
  });

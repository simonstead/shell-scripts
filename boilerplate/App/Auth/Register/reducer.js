import { numberOfPages } from "./Pages/pageOrder";

const initialState = {
  currentPageIndex: 0
};

const actionHandlers = {
  SELECT_REGISTRATION_PAGE: (state, page) => ({
    ...state,
    currentPageIndex: page % numberOfPages
  })
};

export const reducer = (state = initialState, { type, payload }) =>
  actionHandlers[type] ? actionHandlers[type](state, payload) : state;

export default reducer;

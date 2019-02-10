const initialState = false

export const reducer = (state = initialState, { type }) =>
  new RegExp(/.*PENDING$/g).test(type)

export default reducer

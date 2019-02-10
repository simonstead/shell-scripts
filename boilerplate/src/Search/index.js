import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withRouter } from 'react-router-dom'
import styles from './styles.scss'

const SEARCH = 'SEARCH'

export const search = ({ history }) => (dispatch, getState) => {
  const searchTerm = getState().form.search.values
    ? getState().form.search.values.search
    : ''
  dispatch({ type: SEARCH, payload: searchTerm })
  searchTerm
    ? history.push(`${history.location.pathname}?q=${searchTerm}`)
    : history.push(history.location.pathname)
}

export const SearchBar = ({ search, history, placeholder }) => (
  <form
    className={styles.SearchBar}
    onChange={event => {
      event.preventDefault()
      search({ history })
    }}
  >
    <span className="fa fa-search fa-lg" />
    <Field
      component="input"
      type="text"
      name="search"
      placeholder={placeholder}
      className={styles.SearchBox}
    />
  </form>
)

const mapStateToProps = () => ({})
const mapDispatchToProps = { search }

export const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)

export default withRouter(reduxForm({ form: 'search' })(SearchBarContainer))

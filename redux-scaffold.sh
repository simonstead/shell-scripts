# do a check to make sure we have an application name
if [ "$#" -ne 1 ]; then
  echo "usage: $0 <app_name>";
  exit 1;
fi


# create the application
function scaffold() {
    local component=$1

    create-react-app $component
    
    cd $component
    
    yarn add react-redux react-router-dom redux redux-form redux-localstorage redux-promise-middleware redux-thunk
   
    make_store
    overwrite_app
    make_api
}

# make the redux store
function make_store() {
  mkdir -p src/Store

  echo "import { createStore, applyMiddleware, compose } from 'redux';
  import App from './reducers';
  import ReduxThunk from 'redux-thunk';
  import promiseMiddleware from 'redux-promise-middleware';
  import persistState from 'redux-localstorage';

  const middlewares = [ReduxThunk, promiseMiddleware()];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancers = composeEnhancers(
    applyMiddleware(...middlewares),
    persistState(),
  );

  let Store = createStore(App, enhancers);

  export default Store;
" > src/Store/index.js


  echo "import { combineReducers } from 'redux';
  import { reducer as formReducer } from 'redux-form';

  const reducer = combineReducers({
    form: formReducer,
  });

  export default reducer;
" > src/Store/reducers.js


}


# overwrite the application to use the redux store
function overwrite_app() {
  echo "import React from 'react';
  import './App.css';
  import { Provider } from 'react-redux';
  import store from './Store';
  import { BrowserRouter as Router, Route } from 'react-router-dom';

  const Main = () => (
    <div className='App'>
      <h1>App</h1>
    </div>
  );

  const App = () => (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Route exact path='/' component={Main} />
        </React.Fragment>
      </Router>
    </Provider>
  );

  export default App;
" > src/App.js
}


# add a promise based fetch request
function make_api() {
  echo "export const request = ({ url, options, body, token }) => {
    return new Promise((resolve, reject) => {
      if (!options) options = {};
      if (!options.headers) options.headers = defaultHeaders;
      if (body) options.body = JSON.stringify(body);
      if (token)
        options.headers = {
          ...options.headers,
          Authorization: 'Bearer ' + token,
        };

      fetch(url, options)
        .then(response => {
          try {
            return response.json().then(json => {
              return response.ok ? resolve(json) : reject(json);
            });
          } catch (e) {
            resolve({ error: 'Server error' });
          }
        })
        .catch(reject);
    });
  };

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  export default request;
" > src/Api.js

}

scaffold $1

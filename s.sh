# React component scaffold
# can generate
# - a simple componoent
# - a connected component
# - --reducer flag
# - form component with --pages flag (to generate a form)
# -
# Usage
# react-scaffold generate (simple | connected) <name> --reducer
#
#
#

# do a check to make sure we have an application name
function usage() {
echo "######################"
echo "### react scaffold ###"
echo "######################"
echo "welcome to react-scaffold"
echo "available commands:"
echo "generate (g)"
echo "// :Usage: //"
echo "react-scaffold <command=[generate]> <type=[simple | connected | form | app]> <name> [--reducer, --pages=<int>, --api=<str>]"
}


function style() {
    cat <<- _EOF_
:local(.$name) {

}
_EOF_
}

function form() {
    cat <<- _EOF_
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import styles from './styles.scss'
import { post } from '../App/api'

const testAction = history => (dispatch, getState) => dispatch({
    type: 'TEST_ACTION',
    payload: post({
      url: '/$api_url',
      token: getState().auth.token,
      body: getState().form.$name.values
    }).then(data => {
      // history.push('/SOME_URL')
      return data
    })
})

export const $name = ({ onSubmit, history }) => <form className={styles.$name} onSubmit={event => {event.preventDefault(); onSubmit(history)}}>
  <h1>$name</h1>
  <label htmlFor='$name'>$name</label>
  <Field name='$name' type='text' component='input' />
  <button type='submit'>Submit</button>
</form>

const mapStateToProps = state => ({})
const mapDispatchToProps = {
  onSubmit: testAction
}

const Form = reduxForm({form: '$name'})($name)
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form))
_EOF_
}

function redux_container() {
    cat <<- _EOF_
import React from 'react'
import { connect } from 'react-redux'
import styles from './styles.scss'

const testAction = () => dispatch => dispatch({
    type: 'TEST_ACTION'
})

export const $name = ({ onClick}) => <div className={styles.$name}>
  <h1>$name</h1>
  <button onClick={onClick} >Click</button>
</div>

const mapStateToProps = state => ({})
const mapDispatchToProps = {
  onClick: testAction
}
export default connect(mapStateToProps, mapDispatchToProps)($name)
_EOF_
}

function simple() {
    cat <<- _EOF_
import React from 'react'
import styles from './styles.scss'

export const $name = () => <div className={styles.$name}>
    <h1>$name</h1>
</div>

export default $name
_EOF_
}

function generate_reducer() {
    cat <<- _EOF_
const initialState = {}

const actionHandlers = {
TEST_ACTION: (state, payload) => ({...state, ...payload})
}

export const reducer = (state = initialState, {type, payload}) => actionHandlers[type] ? actionHandlers[type](state, payload) : state

export default reducer
_EOF_
}

function generate_components() {
    if [[ ! -d "./src" ]]; then
      echo "Use this from the project root to make sure you don't fuck anything up"
      exit 1;
    fi

    echo "creating directory" $name
    mkdir -p src/$name
    cd src/$name

    if [ "$type" = "simple" ]; then
        echo "scaffolding simple component..."
        simple > index.js
    fi

    echo "generating style sheet..."
    style > styles.scss

    if [ "$type" = "connected" ]; then
        echo "scaffolding redux container with TEST_ACTION (testAction) ..."
        redux_container > index.js
    fi

    if [ "$type" = "form" ]; then
        echo "scaffolding redux form component with TEST_ACTION (testAction) ..."
        form > index.js
    fi

    if [ "$reducer" = "true" ]; then
        echo "scaffolding reducer ($name) reducer.js"
        generate_reducer > reducer.js
        echo "-- REMEMBER -- include the reducer in your store/reducers.js file"
    fi

    echo "Done!"
}

function generate_app() {
  echo "stuff"

  # create-react-app $name
  mkdir $name
  cd $name
  #
  # yarn add classnames moment moment-range node-sass react react-big-calendar react-dom react-dropzone react-ga react-markdown react-redux react-router react-router-dom react-stripe-elements redux redux-form redux-localstorage redux-promise-middleware redux-segment redux-sessionstorage redux-thunk

  touch .env .prettierrc

  mv *.css *.scss

  mkdir -p src/

  cp -r /Users/simonstead/code/shell-scripts/boilerplate src/App



}

# # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # #


name=$3
type=$2
command=$1

if [ "$1" == "--help" -o "$1" == "-h" ]; then
    usage
    exit 1;
fi

if [ "$1" != "g" ]  && [ "$1" != "generate" ]; then
    echo "available commands [generate (g)]"
    usage
    exit 1;
fi

if [ "$2" != "simple" ] && [ "$2" != "connected" ] && [ "$2" != "form" ] && [ "$2" != "app" ]; then
    echo $2 "not understood. Use one of [ simple | connected | form | app]"
    usage
    exit 1;
fi


while [ "$4" != "" ]; do
    case "$4" in
        "--reducer") reducer='true';;
        "--pages")  shift
                    pages=$4
                    ;;
        "--api")  shift
                    api_url=$4
                    ;;
    esac
    shift
done

if [[ -d $name ]]; then
  echo "directory already exists"
  exit 1;
fi

if [ "$1" == "g" -o "$1" == "generate" ] && [ "$2" == "app" ]; then
  echo "***Scaffolding new application $name"
  generate_app
else
  generate
fi

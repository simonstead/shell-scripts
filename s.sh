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
echo "// :Usage: //"
echo "react-scaffold <command=[generate]> <type=[simple | connected | form]> <name> [--reducer, --pages=<int>]"
}

name=$3
type=$2
command=$1

if [ "$1" != "g" ]  && [ "$1" != "generate" ]; then
    echo "available commands [generate (g)]"
    usage
    exit 1;
fi

if [ "$2" != "simple" ]  && [ "$2" != "connected" ]; then
    echo $2 "not understood. Use one of [simple | connected]"
    usage
    exit 1;
fi


while [ "$4" != "" ]; do
    case "$4" in
        "--reducer") reducer='true';;
        "--pages")  shift 
                    pages=$4
                    ;;
    esac
    shift
done

function style() {
    cat <<- _EOF_
:local(.$name) {

    }
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
    TEST_ACTION: (state, payload) => {...state, ...payload} 
}

export const reducer = (state = initialState, {type, payload}) => actionHandlers[type] ? actionHandlers[type](state, payload) : state

export default reducer
_EOF_
}

function generate() {
    echo "creating directory" $name
    mkdir $name

    cd $name

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

    if [ "$reducer" = "true" ]; then
        echo "scaffolding reducer ($name) reducer.js"
        generate_reducer > reducer.js
        echo "-- REMEMBER -- include the reducer in your store/reducers.js file"
    fi    
    
    echo "Done!"
}


generate

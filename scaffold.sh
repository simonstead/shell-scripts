if [ "$#" -ne 1 ]; then
  echo "usage: $0 <component_name>";
  exit 1;
fi

scaffold () {
    local component=$1

    mkdir $component

    # component.js
    echo "import React from 'react';
import styles from './styles.css'; 

export const $component = ({ state }) => <div className={styles.$component}>$component</div>;

export default $component;" > $component/component.js

    # component test file
    echo "import React from 'react';

import renderer from 'react-test-renderer';
import $component from './';

test('$component renders correctly', () => {

    const tree = renderer.create(<$component />).toJSON(); 

    expect(tree).toMatchSnapshot();

});" > $component/$component.test.js

    # reducer 
    echo "import { TEST_ACTION } from './actions';
const initialState = {};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST_ACTION:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
" > $component/reducer.js

    # reducer test
    echo    "import reducer from './reducer';
import actions from './actions';

test('$component reducer', () => {
  const previousState = {};
  const action = {};
  const expectedState = {};
  expect(reducer(previousState, action)).toEqual(expectedState);
});
" > $component/reducer.test.js

    # styles
    echo ":local(.$component) {
  font-size: 1em;
}" > $component/styles.css


    # readme for component library
    echo "**$component example:**

\`\`\`js
<$component />
\`\`\`
" > $component/Readme.md


    # container
    echo "import { connect } from 'react-redux';
import $component from './component';
import { testAction } from './actions';

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = {
  testAction,
};

export default connect(mapStateToProps, mapDispatchToProps)($component);
" > $component/index.js


    # actions
    echo "export const TEST_ACTION = 'TEST_ACTION';

export const testAction = () => (dispatch, getState) => {
  dispatch({
    type: TEST_ACTION,
  });
};
" > $component/actions.js


}

scaffold $1

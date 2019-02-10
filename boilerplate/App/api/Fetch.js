import React from "react";
import { connect } from "react-redux";

const dispatchGenericEvent = ({ type, payload }) => dispatch =>
  dispatch({
    type,
    payload
  });

class Fetch extends React.Component {
  constructor(props) {
    super(props);
    const { actions } = this.props;
    for (var i = 0; i < actions.length; i++) {
      if (typeof actions[i] === "function") {
        actions[i]();
      } else {
        this.props.dispatchGenericEvent({
          type: actions[i].type,
          payload:
            typeof actions[i].payload === "function"
              ? actions[i].payload()
              : actions[i].payload
        });
      }
    }
  }

  render() {
    return this.props.children;
  }
}

export default connect(
  () => ({}),
  { dispatchGenericEvent }
)(Fetch);

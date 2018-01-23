import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actions } from "components/store/Store";

import { Button } from "react-bootstrap";

class Prediction extends React.PureComponent {
  static propTypes = {
    step: PropTypes.number,
    selectedStop: PropTypes.string,
    predictions: PropTypes.object,
    isFetching: PropTypes.bool,
    getPredictions: PropTypes.func,
  };

  render = () => {
    let predictionMessage;
    if (this.props.predictions && this.props.predictions._title) {
      const prediction = this.props.predictions.prediction[0];
      predictionMessage = (
        <div>
          <h4>Next vehicle arrives in { prediction._minutes } minutes</h4>
          <span>Direction: { this.props.predictions._title }</span>
        </div>
      );
    }

    return (
      <div>
        <Button
          onClick={ this.props.getPredictions }
          disabled={ !this.props.selectedStop || this.props.isFetching }
        >
          Get sample prediction
        </Button>
        { predictionMessage }
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    step: state.step,
    selectedStop: state.selectedStop,
    predictions: state.predictions.data,
    isFetching: state.predictions.isFetching,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPredictions: () => dispatch(actions.getPredictions()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);

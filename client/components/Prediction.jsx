// import "components/scss/Map.scss";

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actions } from "components/store/Store";

import { Button } from "react-bootstrap";

class Prediction extends React.Component {
  static propTypes = {
    selectedStop: PropTypes.string,
    predictions: PropTypes.object,
    getPredictions: PropTypes.func,
  };

  render = () => {
    let disabledMessage;
    if (!this.props.selectedStop) {
      disabledMessage = <span>Select a stop</span>;
    }

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
          disabled={ !this.props.selectedStop }
        >
          Get sample prediction
        </Button>
        { disabledMessage }
        { predictionMessage }
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    selectedStop: state.selectedStop,
    predictions: state.predictions.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPredictions: () => dispatch(actions.getPredictions()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);

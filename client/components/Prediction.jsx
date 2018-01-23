import "components/scss/Prediction.scss";

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actions } from "components/store/Store";

import Icon from "components/Icon";

class Prediction extends React.PureComponent {
  static propTypes = {
    step: PropTypes.number,
    selectedStop: PropTypes.string,
    predictions: PropTypes.object,
    isFetching: PropTypes.bool,
    getPredictions: PropTypes.func,
  };

  componentWillReceiveProps = (nextProps) => {
    if (this.props.step !== 3 && nextProps.step === 3) {
      this.props.getPredictions();
    }
  }

  render = () => {
    let predictionMessage;
    if (this.props.predictions && this.props.predictions._title) {
      const prediction = this.props.predictions.prediction[0];
      predictionMessage = (
        <div className="Prediction__content">
          <h4 className="Prediction__content__minutes Prediction__verticalCenter">
            <Icon glyph="access_time" className="Prediction__content__icon" />
            Next vehicle arrives in { prediction._minutes } minutes
          </h4>
          <div className="Prediction__verticalCenter">
            <Icon glyph="near_me" className="Prediction__content__icon" />
            Direction: { this.props.predictions._title }
          </div>
        </div>
      );
    } else if (!this.props.isFetching) {
      predictionMessage = (
        <div className="Prediction__content Prediction__verticalCenter">
          <Icon glyph="do_not_disturb" className="Prediction__content__icon" />
          No prediction for this stop.
        </div>
      );
    }

    return (
      <div className="Prediction">
        <h3 className="Prediction__title">Sample Prediction</h3>
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

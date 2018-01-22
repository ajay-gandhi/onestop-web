import "components/scss/NextTrainApp.scss";

import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Provider } from "react-redux";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import { actions, store } from "components/store/Store";

import StickyHeading from "components/StickyHeading";
import ConnectedAgencySelector from "components/AgencySelector";
import ConnectedRouteSelector from "components/RouteSelector";
import Map from "components/Map";
import Prediction from "components/Prediction";

import { Button } from "react-bootstrap";

class NextTrainApp extends React.Component {
  static propTypes = {
    step: PropTypes.number,
    nextStep: PropTypes.func,
    prevStep: PropTypes.func,
    fetchAgencies: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.props.fetchAgencies();
  }

  render = () => {
    const wizardPosition = {
      marginLeft: -this.props.step * Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    };

    return (
      <div>
        <StickyHeading />
        <div className="WizardContainer">
          <div style={ wizardPosition } className="Wizard">
            <div className="Wizard__Step">
              Select an agency:
              <ConnectedAgencySelector />
              <Button onClick={ this.props.nextStep }>Next</Button>
            </div>
            <div className="Wizard__Step">
              Select a route:
              <ConnectedRouteSelector />
              (Route selection is optional but recommended)
              <Button onClick={ this.nextStep }>Next</Button>
            </div>
            <div className="Wizard__Step">
              <Map />
            </div>
            <div className="Wizard__Step">
              <Prediction />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    step: state.step,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    nextStep: () => dispatch(actions.nextStep()),
    prevStep: () => dispatch(actions.prevStep()),
    fetchAgencies: () => dispatch(actions.fetchAgencies()),
  };
};
const ConnectedNextTrainApp = connect(mapStateToProps, mapDispatchToProps)(NextTrainApp);

const NextTrainAppContainer = () => <Provider store={ store }><ConnectedNextTrainApp /></Provider>;
export default NextTrainAppContainer;

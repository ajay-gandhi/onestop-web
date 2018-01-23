import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Provider } from "react-redux";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import { actions, store } from "components/store/Store";

import StickyHeading from "components/StickyHeading";
import Wizard from "components/Wizard";
import ConnectedAgencySelector from "components/AgencySelector";
import ConnectedRouteSelector from "components/RouteSelector";
import Map from "components/Map";
import Prediction from "components/Prediction";

import { Button } from "react-bootstrap";

class NextTrainApp extends React.Component {
  static propTypes = {
    fetchAgencies: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.props.fetchAgencies();
  }

  render = () => {
    return (
      <div>
        <StickyHeading />
        <Wizard>
          <div>
            Select an agency:
            <ConnectedAgencySelector />
            <Button onClick={ this.props.nextStep }>Next</Button>
          </div>
          <div>
            Select a route:
            <ConnectedRouteSelector />
            (Route selection is optional but recommended)
            <Button onClick={ this.nextStep }>Next</Button>
          </div>
          <Map />
          <Prediction />
        </Wizard>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAgencies: () => dispatch(actions.fetchAgencies()),
  };
};
const ConnectedNextTrainApp = connect(null, mapDispatchToProps)(NextTrainApp);

const NextTrainAppContainer = () => <Provider store={ store }><ConnectedNextTrainApp /></Provider>;
export default NextTrainAppContainer;

import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Provider } from "react-redux";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import { actions, store } from "components/store/Store";

import ConnectedAgencySelector from "components/AgencySelector";
import ConnectedRouteSelector from "components/RouteSelector";
import Map from "components/Map";
import Prediction from "components/Prediction";

class NextTrainApp extends React.Component {
  static propTypes = {
    // selectedAgency: PropTypes.string,
    // selectedStop: PropTypes.string,
    // agencies: PropTypes.arrayOf(PropTypes.object),
    // stops: PropTypes.arrayOf(PropTypes.object),
    fetchAgencies: PropTypes.func,
    // fetchStops: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.props.fetchAgencies();
  }

  // handleAgencyChange = e => {
    // this.props.selectOption("agency", e.id);
    // this.props.fetchRoutes();
  // }
  // handleRouteChange = e => {
    // this.props.selectOption("route", e.id);
    // this.props.fetchStops();
  // }
  // handleStopChange = e => {
    // this.props.selectOption("stop", e.id);
    // this.props.getPrediction();
  // }

  render = () => {
    return (
      <div>
        <ConnectedAgencySelector />
        <ConnectedRouteSelector />
        (Route selection is optional but recommended)
        <Map />
        <Prediction />
      </div>
    );
  }
}

const mapStateToProps = () => ({});
// const mapStateToProps = (state) => {
  // return {
    // selectedAgency: state.selections.agency,
    // agencies: state.lists.agency.data,
  // };
// };
const mapDispatchToProps = (dispatch) => {
  return {
    // selectOption: (option, value) => dispatch(actions.selectOption(option, value)),

    fetchAgencies: () => dispatch(actions.fetchAgencies()),
    // fetchRoutes: () => dispatch(actions.fetchRoutes()),
    // fetchStops: () => dispatch(actions.fetchStops()),

    // getPrediction: () => dispatch(actions.getPrediction()),
  };
};
const ConnectedNextTrainApp = connect(mapStateToProps, mapDispatchToProps)(NextTrainApp);

const NextTrainAppContainer = () => <Provider store={ store }><ConnectedNextTrainApp /></Provider>;
export default NextTrainAppContainer;

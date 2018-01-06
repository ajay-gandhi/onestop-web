import React from "react";
import PropTypes from "prop-types";

import Select from "react-select";
import "react-select/dist/react-select.css";
import { connect } from "react-redux";
import { Provider } from "react-redux";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import { actions, store } from "components/store/Store";

class NextTrainApp extends React.Component {
  static propTypes = {
    selectedAgency: PropTypes.string,
    selectedRoute: PropTypes.string,
    selectedStop: PropTypes.string,

    agencies: PropTypes.arrayOf(PropTypes.object),
    routes: PropTypes.arrayOf(PropTypes.object),
    stops: PropTypes.arrayOf(PropTypes.object),

    selectOption: PropTypes.func,

    fetchAgencies: PropTypes.func,
    fetchRoutes: PropTypes.func,
    fetchStops: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.props.fetchAgencies();
  }

  handleAgencyChange = e => {
    this.props.selectOption("agency", e.id);
    this.props.fetchRoutes();
  }
  handleRouteChange = e => {
    this.props.selectOption("route", e.id);
    this.props.fetchStops();
  }
  handleStopChange = e => {
    this.props.selectOption("stop", e.id);
    this.props.getPrediction();
  }

  render = () => {
    return (
      <div>
        <p>Select an agency</p>
        <Select
          name="agency"
          value={ this.props.selectedAgency }
          onChange={ this.handleAgencyChange }
          labelKey="name"
          valueKey="id"
          options={ this.props.agencies }
        />
        <p>Select a route</p>
        <Select
          name="route"
          value={ this.props.selectedRoute }
          onChange={ this.handleRouteChange }
          labelKey="name"
          valueKey="id"
          options={ this.props.routes }
        />
        <p>Select a stop</p>
        <Select
          name="stop"
          value={ this.props.selectedStop }
          onChange={ this.handleStopChange }
          labelKey="name"
          valueKey="id"
          options={ this.props.stops }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedAgency: state.selections.agency,
    selectedRoute: state.selections.route,
    selectedStop: state.selections.stop,

    agencies: state.lists.agency.data,
    routes: state.lists.route.data,
    stops: state.lists.stop.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectOption: (option, value) => dispatch(actions.selectOption(option, value)),

    fetchAgencies: () => dispatch(actions.fetchAgencies()),
    fetchRoutes: () => dispatch(actions.fetchRoutes()),
    fetchStops: () => dispatch(actions.fetchStops()),

    getPrediction: () => dispatch(actions.getPrediction()),
  };
};
const ConnectedNextTrainApp = connect(mapStateToProps, mapDispatchToProps)(NextTrainApp);

const NextTrainAppContainer = () => <Provider store={ store }><ConnectedNextTrainApp /></Provider>;
export default NextTrainAppContainer;

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
    agencies: PropTypes.arrayOf(PropTypes.object),
    routes: PropTypes.arrayOf(PropTypes.object),
    stops: PropTypes.arrayOf(PropTypes.object),
    selectedAgency: PropTypes.string,
    selectedRoute: PropTypes.string,
    selectedStop: PropTypes.string,
    selectAgency: PropTypes.func,
    selectRoute: PropTypes.func,
    selectStop: PropTypes.func,
    fetchAgencies: PropTypes.func,
    fetchRoutes: PropTypes.func,
    fetchStops: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.props.fetchAgencies();
  }

  handleAgencyChange = e => {
    this.props.selectAgency(e.id);
    this.props.fetchRoutes();
  }
  handleRouteChange = e => {
    this.props.selectRoute(e.id);
    this.props.fetchStops();
  }
  handleStopChange = e => {
    this.props.selectAgency(e.id);
    this.props.fetchRoutes();
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
    selectedAgency: state.agencySelection,
    selectedRoute: state.routeSelection,
    selectedStop: state.stopSelection,
    agencies: state.agencyList.data,
    routes: state.routeList.data,
    stops: state.stopList.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectAgency: selectedAgency => dispatch(actions.selectOption("agency", selectedAgency)),
    selectRoute: selectedRoute => dispatch(actions.selectOption("route", selectedRoute)),
    selectStop: selectedStop => dispatch(actions.selectOption("stop", selectedStop)),
    fetchAgencies: () => dispatch(actions.fetchAgencies()),
    fetchRoutes: () => dispatch(actions.fetchRoutes()),
    fetchStops: () => dispatch(actions.fetchStops()),
  };
};
const ConnectedNextTrainApp = connect(mapStateToProps, mapDispatchToProps)(NextTrainApp);

const NextTrainAppContainer = () => <Provider store={ store }><ConnectedNextTrainApp /></Provider>;
export default NextTrainAppContainer;

// const mapStateToProps = () => ({});
// const mapDispatchToProps = (dispatch) => {
  // return {
    // movePlaylistItem: (source, dest) => dispatch(actions.movePlaylistItem(source, dest)),
    // moveQueueItem: (source, dest) => dispatch(actions.moveQueueItem(source, dest)),
  // };
// };

// const ConnectedYouMuseApp = connect(mapStateToProps, mapDispatchToProps)(YouMuseApp);

// const YouMuseAppContainer = () => <Provider store={ store }><ConnectedYouMuseApp /></Provider>;
// export default YouMuseAppContainer;

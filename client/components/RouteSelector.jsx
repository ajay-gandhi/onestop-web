import "components/scss/RouteSelector.scss";

import React from "react";
import PropTypes from "prop-types";

import Select from "react-select";
import "react-select/dist/react-select.css";
import { connect } from "react-redux";
import { actions } from "components/store/Store";

class RouteSelector extends React.Component {
  static propTypes = {
    selectedRoute: PropTypes.string,
    routes: PropTypes.object,
    isFetching: PropTypes.bool,
    selectRoute: PropTypes.func,
  };

  handleRouteChange = e => {
    this.props.selectRoute(e.id);
  }

  render = () => {
    return (
      <div className="RouteSelector">
        <label className="RouteSelector__label">Select a route:</label>
        <Select
          name="route"
          value={ this.props.selectedRoute }
          onChange={ this.handleRouteChange }
          disabled={ this.props.isFetching || this.props.routes.length === 0 }
          labelKey="name"
          valueKey="id"
          options={ Object.values(this.props.routes) }
        />
        <div className="RouteSelector__subtitle">(Route selection is optional but recommended)</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedRoute: state.selectedRoute,
    routes: state.routes.data,
    isFetching: state.routes.isFetching,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectRoute: selectedRoute => dispatch(actions.setValues({ selectedRoute })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteSelector);

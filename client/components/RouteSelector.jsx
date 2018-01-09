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
    selectRoute: PropTypes.func,
  };

  handleRouteChange = e => {
    this.props.selectRoute(e.id);
  }

  render = () => {
    return (
      <Select
        name="route"
        value={ this.props.selectedRoute }
        onChange={ this.handleRouteChange }
        labelKey="name"
        valueKey="id"
        options={ Object.values(this.props.routes) }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedRoute: state.selectedRoute,
    routes: state.routes.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectRoute: selectedRoute => dispatch(actions.setValues({ selectedRoute })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteSelector);

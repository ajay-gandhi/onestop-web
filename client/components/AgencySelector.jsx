import React from "react";
import PropTypes from "prop-types";

import Select from "react-select";
import "react-select/dist/react-select.css";
import { connect } from "react-redux";
import { actions } from "components/store/Store";

class AgencySelector extends React.Component {
  static propTypes = {
    selectedAgency: PropTypes.string,
    agencies: PropTypes.arrayOf(PropTypes.object),
    selectAgency: PropTypes.func,
    fetchStops: PropTypes.func,
  };

  handleAgencyChange = e => {
    this.props.selectAgency(e.id);
    this.props.fetchStops();
  }

  render = () => {
    return (
      <Select
        name="agency"
        value={ this.props.selectedAgency }
        onChange={ this.handleAgencyChange }
        labelKey="name"
        valueKey="id"
        options={ this.props.agencies }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedAgency: state.selectedAgency,
    agencies: state.agencies.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectAgency: selectedAgency => dispatch(actions.setValues({ selectedAgency })),
    fetchStops: () => dispatch(actions.fetchStops()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgencySelector);

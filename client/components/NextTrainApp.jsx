import React from "react";
import PropTypes from "prop-types";

import Select from "react-select";
import "react-select/dist/react-select.css";
import { connect } from "react-redux";
import { Provider } from "react-redux";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import { actions, store } from "components/store/Store";

// import IndexPage from "components/IndexPage";
// import PlayerPage from "components/PlayerPage";

class NextTrainApp extends React.Component {
  static propTypes = {
    agencies: PropTypes.arrayOf(PropTypes.object),
    selectedAgency: PropTypes.string,
    fetchAgencies: PropTypes.func,
    selectAgency: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.props.fetchAgencies();
  }

  handleAgencyChange = e => this.props.selectAgency(e.id);

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
    selectedAgency: state.agencySelection,
    agencies: state.agencyList.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectAgency: selectedAgency => dispatch(actions.selectOption("agency", selectedAgency)),
    fetchAgencies: () => dispatch(actions.fetchAgencies()),
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

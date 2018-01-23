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
import StopSelector from "components/StopSelector";
import Prediction from "components/Prediction";

class NextTrainApp extends React.Component {
  static propTypes = {
    fetchAgencies: PropTypes.func,
    selectedAgency: PropTypes.string,
    selectedStop: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.props.fetchAgencies();
  }

  render = () => {
    const sections = [
      {
        child: <ConnectedAgencySelector />,
        disabled: !this.props.selectedAgency,
      },
      {
        child: <ConnectedRouteSelector />,
      },
      {
        child: <StopSelector />,
        disabled: !this.props.selectedStop,
      },
      {
        child: <Prediction />,
        disabled: true,
      },
    ];

    return (
      <div>
        <StickyHeading />
        <Wizard sections={ sections } />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedAgency: state.selectedAgency,
    selectedStop: state.selectedStop,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAgencies: () => dispatch(actions.fetchAgencies()),
  };
};
const ConnectedNextTrainApp = connect(mapStateToProps, mapDispatchToProps)(NextTrainApp);

const NextTrainAppContainer = () => <Provider store={ store }><ConnectedNextTrainApp /></Provider>;
export default NextTrainAppContainer;

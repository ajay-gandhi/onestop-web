import "components/scss/Wizard.scss";

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actions } from "components/store/Store";

const Wizard = (props) => {
  const wizardPosition = {
    marginLeft: -props.step * Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  };

  const steps = props.children.map((child, i) => (
    <div key={ i } className="Wizard__Step">{ child }</div>
  ));

  return (
    <div className="WizardContainer">
      <div style={ wizardPosition } className="WizardContainer__Wizard">
        { steps }
      </div>
    </div>
  );
};
Wizard.propTypes = {
  step: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    step: state.step,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    nextStep: () => dispatch(actions.nextStep()),
    prevStep: () => dispatch(actions.prevStep()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wizard);

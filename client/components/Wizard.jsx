import "components/scss/Wizard.scss";

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actions } from "components/store/Store";

import { Button } from "react-bootstrap";

const Wizard = (props) => {
  const wizardPosition = {
    marginLeft: -props.step * Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  };

  const steps = props.sections.map(({ child, disabled }, i) => (
    <div key={ i } className="Wizard__Step">
      { child }
      <div className="Step__Navigation">
        <Button className="Navigation__button" onClick={ props.prevStep }>Back</Button>
        <Button className="Navigation__button" disabled={ disabled } onClick={ props.nextStep } bsStyle="success">Next</Button>
      </div>
    </div>
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
  sections: PropTypes.arrayOf(PropTypes.shape({
    child: PropTypes.node,
    disabled: PropTypes.bool,
  })),
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

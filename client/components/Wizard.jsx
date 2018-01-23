import "components/scss/Wizard.scss";

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actions } from "components/store/Store";

import { Button } from "react-bootstrap";

class Wizard extends React.Component {
  static propTypes = {
    step: PropTypes.number,
    sections: PropTypes.arrayOf(PropTypes.shape({
      child: PropTypes.node,
      disabled: PropTypes.bool,
    })),
    nextStep: PropTypes.func,
    prevStep: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    };
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.debouncedWindowResize);
  }
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.debouncedWindowResize);
  }

  debouncedWindowResize = () => {
    if (!this.timeout) {
      this.setState({
        windowWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      });
      this.timeout = setTimeout(() => { this.timeout = null; }, 500);
    }
  }

  render = () => {
    const wizardPosition = {
      marginLeft: -this.props.step * this.state.windowWidth,
    };

    const steps = this.props.sections.map(({ child, disabled }, i) => (
      <div key={ i } className="Wizard__Step">
        { child }
        <div className="Step__Navigation">
          <Button className="Navigation__button" onClick={ this.props.prevStep }>Back</Button>
          <Button className="Navigation__button" disabled={ !!disabled } onClick={ this.props.nextStep } bsStyle="success">Next</Button>
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
}

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

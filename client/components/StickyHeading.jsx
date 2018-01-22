import "components/scss/StickyHeading.scss";

import React from "react";
import PropTypes from "prop-types";
import { ProgressBar } from "react-bootstrap";

const steps = ["Select Agency", "Select Route", "Select Stop", "Confirm Stop"];
const StickyHeading = (props) => (
  <header className="StickyHeader">
    <h1 className="StickyHeader__title">Whenstop</h1>
    <span className="StickyHeader__step">{ steps[props.step] }</span>
    <ProgressBar className="StickyHeader__progress" bsStyle="success" now={ props.step / steps.length * 100 } />
  </header>
);
StickyHeading.propTypes = {
  step: PropTypes.number,
};

export default StickyHeading;

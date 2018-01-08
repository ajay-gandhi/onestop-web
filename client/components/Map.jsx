import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import GoogleMap from "google-map-react";
import Icon from "components/Icon";

const StopMarker = (props) => (
  <div className="StopMarker">
    <Icon glyph={ props.glyph } />
  </div>
);

class Map extends React.Component {
  static propTypes = {
    stops: PropTypes.object,
    center: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    zoom: PropTypes.number,
  };
  static defaultProps = {
    center: {
      lat: 37.7578,
      lng: -122.4447,
    },
    zoom: 11,
  };

  render = () => {
    const stops = Object.values(this.props.stops).map((stop) => (
      <StopMarker
        key={ stop.id }
        lat={ stop.lat }
        lng={ stop.lng }
        glyph="directions_bus"
      />
    ));
    return (
      <div className="MapContainer" style={ { width: "400px", height: "400px" } }>
        <GoogleMap
          defaultCenter={ this.props.center }
          defaultZoom={ this.props.zoom }
        >
          { stops }
        </GoogleMap>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    stops: state.stops.data,
  };
};

export default connect(mapStateToProps)(Map);

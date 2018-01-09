import "components/scss/Map.scss";

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import GoogleMap from "google-map-react";
import Icon from "components/Icon";
import Bus from "components/Bus";

const StopMarker = (props) => {
  return (
    <div className="StopMarker">
      <Icon glyph="directions_bus" />
    </div>
  );
};

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

  componentWillReceiveProps = (nextProps) => {
    const markers = Object.values(nextProps.stops).map((stop) => {
      return new this.mapApi.Marker({
        position: new this.mapApi.LatLng(stop.lat, stop.lng),
        map: this.map,
        title: stop.name,
        icon: "https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/T1E8AWuYkAS.png",
        // icon: {
          // path: Bus,
        // },
      });
    });
  }

  setMap = ({ map, maps }) => {
    this.map = map;
    this.mapApi = maps;
  }

  render = () => {
    // const stops = Object.values(this.props.stops).map((stop) => (
      // <StopMarker key={ stop.id } lat={ stop.lat } lng={ stop.lng } />
    // ));

    return (
      <div className="MapContainer" style={ { width: "400px", height: "400px" } }>
        <GoogleMap
          defaultCenter={ this.props.center }
          defaultZoom={ this.props.zoom }
          onGoogleApiLoaded={ this.setMap }
        >
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

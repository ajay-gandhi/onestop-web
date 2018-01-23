import "components/scss/StopSelector.scss";

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actions } from "components/store/Store";

import GoogleMap from "google-map-react";

class StopSelector extends React.Component {
  static propTypes = {
    stops: PropTypes.object,
    selectStop: PropTypes.func,
    selectedRoute: PropTypes.object,
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
  state = {};

  componentWillReceiveProps = (nextProps) => {
    // Create markers
    if (nextProps.stops !== this.props.stops) {
      const markers = Object.values(nextProps.stops).reduce((memo, stop) => {
        const marker = new this.mapApi.Marker({
          position: new this.mapApi.LatLng(stop.lat, stop.lng),
          map: this.map,
          title: stop.name,
          icon: "https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/T1E8AWuYkAS.png",
        });

        this.mapApi.event.addListener(marker, "mouseover", () => {
          this.setState({ hoveredStop: stop });
        });
        this.mapApi.event.addListener(marker, "click", () => {
          this.props.selectStop(stop.id);
        });

        memo[stop.id] = marker;
        return memo;
      }, {});
      this.setState({ markers });
    }

    // Filter markers by route
    if (nextProps.selectedRoute !== this.props.selectedRoute && this.state.markers) {
      this.hideAllMarkers();
      nextProps.selectedRoute.stopIds.forEach((stopId) => {
        this.state.markers[stopId].setMap(this.map);
      });
    }
  }

  setMap = ({ map, maps }) => {
    this.map = map;
    this.mapApi = maps;
  }
  hideAllMarkers = () => {
    if (this.state.markers) Object.values(this.state.markers).forEach(marker => marker.setMap(null));
  }

  render = () => {
    let hoveredText;
    if (this.state.hoveredStop) {
      hoveredText = (
        <div className="StopSelector__hoverStatus">
          { `${this.state.hoveredStop.name} (${this.state.hoveredStop.id})` }
        </div>
      );
    }

    const selectedStop = this.props.stops[this.props.selectedStop];
    const selectedText = selectedStop ? `Selected: ${selectedStop.name}` : "Select a stop";

    return (
      <div className="StopSelector">
        <div className="StopSelector__MapContainer">
          <GoogleMap
            defaultCenter={ this.props.center }
            defaultZoom={ this.props.zoom }
            onGoogleApiLoaded={ this.setMap }
          >
          </GoogleMap>
        </div>
        { hoveredText }
        <h4 className="StopSelector__selectedStatus">{ selectedText }</h4>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    stops: state.stops.data,
    selectedRoute: state.routes.data[state.selectedRoute],
    selectedStop: state.selectedStop,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectStop: selectedStop => dispatch(actions.setValues({ selectedStop })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StopSelector);

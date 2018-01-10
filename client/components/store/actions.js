import fetch from "cross-fetch";
import { ACTION_TYPES } from "./constants";

import X2JS from "x2js";

const x2js = new X2JS();

/** Sync actions **/
const setValues = (values) => {
  return {
    type: ACTION_TYPES.setValues,
    values,
  };
};

/** Sync actions for use by async actions **/
const requestData = (model) => {
  return {
    type: ACTION_TYPES.requestData,
    model,
  };
};
const doneRequestingData = (model) => {
  return {
    type: ACTION_TYPES.doneRequestingData,
    model,
  };
};
const setData = (model) => {
  return {
    type: ACTION_TYPES.setData,
    model,
  };
};

/** Async actions **/
const apiBase = "http://webservices.nextbus.com/service/publicXMLFeed?command=";
const fetchAgencies = () => {
  return (dispatch) => {
    dispatch(requestData("agencies"));
    return fetch(`${apiBase}agencyList`).then(
      response => response.text(),
      error => console.log("Error fetching agencies", error)
    ).then((xml) => {
      const data = x2js.xml2js(xml);
      const agencies = data.body.agency.map((agency) => {
        return {
          id: agency._tag,
          name: agency._title,
          region: agency._regionTitle,
        };
      });
      dispatch(setData({ agencies }));
      dispatch(doneRequestingData("agencies"));
    });
  };
};
const fetchStops = () => {
  return (dispatch, getState) => {
    dispatch(requestData("stops"));
    dispatch(requestData("routes"));
    const state = getState();
    return fetch(`${apiBase}routeConfig&a=${state.selectedAgency}`).then(
      response => response.text(),
      error => console.log("Error fetching stops", error)
    ).then((xml) => {
      const data = x2js.xml2js(xml);
      const agg = data.body.route.reduce((memo, route) => {
        // Aggregate stops and connect to routes
        const stopList = [];
        route.stop.forEach((stop) => {
          stopList.push(stop._tag);
          if (!memo.stops[stop._tag]) {
            memo.stops[stop._tag] = {
              id: stop._tag,
              stopId: stop._stopId,
              name: stop._title,
              lat: stop._lat,
              lng: stop._lon,
              routes: [route._tag],
            };
          }
        });

        // Aggregate routes
        memo.routes[route._tag] = {
          id: route._tag,
          name: route._title,
          stopIds: stopList,
        };
        return memo;
      }, {
        stops: {},
        routes: {},
      });

      dispatch(setData({ stops: agg.stops }));
      dispatch(setData({ routes: agg.routes }));
      dispatch(doneRequestingData("routes"));
      dispatch(doneRequestingData("stops"));
    });
  };
};
const getPredictions = () => {
  return (dispatch, getState) => {
    dispatch(requestData("predictions"));
    const state = getState();
    const stopId = state.stops.data[state.selectedStop].stopId;
    const routeParam = state.selectedRoute ? `&r=${state.selectedRoute}` : "";
    return fetch(`${apiBase}predictions&a=${state.selectedAgency}${routeParam}&stopId=${stopId}`).then(
      response => response.text(),
      error => console.log("Error fetching prediction list", error)
    ).then((xml) => {
      const data = x2js.xml2js(xml);
      const predictions = data.body.predictions.direction;
      dispatch(setData({ predictions }));
      dispatch(doneRequestingData("predictions"));
    });
  };
};

const actions = {
  // Sync,
  setValues,

  // Async
  fetchAgencies,
  fetchStops,
  getPredictions,
};
export default actions;

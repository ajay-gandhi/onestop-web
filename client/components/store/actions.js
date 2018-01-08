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
    const state = getState();
    return fetch(`${apiBase}routeConfig&a=${state.selectedAgency}`).then(
      response => response.text(),
      error => console.log("Error fetching stops", error)
    ).then((xml) => {
      const data = x2js.xml2js(xml);
      const stops = data.body.route.reduce((memo, route) => {
        route.stop.forEach((stop) => {
          if (!memo[stop._tag]) {
            memo[stop._tag] = {
              id: stop._tag,
              name: stop._title,
              lat: stop._lat,
              lng: stop._lon,
            };
          }
        });
        return memo;
      }, {});
      dispatch(setData({ stops }));
      dispatch(doneRequestingData("stops"));
    });
  };
};
// const getPrediction = () => {
  // return (dispatch, getState) => {
    // dispatch(requestOption("stop"));
    // const state = getState();
    // return fetch(`${apiBase}predictions&a=${state.selections.agency}&routeTag=${state.selections.route}&stopId=${state.selections.stop}`).then(
      // response => response.text(),
      // error => console.log("Error fetching stop list", error)
    // ).then((xml) => {
      // const data = x2js.xml2js(xml);
      // console.log(data);
      // // const stopList = data.body.route.stop.map((stop) => {
        // // return {
          // // id: stop._stopId,
          // // name: stop._title,
        // // };
      // // });
      // // dispatch(setOptionList("stop", stopList));
      // dispatch(doneRequestingOption("stop"));
    // });
  // };
// };

const actions = {
  // Sync,
  setValues,

  // Async
  fetchAgencies,
  fetchStops,
  // getPrediction,
};
export default actions;

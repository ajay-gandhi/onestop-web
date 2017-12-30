import fetch from "cross-fetch";
import { ACTION_TYPES } from "./constants";

import X2JS from "x2js";

const x2js = new X2JS();

/** Sync actions **/
const selectOption = (option, value) => {
  return {
    type: ACTION_TYPES.selectOption,
    option,
    value,
  };
};

/** Sync actions for use by async actions **/
const requestOption = (option) => {
  return {
    type: ACTION_TYPES.requestOption,
    option,
  };
};
const doneRequestingOption = (option) => {
  return {
    type: ACTION_TYPES.doneRequestingOption,
    option,
  };
};
const setOptionList = (option, data) => {
  return {
    type: ACTION_TYPES.setOptionList,
    option,
    data,
  };
};

/** Async actions **/
const apiBase = "http://webservices.nextbus.com/service/publicXMLFeed?command=";
const fetchAgencies = () => {
  return (dispatch, getState) => {
    dispatch(requestOption("agency"));
    return fetch(`${apiBase}agencyList`).then(
      response => response.text(),
      error => console.log("Error fetching agency list", error)
    ).then((xml) => {
      const data = x2js.xml2js(xml);
      const agencyList = data.body.agency.map((agency) => {
        return {
          id: agency._tag,
          name: agency._title,
          region: agency._regionTitle,
        };
      });
      dispatch(setOptionList("agency", agencyList));
      dispatch(doneRequestingOption("agency"));
    });
  };
};

const actions = {
  // Sync,
  selectOption,

  // Async
  fetchAgencies,
};
export default actions;

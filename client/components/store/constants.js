export const ACTION_TYPES = Object.freeze({
  nextStep: "NEXT_STEP",
  prevStep: "PREV_STEP",

  setValues: "SET_VALUES",
  requestData: "REQUEST_DATA",
  doneRequestingData: "DONE_REQUESTING_DATA",
  setData: "SET_DATA",
});

export const INITIAL_STATE = Object.freeze({
  step: 0,
  selectedAgency: "",
  agencies: {
    isFetching: false,
    data: [],
  },
  routes: {
    isFetching: false,
    data: {},
  },
  stops: {
    isFetching: false,
    data: {},
  },
  predictions: {
    isFetching: false,
    data: {},
  },
});

export const ACTION_TYPES = Object.freeze({
  selectOption: "SELECT_OPTION",
  setOptionList: "SET_OPTION_LIST",
  requestOption: "REQUEST_OPTION",
  doneRequestingOption: "DONE_REQUESTING_OPTION",
});

export const INITIAL_STATE = Object.freeze({
  selections: {},
  lists: {
    agency: {},
    route: {},
    direction: {},
    stop: {},
  },
});

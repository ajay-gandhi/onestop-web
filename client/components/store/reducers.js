import { ACTION_TYPES, INITIAL_STATE } from "./constants";

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.nextStep:
      return {
        ...state,
        step: state.step + 1,
      };

    case ACTION_TYPES.prevStep:
      return {
        ...state,
        step: state.step - 1,
      };

    case ACTION_TYPES.setValues:
      return {
        ...state,
        ...action.values,
      };

    case ACTION_TYPES.requestData:
      return {
        ...state,
        [action.model]: {
          isFetching: true,
          data: state[action.model].data,
        },
      };

    case ACTION_TYPES.doneRequestingData:
      return {
        ...state,
        [action.model]: {
          isFetching: false,
          data: state[action.model].data,
        },
      };

    case ACTION_TYPES.setData: {
      const key = Object.keys(action.model)[0];
      return {
        ...state,
        [key]: {
          isFetching: state[key].isFetching,
          data: action.model[key],
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;

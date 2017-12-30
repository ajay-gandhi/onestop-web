import { ACTION_TYPES, INITIAL_STATE } from "./constants";

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.selectOption:
      return {
        ...state,
        [`${action.option}Selection`]: action.value,
      };

    case ACTION_TYPES.requestOption:
      return {
        ...state,
        [`${action.option}List`]: {
          isFetching: true,
          data: state[`${action.option}List`].data,
        },
      };

    case ACTION_TYPES.doneRequestingOption:
      return {
        ...state,
        [`${action.option}List`]: {
          isFetching: false,
          data: state[`${action.option}List`].data,
        },
      };

    case ACTION_TYPES.setOptionList:
      return {
        ...state,
        [`${action.option}List`]: {
          isFetching: state[`${action.option}List`].isFetching,
          data: action.data,
        },
      };

    default:
      return state;
  }
};

export default reducer;

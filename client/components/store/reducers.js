import { ACTION_TYPES, INITIAL_STATE } from "./constants";

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.selectOption:
      return {
        ...state,
        selections: {
          ...state.selections,
          [action.option]: action.value,
        },
      };

    case ACTION_TYPES.requestOption:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.option]: {
            isFetching: true,
            data: state.lists[action.option].data,
          },
        },
      };

    case ACTION_TYPES.doneRequestingOption:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.option]: {
            isFetching: false,
            data: state.lists[action.option].data,
          },
        },
      };

    case ACTION_TYPES.setOptionList:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.option]: {
            isFetching: state.lists[action.option].isFetching,
            data: action.data,
          },
        },
      };

    default:
      return state;
  }
};

export default reducer;

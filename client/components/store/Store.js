import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { INITIAL_STATE } from "./constants";
import actions from "./actions";
import reducer from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  INITIAL_STATE,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export {
  store,
  actions,
};

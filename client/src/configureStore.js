import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./redux/reducers";
import { loadState, saveState } from "./redux/middleware/storage";
import { logger } from "./redux/middleware/logger";
import throttle from "./redux/middleware/throttle";
import immutableCheckMiddleware from "redux-immutable-state-invariant";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
  const persistedState = loadState();
  const devMiddleware = [thunk, throttle, immutableCheckMiddleware(), logger];
  const middleware = composeEnhancers(applyMiddleware(...devMiddleware));
  const store = createStore(reducers, persistedState, middleware);

  store.subscribe(
    throttle(() => {
      saveState({
        auth: store.getState()
      });
    }, 1000)
  );

  window.store = store;
  return store;
};

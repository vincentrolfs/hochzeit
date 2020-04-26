import {applyMiddleware, createStore} from "redux";
import rootReducer from "../reducers";
import {logger} from "redux-logger";

export const store = createStore(
    rootReducer,
    applyMiddleware(logger)
);

let latestState = store.getState();
export const subscribeWithState = (listener) => store.subscribe(() => {
    const savePreviousState = latestState;
    latestState = store.getState();
    listener(latestState, savePreviousState);
});

import reducers, {initialState} from "./reducers";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

export const initStore = (state = initialState) => createStore(
    reducers,
    state,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);
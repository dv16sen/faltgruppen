import {actionTypes} from "./actionTypes";
import {combineReducers} from "redux";

export const initialState = {
    events: []
};

export const events = (state = [], action) => {
    switch(action.type){
    case actionTypes.updateEvents:
        return action.payload;
    default:
        return state;
    }
};

export default combineReducers({
    events
});
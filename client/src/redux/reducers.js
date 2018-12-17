import {actionTypes} from "./actionTypes";
import {combineReducers} from "redux";

export const initialState = {
    events: [],
    editEvent: -1
};

export const editEvent = (state = -1, action) => {
    switch(action.type){
    case actionTypes.editEvent:
        return action.payload;
    default:
        return state;
    }
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
    events,
    editEvent
});
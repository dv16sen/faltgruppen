import {actionTypes} from "./actionTypes";

export const updateEvents = (events) => ({
    type: actionTypes.updateEvents,
    payload: events
});
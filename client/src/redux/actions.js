import {actionTypes} from "./actionTypes";

export const updateEvents = (events) => ({
    type: actionTypes.updateEvents,
    payload: events
});

export const editEvent = (eventId) => ({
    type: actionTypes.editEvent,
    payload: eventId
});
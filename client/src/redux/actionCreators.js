import {updateEvents} from "./actions";
import {eventApi} from "../utils/api";

export const fetchAndUpdateEvents = () => () => async (dispatch) => {
    return eventApi.get().then(events => dispatch(updateEvents(events)));
};
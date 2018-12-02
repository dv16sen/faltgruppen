import {actionTypes} from "./actionTypes";

export const sampleAction = (string) => ({
    type: actionTypes.sampleAction,
    payload: string
});
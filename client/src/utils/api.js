import {apiRoutes} from "./constants/apiRoutes";
import axios from "axios";

export const eventApi = {
    get: async () => axios.get(apiRoutes.event).then(res => res.data),
    insert: async (event) => axios.post(apiRoutes.event, event),
    delete: async (query) => axios.delete(apiRoutes.event, {params: query}),
    update: async (event, query) => axios({
        method: "PUT",
        url: apiRoutes.event,
        data: event,
        params: query
    })
};
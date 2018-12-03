const api = `/api`;
const sample = `${api}/sample`;
const event = `${api}/event`;

interface Routes {
    [x: string]: any
}

export const routes: Routes = {
    sample,
    event
};
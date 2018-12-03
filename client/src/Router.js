import React, {Fragment} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {EventPage} from "./pages/EventPage";
import {HomePage} from "./pages/HomePage";
import {routes} from "./utils/constants/routes";

export const Router = () => (
    <BrowserRouter>
        <Fragment>
            <Route exact path={routes.eventPage} component={EventPage}/>
            <Route exact path={routes.homePage} component={HomePage}/>
        </Fragment>
    </BrowserRouter>
);
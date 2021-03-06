import React, {Fragment} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {AddEventPage} from "./pages/AddEventPage";
import {EditEventPage} from "./pages/EditEventPage";
import {HomePage} from "./pages/HomePage";
import {routes} from "./utils/constants/routes";

export const Router = () => (
    <BrowserRouter>
        <Fragment>
            <Switch>
                <Route exact path={routes.addEventPage} component={AddEventPage}/>
                <Route exact path={routes.editEventPage} component={EditEventPage}/>
                <Route exact path={routes.homePage} component={HomePage}/>
            </Switch>
        </Fragment>
    </BrowserRouter>
);
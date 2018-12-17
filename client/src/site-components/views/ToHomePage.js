import React from "react";
import {Icon, Segment} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import {routes} from "../../utils/constants/routes";

export const ToHomePage = withRouter(({history}) => (
    <Segment
        id="back-to-home"
        attached="bottom"
        className="clickable bg-color-lighter-gray color-black"
        onClick={() => {
            history.push(routes.homePage)
        }}
    >
        <h3><Icon name="arrow left"/> Tillbaka</h3>
    </Segment>
));
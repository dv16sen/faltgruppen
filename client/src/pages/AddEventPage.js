import React from "react";
import {Page} from "../site-components/views/Page";
import GeolocationView from "../site-components/views/GeolocationView";
import EventContainer from "../site-components/containers/EventContainer";
import AddEventView from "../site-components/views/AddEventView";
import {routes} from "../utils/constants/routes";
import {Link} from "react-router-dom";
import {Button, Icon} from "semantic-ui-react";

export const AddEventPage = () => (
    <Page id="event-page" className="wrapper-4 pt-15">
        <EventContainer>
            <AddEventView/>
        </EventContainer>
        <GeolocationView/>
        <Link to={routes.homePage}>
            <Button icon labelPosition='left'>
                <Icon name='left arrow'/>
                Tillbaka
            </Button>
        </Link>
    </Page>
);
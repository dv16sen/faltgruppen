import React from "react";
import {Page} from "../site-components/views/Page";
import {Link} from "react-router-dom";
import {routes} from "../utils/constants/routes";
import {Button, Icon} from "semantic-ui-react";
import EventContainer from "../site-components/containers/EventContainer";
import {EventView} from "../site-components/views/EventView";

export const HomePage = () => (
    <Page id="home-page" className="wrapper-4 pt-15">
        <EventContainer>
            <EventView/>
        </EventContainer>
        <Link to={routes.addEventPage}>
            <Button icon floated="right" labelPosition='right'>
                Lägg till event
                <Icon name='right arrow' />
            </Button>
        </Link>
    </Page>
);
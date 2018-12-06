import React from "react";
import {Page} from "../site-components/views/Page";
import {Link} from "react-router-dom";
import {routes} from "../utils/constants/routes";
import {Button} from "semantic-ui-react";
import EventContainer from "../site-components/containers/EventContainer";
import {EventView} from "../site-components/views/EventView";

export const HomePage = () => (
    <Page id="home-page" className="wrapper-3 p-15">
        <EventContainer>
            <EventView>
                <Link to={routes.addEventPage}>
                    <Button primary fluid>
                        Lägg till händelse
                    </Button>
                </Link>
            </EventView>
        </EventContainer>
    </Page>
);
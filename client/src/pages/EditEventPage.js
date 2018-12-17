import React from "react";
import {Page} from "../site-components/views/Page";
import EventContainer from "../site-components/containers/EventContainer";
import EditEventView from "../site-components/views/EditEventView";
import {ToHomePage} from "../site-components/views/ToHomePage";

export const EditEventPage = () => (
    <Page id="event-page">
        <EventContainer>
            <EditEventView/>
        </EventContainer>
        <ToHomePage/>
    </Page>
);
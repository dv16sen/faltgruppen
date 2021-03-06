import React from "react";
import {Page} from "../site-components/views/Page";
import EventContainer from "../site-components/containers/EventContainer";
import AddEventView from "../site-components/views/AddEventView";
import {ToHomePage} from "../site-components/views/ToHomePage";

export const AddEventPage = () => (
    <Page id="event-page">
        <EventContainer>
            <AddEventView/>
        </EventContainer>
        <ToHomePage/>
    </Page>
);
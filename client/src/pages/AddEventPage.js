import React from "react";
import {Page} from "../site-components/views/Page";
import EventContainer from "../site-components/containers/EventContainer";
import AddEventView from "../site-components/views/AddEventView";

export const AddEventPage = () => (
    <Page id="event-page" className="wrapper-4 p-15">
        <EventContainer>
            <AddEventView/>
        </EventContainer>
    </Page>
);
import React from "react";
import {Page} from "../site-components/views/Page";
import EventContainer from "../site-components/containers/EventContainer";
import EventView from "../site-components/views/EventView";

export const HomePage = () => (
    <Page id="home-page">
        <EventContainer>
            <EventView/>
        </EventContainer>
    </Page>
);
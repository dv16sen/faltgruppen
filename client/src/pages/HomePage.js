import React from "react";
import {Page} from "../site-components/views/Page";
import SampleContainer from "../site-components/containers/SampleContainer";
import {SampleView} from "../site-components/views/SampleView";
import GeolocationView from "../site-components/views/GeolocationView";
import EventContainer from "../site-components/containers/EventContainer";
import AddEventView from "../site-components/views/AddEventView";
import {EventView} from "../site-components/views/EventView";

export const HomePage = () => (
    <Page id="home-page" className="wrapper-4 pt-15">
        <SampleContainer>
            <SampleView/>
        </SampleContainer>
        <GeolocationView/>
        <EventContainer>
            <AddEventView/>
            <EventView/>
        </EventContainer>
    </Page>
);
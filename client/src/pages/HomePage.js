import React from "react";
import {Page} from "../site-components/views/Page";
import SampleContainer from "../site-components/containers/SampleContainer";
import {SampleView} from "../site-components/views/SampleView";
import {Link} from "react-router-dom";
import {routes} from "../utils/constants/routes";
import {Button, Icon} from "semantic-ui-react";

export const HomePage = () => (
    <Page id="home-page" className="wrapper-4 pt-15">
        <SampleContainer>
            <SampleView/>
        </SampleContainer>
        <Link to={routes.eventPage}>
            <Button icon floated="right" labelPosition='right'>
                Se event
                <Icon name='right arrow' />
            </Button>
        </Link>
    </Page>
);
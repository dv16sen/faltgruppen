import React from "react";
import {Button, Segment} from "semantic-ui-react";

export const SampleView = ({
    databaseSamples,
    reduxSample,
    onSampleChange,
    children,
    ...props
}) => (
    <Segment.Group {...props}>
        <Segment>
            <h2 className="ui header">Sample Redux State</h2>
            <p>{reduxSample}</p>
            <Button
                className="primary"
                onClick={onSampleChange}>
                Change Sample Redux State
            </Button>
        </Segment>
        <Segment>
            <h2 className="ui header">Sample Database data</h2>
            <ul className="ui list">
                {databaseSamples.map((sample, i) => (<li key={i}>{sample.text}</li>))}
            </ul>
        </Segment>
        {children}
    </Segment.Group>
);
import React from "react";
import {Segment} from "semantic-ui-react";

export const EventView = ({eventProps, ...props}) => {
    const {events} = eventProps;

    return (
        <Segment>
            <h2 className="ui header">Event</h2>
            <table className="ui table" {...props}>
                <thead>
                <tr>
                    <th>Kön</th>
                    <th>Plats</th>
                    <th>Åtgärd</th>
                </tr>
                </thead>
                <tbody>
                {events.map((event, i) => (
                    <tr key={i}>
                        <td>{event.gender}</td>
                        <td>{event.location}</td>
                        <td>{event.measure}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Segment>
    );
};
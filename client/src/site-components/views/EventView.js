import React from "react";
import {Segment} from "semantic-ui-react";
import {Moment} from "../../components/views/Moment";
import {eventProps} from "../types/eventProps";

export const EventView = ({events, children, ...props}) => {
    return (
        <Segment>
            <h2 className="ui header">Händelser</h2>
            <table className="ui unstackable celled table" {...props}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Kön</th>
                    <th>Plats</th>
                    <th>Åtgärd</th>
                    <th>Skapad</th>
                    <th>Uppdaterad</th>
                </tr>
                </thead>
                <tbody>
                {events.entries.map((event, i) => (
                    <tr key={i}>
                        <td>{event.id}</td>
                        <td>{event.gender}</td>
                        <td>{event.location}</td>
                        <td>{event.measure}</td>
                        <td><Moment time={event.createdAt}/></td>
                        <td><Moment time={event.updatedAt}/></td>
                    </tr>
                ))}
                </tbody>
            </table>
            {children}
        </Segment>
    );
};

EventView.propTypes = eventProps;
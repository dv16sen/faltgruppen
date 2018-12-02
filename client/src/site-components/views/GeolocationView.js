import React from "react";
import withGeolocation from "../../components/hocs/withGeolocation";
import {Message, Segment} from "semantic-ui-react";

const GeolocationView = ({geolocation, ...props}) => {
    const renderGeolocation = () => {
        const {loading, available, error, position} = geolocation;

        if(loading){
            return null;
        } else if(!available){
            return (
                <Message
                    error
                    header="Not available on your device"
                />
            );
        } else if(error){
            return (
                <Message
                    error
                    header="Something went wrong when fetching your position"
                />
            );
        }

        return (
            <table className="ui unstackable definition table">
                <tbody>
                <tr>
                    <td>Latitude:</td>
                    <td>{position.coords.latitude}</td>
                </tr>
                <tr>
                    <td>Longitude:</td>
                    <td>{position.coords.longitude}</td>
                </tr>
                <tr>
                    <td>Accuracy:</td>
                    <td>{position.coords.accuracy}</td>
                </tr>
                </tbody>
            </table>
        );
    };

    return (
        <Segment loading={geolocation.loading} {...props}>
            <h2 className="ui header">Your position</h2>
            {renderGeolocation()}
        </Segment>
    );
};

export default withGeolocation()(GeolocationView);
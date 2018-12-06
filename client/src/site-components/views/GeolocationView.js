import React, {PureComponent, Fragment} from "react";
import {Loader, Message} from "semantic-ui-react";
import {GoogleMap} from "./GoogleMap";
import {apiKeys} from "../../utils/constants/apiKeys";
import withGeolocation from "../../components/hocs/withGeolocation";
import {geolocationProps} from "../../components/types/geolocationProps";

class GeolocationView extends PureComponent {
    static propTypes = geolocationProps;

    render(){
        const {geolocation, ...props} = this.props;
        const {geocode, loading, available, error, position} = geolocation;

        if(loading){
            return <Loader active inline/>;
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
                    list={[error]}
                />
            );
        }

        return (
            <Fragment>
                <table className="ui unstackable definition table" {...props}>
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
                    {geocode.results.map((result, i) => (
                        <tr key={i}>
                            <td>{result.types[0]}:</td>
                            <td>{result.formatted_address}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <GoogleMap position={position}/>
            </Fragment>
        );
    }
}

export default withGeolocation(apiKeys.googleMap)(GeolocationView);
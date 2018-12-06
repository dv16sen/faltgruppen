import React, {Fragment} from "react";
import GoogleMapReact from "google-map-react";
import {Icon} from "semantic-ui-react";
import {apiKeys} from "../../utils/constants/apiKeys";

export const GoogleMap = ({position, style = {}, mapProps = {}, ...props}) => (
    <div style={{height: "250px", width: "100%", ...style}} {...props}>
        <GoogleMapReact
            bootstrapURLKeys={{key: apiKeys.googleMap}}
            defaultCenter={{
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }}
            defaultZoom={17}
            {...mapProps}
        >
            <Marker
                lat={position.coords.latitude}
                lng={position.coords.longitude}
            />
        </GoogleMapReact>
    </div>
);

const Marker = () => (
    <Fragment>
        <Icon
            className="color-primary"
            style={{
                fontSize: "35px"
            }}
            name="map marker alternate"
        />
    </Fragment>
);
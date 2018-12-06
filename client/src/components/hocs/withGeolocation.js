import React, {Component} from "react";
import axios from "axios";
import {prettifyError} from "../../utils/prettifyError";

export default (googleApiKey, geolocationOptions = {}) => (WrappedComponent) => (
    class Geolocation extends Component {
        static defaultOptions = {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        };

        constructor(props){
            super(props);

            this.geolocationOptions = {
                ...Geolocation.defaultOptions,
                ...geolocationOptions
            };

            this.state = {
                loading: true,
                available: null,
                position: null,
                error: null,
                geocode: {
                    results: []
                },
                getCurrentPosition: this.getCurrentPosition,
                watchPosition: this.watchPosition,
                clearWatch: this.clearWatch
            };
        }

        handleSuccess = async (position) => {
            if(!this.mounted) return;

            return axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json` +
                `?latlng=${position.coords.latitude},${position.coords.longitude}` +
                `&key=${googleApiKey}`
            ).then(res => res.data).then(geocode => {
                if(this.mounted){
                    this.setState({
                        loading: false,
                        available: true,
                        position,
                        geocode
                    });
                }
            }).catch(this.handleError);
        };

        handleError = (err) => {
            console.error(err);

            if(this.mounted){
                this.setState({
                    available: true,
                    error: prettifyError(err),
                    loading: false
                });
            }
        };

        useGeolocation = (functionName, options) => navigator.geolocation[functionName](
            this.handleSuccess,
            this.handleError,
            {...this.geolocationOptions, ...options}
        );

        watchPosition = (options = {}) => {
            return this.useGeolocation("watchPosition", options);
        };

        getCurrentPosition = (options = {}) => {
            return this.useGeolocation("getCurrentPosition", options);
        };

        clearWatch = (watchId) => {
            navigator.geolocation.clearWatch(watchId);
        };

        componentDidMount(){
            this.mounted = true;

            if ("geolocation" in navigator) {
                this.getCurrentPosition();
            } else {
                this.setState({loading: false, available: false});
            }
        }

        componentWillUnmount(){
            this.mounted = false;
        }

        render(){
            return <WrappedComponent geolocation={this.state} {...this.props}/>;
        }
    }
);
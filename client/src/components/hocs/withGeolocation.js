import React, {Component} from "react";

export default (geolocationOptions = {}) => (WrappedComponent) => (
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
                getCurrentPosition: this.getCurrentPosition,
                watchPosition: this.watchPosition,
                clearWatch: this.clearWatch
            };
        }

        handleSuccess = (position) => {
            if(!this.mounted) return;

            this.setState({
                loading: false,
                available: true,
                position
            });
        };

        handleError = (err) => {
            console.error(err);

            if(this.mounted){
                this.setState({
                    available: true,
                    error: err,
                    loading: false
                });
            }
        };

        useGeolocation = (functionName, options) => {
            this.geolocationOptions = {...this.geolocationOptions, ...options};

            return navigator.geolocation[functionName](
                this.handleSuccess,
                this.handleError,
                this.geolocationOptions
            );
        };

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
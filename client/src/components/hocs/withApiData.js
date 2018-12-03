import React, {Component} from "react";
import axios from "axios";

export default (routes, defaultState = {}) => (WrappedComponent) => {
    return class extends Component {
        state = {
            ...Object.keys(routes)
                .map(routeKey => ({[routeKey]: []}))
                .reduce((acc, next) => ({...acc, ...next})),
            ...defaultState
        };
        fetchApiData = async () => Promise.all(
            Object.keys(routes).map(routeKey =>
                axios.get(routes[routeKey])
                    .then(res => ({[routeKey]: res.data}))
            )
        ).then(data => data.reduce((acc, next) => ({...acc, ...next})))
            .then(data => {
                if(this.mounted){
                    this.setState(data);
                }
            });

        async componentDidMount() {
            this.mounted = true;

            try {
                await this.fetchApiData();
            } catch(err){
                console.error(err);
            }
        }

        componentWillUnmount() {
            this.mounted = false;
        }

        render() {
            return (
                <WrappedComponent
                    updateApiData={this.fetchApiData}
                    {...this.state}
                    {...this.props}
                />
            );
        }
    };
};
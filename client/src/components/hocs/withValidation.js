import React, {Component} from "react";

export default (WrappedComponent) => {
    return class ValidationState extends Component {
        state = {
            errors: [],
            loading: false,
            completedAction: ""
        };

        componentDidMount(){
            this.mounted = true;
        }

        componentWillUnmount(){
            this.mounted = false;
        }

        setStateIfMounted = (state) => {
            if(this.mounted){
                this.setState(state);
            }
        };

        resetState = (state = {}) => this.setStateIfMounted({
            errors: [],
            loading: false,
            completedAction: "",
            ...state
        });

        setLoadingState = (state = {}) => this.setStateIfMounted({
            errors: [],
            loading: true,
            completedAction: "",
            ...state
        });

        setCompletedActionState = (state = {}) => this.setStateIfMounted({
            errors: [],
            loading: false,
            ...state
        });

        setErrorState = (errors, state = {}) => this.setStateIfMounted({
            completedAction: "",
            loading: false,
            errors,
            ...state
        });

        render() {
            return (
                <WrappedComponent
                    validation={{
                        setLoadingState: this.setLoadingState,
                        setErrorState: this.setErrorState,
                        setCompletedActionState: this.setCompletedActionState,
                        resetState: this.resetState,
                        state: this.state
                    }}
                    {...this.props}
                />
            );
        }
    }
};
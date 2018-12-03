import {Component} from "react";
import {apiRoutes} from "../../utils/constants/apiRoutes";
import withApiData from "../../components/hocs/withApiData";
import {childrenWithProps} from "../../utils";
import axios from "axios";

class EventContainer extends Component {
    state = {
        errors: [],
        loading: false,
        success: false
    };

    setHandlingEventState = () => this.setState({
        errors: [],
        loading: true,
        success: false
    });

    setSuccessState = () => this.setState({
        loading: false,
        success: true
    });

    setErrorState = (errors) => this.setState({
        loading: false,
        errors
    });

    isValidEvent = ({gender, location, measure}) => {
        let errors = [];

        if(!gender){
            errors.push("Ett kön måste anges");
        }

        if(!location){
            errors.push("En plats måste anges");
        }

        if(!measure){
            errors.push("En åtgärd måste anges");
        }

        if(errors.length > 0){
            this.setErrorState(errors);
            return false;
        }

        return true;
    };

    handleEventResponse = async (promise) => {
        return promise
            .then(() => this.props.updateApiData())
            .then(() => this.setSuccessState())
            .catch(err => this.setErrorState([err.toString()]));
    };

    addEvent = async (event) => {
        if(this.isValidEvent(event)){
            this.setHandlingEventState();

            return this.handleEventResponse(
                axios.post(apiRoutes.event, event)
            );
        }
    };

    updateEvent = async (id, event) => {
        return this.handleEventResponse(
            axios({
                method: "PUT",
                url: apiRoutes.event,
                data: event,
                params: {where: {id}}
            })
        )
    };

    deleteEvent = async (id) => {
        this.setHandlingEventState();

        return this.handleEventResponse(
            axios.delete(apiRoutes.event, {params: {where: {id}}})
        );
    };

    filterOutExtraProps = ({updateApiData, ...props}) => props;

    render(){
        const {children, ...props} = this.filterOutExtraProps(this.props);

        return childrenWithProps({
            children,
            eventProps: {
                ...props,
                ...this.state,
                onAddEvent: this.addEvent,
                onUpdateEvent: this.updateEvent,
                onDeleteEvent: this.deleteEvent
            }
        });
    }
}

export default withApiData({events: apiRoutes.event})(EventContainer);
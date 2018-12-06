import {Component} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {bindDispatchToActionCreators, childrenWithProps} from "../../utils";
import withValidation from "../../components/hocs/withValidation";
import {getEventErrors, validationActions} from "../../utils/validation";
import {fetchAndUpdateEvents} from "../../redux/actionCreators";
import {eventApi} from "../../utils/api";
import {prettifyError} from "../../utils/prettifyError";
import {validationProps} from "../types/validationProps";

class EventContainer extends Component {
    static propTypes = validationProps;
    static mapStateToProps = ({events}) => ({entries: events});
    static mapDispatchToProps = bindDispatchToActionCreators((props) => ({
        updateEvents: fetchAndUpdateEvents(props)
    }));

    componentDidMount(){
        this.props.updateEvents()
            .catch(err => this.setErrorState([prettifyError(err)]));
    }

    isValidEvent = (event) => {
        const errors = getEventErrors(event);

        if(errors.length > 0){
            this.props.validation.setErrorState(errors);
            return false;
        }

        return true;
    };

    handleEventResponse = async (eventPromise, action) => {
        return eventPromise
            .then(() => this.props.updateEvents())
            .then(() => this.props.validation.setCompletedActionState({
                completedAction: action
            }))
            .catch(err => this.setErrorState([prettifyError(err)]));
    };

    addEvent = async (event) => {
        if(this.isValidEvent(event)){
            this.props.validation.setLoadingState();
            return this.handleEventResponse(
                eventApi.insert(event),
                validationActions.addEvent
            );
        }
    };

    updateEvent = async (id, changes) => {
        this.props.validation.setLoadingState();
        return this.handleEventResponse(
            eventApi.update(changes, {where: {id}}),
            validationActions.updateEvent
        );
    };

    deleteEvent = async (id) => {
        this.props.validation.setLoadingState();
        return this.handleEventResponse(
            eventApi.delete({where: {id}}),
            validationActions.deleteEvent
        );
    };

    filterExtraProps = ({updateEvents, ...props}) => props;

    render(){
        const {children, validation, ...props} = this.filterExtraProps(this.props);

        return childrenWithProps({
            children,
            events: {
                onAdd: this.addEvent,
                onUpdate: this.updateEvent,
                onDelete: this.deleteEvent,
                ...validation.state,
                ...props
            },
            key: this.props.entries.length
        });
    }
}

export default compose(
    connect(EventContainer.mapStateToProps, EventContainer.mapDispatchToProps),
    withValidation
)(EventContainer);
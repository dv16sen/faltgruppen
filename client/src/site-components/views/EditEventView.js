import React, {Component, Fragment} from "react";
import {Message, Segment} from "semantic-ui-react";
import {eventProps} from "../types/eventProps";
import {routes} from "../../utils/constants/routes";
import {withRouter} from "react-router-dom";
import EventForm from "./EventForm";
import {validationActions} from "../../utils/validation";

class EditEventView extends Component {
    static propTypes = eventProps;

    componentDidMount(){
        if(!this.props.events.eventToEdit){
            this.props.history.push(routes.homePage);
        }
    }

    filterOutExtraProps = ({staticContext, history, match, location, ...props}) => props;

    handleSubmit = (changes) => {
        this.props.events.onUpdate(this.props.events.eventToEdit.id, changes);
    };

    static renderMessage({errors, completedAction}){
        if(errors.length > 0){
            return (
                <Message
                    error
                    header="Vänligen åtgärda följande problem"
                    list={errors}
                />
            );
        } else if(completedAction === validationActions.updateEvent){
            return (
                <Message
                    success
                    header="Händelsen har ändrats!"
                />
            );
        }
    }

    render(){
        const {events, children, ...props} = this.filterOutExtraProps(this.props);

        return (
            <Fragment>
                <Segment attached className="bg-color-lighter-gray color-black" {...props}>
                    <h2 className="mb-0">Ändra händelse</h2>
                </Segment>
                <Segment attached>
                    {EditEventView.renderMessage(events)}
                    <EventForm
                        loading={events.loading}
                        locations={events.locations}
                        onSubmit={this.handleSubmit}
                        events={events}
                        defaultValues={events.eventToEdit}
                        submitButtonText="Ändra Händelse"
                    />
                </Segment>
                {children}
            </Fragment>
        );
    }
}

export default withRouter(EditEventView);
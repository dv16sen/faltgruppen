import React, {Component, Fragment} from "react";
import {Message, Segment} from "semantic-ui-react";
import {validationActions} from "../../utils/validation";
import {eventProps} from "../types/eventProps";
import EventForm from "./EventForm";

class AddEventView extends Component {
    static propTypes = eventProps;

    handleSubmit = (event) => {
        this.props.events.onAdd(event);
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
        } else if(completedAction === validationActions.addEvent){
            return (
                <Message
                    success
                    header="Händelsen har lagts till"
                />
            );
        }
    }

    render(){
        const {events, children, ...props} = this.props;

        return (
            <Fragment>
                <Segment attached className="bg-color-gray color-black" {...props}>
                    <h2 className="mb-0">Lägg till händelse</h2>
                </Segment>
                <Segment attached>
                    {AddEventView.renderMessage(events)}
                    <EventForm
                        loading={events.loading}
                        locations={events.locations}
                        onSubmit={this.handleSubmit}
                        events={events}
                        submitButtonText="Lägg till händelse"
                    />
                </Segment>
                {children}
            </Fragment>
        );
    }
}

export default AddEventView;
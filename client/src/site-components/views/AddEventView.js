import React, {Component} from "react";
import {Button, Dropdown, Form, Message, Segment, TextArea} from "semantic-ui-react";
import {validationActions} from "../../utils/validation";
import GeolocationView from "./GeolocationView";
import {eventProps} from "../types/eventProps";

class AddEventView extends Component {
    static propTypes = eventProps;

    state = {
        gender: "Kille",
        location: "",
        measure: ""
    };

    handleGenderChange = (event, {value}) => this.setState({
        gender: value
    });

    handleLocationChange = (event) => this.setState({
        location: event.target.value
    });

    handleMeasureChange = (event) => this.setState({
        measure: event.target.value
    });

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.events.onAdd(this.state);
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
                    header="Eventet har lagts till"
                />
            );
        }
    }

    focusMeasureFieldOnEnter = (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            this.measureField.focus();
        }
    };

    render(){
        const {events, children, ...props} = this.props;
        const {loading} = events;
        const {gender, location, measure} = this.state;

        return (
            <Segment>
                <h2 className="ui header">Lägg till händelse</h2>
                <Form {...props}>
                    <Form.Field>
                        <label>Kön</label>
                        <Dropdown
                            selection
                            disabled={loading}
                            value={gender}
                            options={[{
                                text: "Kille",
                                value: "Kille"
                            }, {
                                text: "Tjej",
                                value: "Tjej"
                            }]}
                            onChange={this.handleGenderChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Plats</label>
                        <input
                            type="text"
                            value={location}
                            disabled={loading}
                            onKeyPress={this.focusMeasureFieldOnEnter}
                            onChange={this.handleLocationChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Din nuvarande plats</label>
                        <GeolocationView/>
                    </Form.Field>
                    <Form.Field>
                        <label>Åtgärd</label>
                        <TextArea
                            value={measure}
                            disabled={loading}
                            ref={measureField => this.measureField = measureField}
                            onChange={this.handleMeasureChange}
                        />
                    </Form.Field>
                    {AddEventView.renderMessage(events)}
                    <Button
                        primary
                        fluid
                        disabled={loading}
                        loading={loading}
                        onClick={this.handleSubmit}
                    >Lägg till</Button>
                </Form>
                {children}
            </Segment>
        );
    }
}

export default AddEventView;
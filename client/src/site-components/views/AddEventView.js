import React, {Component} from "react";
import {Button, Dropdown, Form, Message, Segment, TextArea} from "semantic-ui-react";

export default class AddEventView extends Component {
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

    renderErrors = (errors) => {
        if(errors.length > 0){
            return (
                <Message
                    error
                    header="Vänligen åtgärda följande problem"
                    list={errors}
                />
            );
        }
    };

    renderSuccess = (success) => {
        if(success){
            return (
                <Message
                    success
                    header="Eventet har lagts till"
                />
            );
        }
    };

    render(){
        const {
            eventProps,
            ...props
        } = this.props;
        const {onAddEvent, loading, errors, success} = eventProps;

        return (
            <Segment>
                <h2 className="ui header">Lägg till event</h2>
                {this.renderErrors(errors)}
                {this.renderSuccess(success)}
                <Form {...props}>
                    <Form.Field>
                        <label>Kön</label>
                        <Dropdown
                            selection
                            disabled={loading}
                            value={this.state.gender}
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
                            value={this.state.location}
                            disabled={loading}
                            onChange={this.handleLocationChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Åtgärd</label>
                        <TextArea
                            value={this.state.measure}
                            disabled={loading}
                            onChange={this.handleMeasureChange}
                        />
                    </Form.Field>
                    <Button
                        primary
                        disabled={loading}
                        loading={loading}
                        onClick={() => onAddEvent(this.state)}
                    >Lägg till</Button>
                </Form>
            </Segment>
        );
    }
}
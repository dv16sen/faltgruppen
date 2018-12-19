import React, {Component} from "react";
import {Button, Dropdown, Form, Icon, TextArea} from "semantic-ui-react";
import {apiKeys} from "../../utils/constants/apiKeys";
import withGeolocation from "../../components/hocs/withGeolocation";
import {GoogleMap} from "./GoogleMap";

class EventForm extends Component {
    static defaultProps = {
        defaultValues: {
            gender: "Kille",
            location: "",
            measure: ""
        }
    };

    constructor(props){
        super(props);

        this.state = {
            gender: props.defaultValues.gender,
            location: props.defaultValues.location,
            measure: props.defaultValues.measure,
            showMap: false,
            locationOptions: props.locations.map(location => ({
                text: location,
                value: location
            }))
        };
    }

    handleGenderChange = (event, {value}) => this.setState({
        gender: value
    });

    handleLocationChange = (event, {value}) => this.setState({
        location: value,
    });

    handleAddLocation = (event, {value}) => this.setState({
        locationOptions: [{
            text: value,
            value
        }, ...this.state.locationOptions]
    });

    handleMeasureChange = (event) => this.setState({
        measure: event.target.value
    });

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
    };

    toggleShowMap = () => this.setState((prevState) => ({
        showMap: !prevState.showMap
    }));

    focusMeasureFieldOnEnter = (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            this.measureField.focus();
        }
    };

    getLocationOptions = () => {
        const {geolocation} = this.props;
        const {locationOptions} = this.state;

        const userGeocode = geolocation.geocode.results[0];
        const userLocation = (userGeocode && userGeocode.formatted_address)
            ? userGeocode.formatted_address.split(", ")[0]
            : null;

        return (userLocation && locationOptions
            .filter(location => location.value === userLocation).length === 0
        ) ? [{text: userLocation, value: userLocation}, ...locationOptions] : locationOptions;
    };

    filterOutExtraProps = ({
        defaultValues,
        locations,
        events,
        ...props
    }) => props;

    render(){
        const {
            geolocation,
            submitButtonText,
            loading,
            children,
            ...props
        } = this.filterOutExtraProps(this.props);
        const {gender, location, measure, showMap} = this.state;

        return (
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
                    <div className="input-with-icon">
                        <Dropdown
                            search
                            selection
                            allowAdditions
                            value={location}
                            onChange={this.handleLocationChange}
                            onKeyPress={this.focusMeasureFieldOnEnter}
                            onAddItem={this.handleAddLocation}
                            options={this.getLocationOptions()}
                        />
                        {(geolocation.position) && (
                            <Icon
                                size="big"
                                className={`clickable${(showMap ? " color-primary" : "")}`}
                                name="street view"
                                onClick={this.toggleShowMap}
                            />
                        )}
                    </div>
                </Form.Field>
                {showMap && geolocation.position && (
                    <Form.Field>
                        <label>Din plats</label>
                        <GoogleMap position={geolocation.position}/>
                    </Form.Field>
                )}
                <Form.Field>
                    <label>Åtgärd</label>
                    <TextArea
                        value={measure}
                        disabled={loading}
                        ref={measureField => this.measureField = measureField}
                        onChange={this.handleMeasureChange}
                        rows={7}
                    />
                </Form.Field>
                {children}
                <Button
                    primary
                    fluid
                    disabled={loading}
                    loading={loading}
                    onClick={this.handleSubmit}
                >{submitButtonText}</Button>
            </Form>
        );
    }
}

export default withGeolocation(apiKeys.googleMap)(EventForm);
import React, {Component, Fragment} from "react";
import {Segment, Feed, Icon, Checkbox} from "semantic-ui-react";
import moment from "moment";
import "moment/locale/sv";
import {eventProps} from "../types/eventProps";
import {routes} from "../../utils/constants/routes";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {editEvent} from "../../redux/actions";

class EventView extends Component {
    static propTypes = eventProps;

    state = {
        remove: false,
        selectedEvents: []
    };

    handleRemove = () => {
        return Promise.all(this.state.selectedEvents
            .map(event => this.props.events.onDelete(event.id)))
    };

    renderTitle = () => {
        return (
            <div style={{position: "relative"}}>
                <h2 className="mb-0">Händelser</h2>
                <div className="icon-menu">
                    <Link to={routes.addEventPage}>
                        <Icon
                            className="mr-10"
                            size="large"
                            name="plus"
                        />
                    </Link>
                    <Icon
                        size="large"
                        name="trash alternate"
                        className={
                            (this.state.selectedEvents.length > 0 && this.state.remove)
                                ? "color-primary"
                                : ""
                        }
                        onClick={() => {
                            if(this.state.selectedEvents.length > 0){
                                this.handleRemove();
                            } else {
                                this.setState({remove: true});
                            }
                        }}
                    />
                    {(this.state.remove) && (
                        <Icon
                            size="large"
                            name="close"
                            onClick={() => this.setState({
                                remove: false,
                                selectedEvents: []
                            })}
                        />
                    )}
                </div>
            </div>
        );
    };

    handleCheckboxChange = (checked, event) => {
        this.setState((prevState) => ({
            selectedEvents: (checked)
                ? [...prevState.selectedEvents, event]
                : prevState.selectedEvents
                    .filter(selectedEvent => selectedEvent.id !== event.id)
        }));
    };

    getMoment = (time) => {
        return moment(time).calendar();
    };

    renderFeed(events){
        return (
            <Feed>
                {events.entries.slice().reverse().map((event, i) => (
                    <Fragment key={i}>
                        <Feed.Event
                            className={(!this.state.remove) ? "clickable" : ""}
                            onClick={() => {
                                if(!this.state.remove){
                                    this.props.dispatch(editEvent(event.id));
                                    this.props.history.push(routes.editEventPage);
                                }
                            }}
                        >
                            {(this.state.remove) && (
                                <Feed.Label>
                                    <Checkbox
                                        onChange={(e, {checked}) =>
                                            this.handleCheckboxChange(checked, event)}
                                    />
                                </Feed.Label>
                            )}
                            <Feed.Content>
                                <Feed.Summary
                                    content={
                                        <span>
                                            <Icon
                                                style={{marginRight: ".75em"}}
                                                name={(event.gender === "Kille") ? "man" : "woman"}
                                            />
                                            {event.location}
                                        </span>
                                    }
                                    date={this.getMoment(event.createdAt)}
                                />
                                <div><span>{event.measure}</span></div>
                            </Feed.Content>
                        </Feed.Event>
                    </Fragment>
                ))}
            </Feed>
        );
    }

    filterOutExtraProps = ({
        staticContext,
        history,
        match,
        location,
        dispatch,
        ...props
    }) => props;

    render(){
        const {events, children, ...props} = this.filterOutExtraProps(this.props);

        return (
            <Fragment>
                <Segment attached className="bg-color-lighter-gray color-black sticky" {...props}>
                    {this.renderTitle()}
                </Segment>
                <Segment loading={events.loading} attached="bottom" className="p-0">
                    {this.renderFeed(events)}
                </Segment>
                {children}
            </Fragment>
        );
    }
}

export default compose(withRouter, connect())(EventView);
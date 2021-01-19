import React, { Component } from "react";
import CreateEventButton from "./Event/CreateEventButton";
import EventItem from "./Event/EventItem";
import { connect } from "react-redux";
import { getEvents } from "../actions/eventActions";
import PropTypes from "prop-types";

class Dashboard extends Component {

  componentDidMount(){
    this.props.getEvents(); 
  }

  render() {

    const {events} = this.props.events

    return (
      <div className="row">
        <div className="col-md-12">
          <h1 className="display-4 text-center">Dashboard</h1>
          <br />
          <CreateEventButton />
          <br />
          <hr />
          {events.map(event=>(
            <EventItem key={event.id} event={event}/>
          ))}
          
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  events: PropTypes.object.isRequired,
  getEvents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  events: state.events,
});

export default connect(mapStateToProps, { getEvents })(Dashboard);

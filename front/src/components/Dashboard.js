import React, { Component } from "react";
import CreateEventButton from "./Event/CreateEventButton";
import EventItem from "./Event/EventItem";

class Dashboard extends Component {
  render() {
    return (
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Dashboard</h1>
              <br />
              <CreateEventButton />
              <br />
              <hr />
              <EventItem />
            </div>
          </div>

    );
  }
}
export default Dashboard;

import React, { Component } from "react";
import classnames from "classnames";
import { getEvent, createEvent } from "../../actions/eventActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

class ShowEvent extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      eventName: "",
      repeated: false,
      eventDate: "",
      eventType: {},
      errors: {},
      schedules: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      id,
      eventName,
      repeated,
      eventDate,
      createdDate,
      eventType,
      schedules,
    } = nextProps.event;

    this.setState({
      id,
      eventName,
      repeated,
      eventDate,
      createdDate,
      eventType,
      schedules,
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getEvent(id, this.props.history);
    axios.get("/api/eventtypes/all").then((res) => {
      const types = res.data;
      this.setState({ types });
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        {this.state.eventName}
        <br />
        {this.state.eventType.typeName}
        <br />
        {this.state.eventDate}
        {this.state.schedules.map((item) => (
          <p key={item.id}>
            {item.day} {item.time}
          </p>
        ))}
      </div>
    );
  }
}

ShowEvent.propTypes = {
  getEvent: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.events.event,
  errors: state.errors,
});

export default connect(mapStateToProps, { getEvent, createEvent })(ShowEvent);

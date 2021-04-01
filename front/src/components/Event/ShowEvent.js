import React, { Component } from "react";
import { getEvent, createEvent } from "../../actions/eventActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
  }

  daySwitch(param) {
    switch (param) {
      case "1":
        return "Понедельник";
      case "2":
        return "Вторник";
      case "3":
        return "Среда";
      case "4":
        return "Четверг";
      case "5":
        return "Пятница";
      case "6":
        return "Суббота";
      case "7":
        return "Воскресенье";
      default:
        return "";
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
      <div className="card border-info mb-3  text-center">
      <h2 className="card-header">{this.state.eventName}</h2>
      </div>
        <div className="row">

          <div className="col-6">
            <div className="card border-info mb-3">
              <h4 className="card-header">{this.state.eventType.typeName}</h4>
              <div className="card-body">
                {this.state.eventDate && (
                  <p className="card-text">{this.state.eventDate}</p>
                )}

                {this.state.schedules.map((item) => (
                  <p className="card-text" key={item.id}>
                    {this.daySwitch(item.day)} {item.time}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card border-info mb-3">
              <h4 className="card-header">Участники</h4>
              <div className="card-body"></div>
            </div>
          </div>
        </div>
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

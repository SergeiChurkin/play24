import React, { Component } from "react";
import classnames from "classnames";
import { getEvent, createEvent } from "../../actions/eventActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

class UpdateEvent extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      eventName: "",
      repeated: false,
      eventDate: "",
      eventType: {},
      errors: {},
      type_id: "",
      types: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    } = nextProps.event;

    this.setState({
      id,
      eventName,
      repeated,
      eventDate,
      createdDate,
      eventType,
    });
  }

  onChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const updateEvent = {
      id: this.state.id,
      eventName: this.state.eventName,
      repeated: this.state.repeated,
      eventDate: this.state.eventDate,
      createdDate: this.state.createdDate,
    };
    this.props.createEvent(this.state.type_id, updateEvent, this.props.history);
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
        <div className="col-md-8 m-auto">
          <h5 className="display-4 text-center">Обновляем</h5>
          <hr />
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                name="eventName"
                type="text"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.eventName,
                })}
                placeholder="Название"
                onChange={this.onChange}
                value={this.state.eventName}
              />
              {errors.eventName && (
                <div className="invalid-feedback">{errors.eventName}</div>
              )}
            </div>
            <div className="form-group">
              <select
                className="form-select"
                name="type_id"
                onChange={this.onChange}
              >
                {this.state.types.map((type) => (
                  <option
                    value={type.id}
                    key={type.id}
                    selected={type.id == this.state.eventType.id}
                  >
                    {type.typeName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <input
                className="form-check-input"
                type="checkbox"
                id="repeatedCheckBox"
                name="repeated"
                checked={this.state.repeated}
                onChange={this.onChange}
              />
              <label className="form-check-label" htmlFor="repeatedCheckBox">
                Использовать расписание
              </label>
            </div>
            <div className="form-group">
              <input
                name="eventDate"
                type="datetime-local"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.eventDate,
                })}
                value={this.state.eventDate}
                onChange={this.onChange}
              />
              {errors.eventDate && (
                <div className="invalid-feedback">{errors.eventDate}</div>
              )}
            </div>
            <input
              type="submit"
              className="btn btn-info btn-block mt-4"
              value="ОБНОВИТЬ МЕРОПРИЯТИЕ"
            />
          </form>
        </div>
      </div>
    );
  }
}

UpdateEvent.propTypes = {
  getEvent: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.events.event,
  errors: state.errors,
});

export default connect(mapStateToProps, { getEvent, createEvent })(UpdateEvent);

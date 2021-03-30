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
      schedules: [],
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addScheduleInputClick() {
    this.setState((prevState) => ({
      schedules: [...prevState.schedules, { day: "", time: "" }],
    }));
  }

  createScheduleUI() {
    return this.state.schedules.map((el, i) => (
      <div key={i} className="form-group">
        <select
          name="day"
          className="form-control"
          value={el.day}
          onChange={this.handleChange.bind(this, i)}
        >
          <option value="1">Понедельник</option>
          <option value="2">Вторник</option>
          <option value="3">Среда</option>
          <option value="4">Четверг</option>
          <option value="5">Пятница</option>
          <option value="6">Суббота</option>
          <option value="7">Воскресенье</option>
        </select>
        <input
          name="time"
          type="time"
          className="form-control"
          value={el.time}
          onChange={this.handleChange.bind(this, i)}
        />
        {i > 0 && (
          <input
            type="button"
            value="Удалить день"
            className="btn btn-danger"
            onClick={this.removeClick.bind(this, i)}
          />
        )}
      </div>
    ));
  }

  handleChange(i, e) {
    e.preventDefault();
    const { name, value } = e.target;
    let schedules = [...this.state.schedules];
    schedules[i] = { ...schedules[i], [name]: value };
    this.setState({ schedules });
  }

  removeClick(i) {
    let schedules = [...this.state.schedules];
    if (schedules.length > 1) {
      schedules.splice(i, 1);
      this.setState({ schedules });
    }
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
      type_id,
    } = nextProps.event;

    this.setState({
      id,
      eventName,
      repeated,
      eventDate,
      createdDate,
      eventType,
      schedules,
      type_id,
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
  handleSubmit(e) {
    e.preventDefault();
    const updatedEvent = {
      id: this.state.id,
      eventName: this.state.eventName,
      repeated: this.state.repeated,
      eventDate: this.state.eventDate,
      createdDate: this.state.createdDate,
    };
    const completeEvent = {
      event: updatedEvent,
      schedules: this.state.schedules,
    };
    this.props.createEvent(
      this.state.eventType.id,
      completeEvent,
      this.props.history
    );
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
          <form onSubmit={this.handleSubmit}>
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
                className="form-control form-control-lg"
                name="type_id"
                defaultValue={this.state.eventType.id}
                value={this.state.type_id}
                onChange={this.onChange}
              >
                {this.state.types.map((type) => (
                  <option
                    value={type.id}
                    key={type.id}
                    {...(type.id === this.state.eventType.id && "selected")}
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
            {this.state.repeated ? (
              <div className="form-group">
                <input
                  type="button"
                  value="Добавить день"
                  className="btn btn-secondary"
                  onClick={this.addScheduleInputClick.bind(this)}
                />
              </div>
            ) : null}
            {this.state.repeated ? (
              this.createScheduleUI()
            ) : (
              <div className="form-group">
                <input
                  name="eventDate"
                  type="datetime-local"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.eventDate,
                  })}
                  //value={this.state.eventDate}
                  onChange={this.onChange}
                />
                {errors.eventDate && (
                  <div className="invalid-feedback">{errors.eventDate}</div>
                )}
              </div>
            )}
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

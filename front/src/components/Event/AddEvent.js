import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createEvent } from "../../actions/eventActions";
import classnames from "classnames";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import axios from "axios";

class AddEvent extends Component {
  constructor() {
    super();
    this.state = {
      eventName: "",
      repeated: false,
      eventDate: "",
      typeId: 1,
      errors: {},
      types: [],
      mapState: { center: [59.939095, 30.315868], zoom: 10 },
      day1: "",
      time1: "",
      day2: "",
      time2: "",
      day3: "",
      time3: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get("/api/eventtypes/all").then((res) => {
      const types = res.data;
      this.setState({ types });
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
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
    const newEvent = {
      eventName: this.state.eventName,
      repeated: this.state.repeated,
      eventDate: this.state.eventDate,
    };

    const completeEvent = {
      event: newEvent,
      schedules: [
        { day:this.state.day1, time:this.state.time1 },
        { day:this.state.day2, time:this.state.time2 },
        { day:this.state.day3, time:this.state.time3 },
      ],
    };

    this.props.createEvent(
      this.state.typeId,
      completeEvent,
      this.props.history
    );
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="col-md-8 m-auto">
          <h5 className="display-4 text-center">Добавляем мероприятие</h5>
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
                value={this.state.eventName}
                onChange={this.onChange}
              />
              {errors.eventName && (
                <div className="invalid-feedback">{errors.eventName}</div>
              )}
            </div>
            <div className="form-group">
              <select
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.message,
                })}
                value={this.state.typeId}
                name="typeId"
                onChange={this.onChange}
              >
                {this.state.types.map((type) => (
                  <option value={type.id} key={type.id}>
                    {type.typeName}
                  </option>
                ))}
              </select>
              {errors.message && (
                <div className="invalid-feedback">{errors.message}</div>
              )}
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
              <select
                className="form-control-lg mr-3"
                name="day1"
                onChange={this.onChange}
                value={this.state.day1}
              >
                <option>Понедельник</option>
                <option>Вторник</option>
                <option>Среда</option>
                <option>Четверг</option>
                <option>Пятница</option>
                <option>Суббота</option>
                <option>Воскресенье</option>
              </select>
              <input
                name="time1"
                type="time"
                min="08:00"
                max="21:00"
                value={this.state.time1}
                className="form-control-lg"
                onChange={this.onChange}
              ></input>
            </div>
            <div className="form-group">
              <select
                className="form-control-lg mr-3"
                name="day2"
                value={this.state.day2}
                onChange={this.onChange}
              >
                <option>Понедельник</option>
                <option>Вторник</option>
                <option>Среда</option>
                <option>Четверг</option>
                <option>Пятница</option>
                <option>Суббота</option>
                <option>Воскресенье</option>
              </select>
              <input
                name="time2"
                type="time"
                min="08:00"
                max="21:00"
                value={this.state.time2}
                className="form-control-lg"
                onChange={this.onChange}
              ></input>
            </div>
            <div className="form-group">
              <select
                className="form-control-lg mr-3"
                name="day3"
                value={this.state.day3}
                onChange={this.onChange}
              >
                <option>Понедельник</option>
                <option>Вторник</option>
                <option>Среда</option>
                <option>Четверг</option>
                <option>Пятница</option>
                <option>Суббота</option>
                <option>Воскресенье</option>
              </select>
              <input
                name="time3"
                type="time"
                min="08:00"
                max="21:00"
                value={this.state.time3}
                className="form-control-lg"
                onChange={this.onChange}
              ></input>
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
              <input
                type="submit"
                className="btn btn-info btn-block mt-4"
                value="СОЗДАТЬ МЕРОПРИЯТИЕ"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddEvent.propTypes = {
  createEvent: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, {
  createEvent,
})(AddEvent);

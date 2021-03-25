import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createEvent } from "../../actions/eventActions";
import classnames from "classnames";
//import { YMaps, Map, Placemark } from "react-yandex-maps";
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
      schedules: [
        {
          day: "",
          time: "",
        },
      ],
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
          defaultValue={el.day || "0"}
          onChange={this.handleChange.bind(this, i)}
        >
          <option value="0" disabled>
            Выберите день
          </option>
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
          value={el.time || ""}
          onChange={this.handleChange.bind(this, i)}
        />
        {i>0 &&
        <input
          type="button"
          value="Удалить день"
          className="btn btn-danger"
          onClick={this.removeClick.bind(this, i)}
        />}
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
    if(schedules.length>1){
    schedules.splice(i, 1);
    this.setState({ schedules });}
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

  handleSubmit(e) {
    e.preventDefault();
    const newEvent = {
      eventName: this.state.eventName,
      repeated: this.state.repeated,
      eventDate: this.state.eventDate,
    };
    
    const completeEvent = {
      event: newEvent,
      schedules: this.state.schedules,
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

          <form onSubmit={this.handleSubmit}>
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
            {this.state.repeated ? (
              <div  className="form-group">
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
                  value={this.state.eventDate}
                  onChange={this.onChange}
                />
                {errors.eventDate && (
                  <div className="invalid-feedback">{errors.eventDate}</div>
                )}
              </div>
            )}

            <div className="form-group">
              <input
                type="submit"
                className="btn btn-info btn-block"
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

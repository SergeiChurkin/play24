import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createEvent } from "../../actions/eventActions";
import classnames from "classnames";
import { YMaps, Map, SearchControl, Placemark } from "react-yandex-maps";

import axios from "axios";

class AddEvent extends Component {
  constructor() {
    super();
    const { id } = this.props.match.params;
    this.state = {
      eventName: "",
      repeated: false, 
      eventDate: "",
      type_id:id,
      errors: {},
      types: [],
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

    this.props.createEvent(this.props.type_id, newEvent, this.props.history);
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
                className="form-select"
                name="type_id"
                onChange={this.onChange}
              >
                <option disabled>Choose...</option>
                {this.state.types.map((type) => (
                  <option value={type.id} key={type.id}>{type.typeName}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <YMaps>
                <Map
                  state={{
                    zoom: 9,
                    center: [59.939095, 30.315868],
                  }}
                  width={"100%"}
                  height={200}
                >
                  <SearchControl />
                  <Placemark geometry={[59.939095, 30.315868]} />
                </Map>
              </YMaps>
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
              <input
                type="submit"
                className="btn btn-info btn-block mt-4"
                value="СОЗДАТЬ МЕРОПРИЯТИЕ"
              />
            </div>
            <div className="form-group"></div>
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

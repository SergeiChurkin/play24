import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createEvent } from "../../actions/eventActions";
import classnames from "classnames";
import { Formik, Field, Form, ErrorMessage, FieldArray} from "formik";
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
      schedules: [
        {
          day: "",
          time: "",
        },
      ],
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
    console.log(this.values  );
    const completeEvent = {
      event: newEvent,
      schedules:this.values 
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
          <Formik 
          enableReinitialize
          initialValues={this.state}
          >
            {({  values }) => (
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
                  <label
                    className="form-check-label"
                    htmlFor="repeatedCheckBox"
                  >
                    Использовать расписание
                  </label>
                </div>
                <div className="form-group">
                  <FieldArray name="schedules">
                    {({ insert, remove, push }) => (
                      <div>
                        {values.schedules.length > 0 &&
                          values.schedules.map((schedule, index) => (
                            <div className="row" key={index}>
                              <div className="col">
                                <Field
                                  as="select"
                                  name={`schedules.${index}.day`}
                                >
                                  <option selected>Понедельник</option>
                                  <option>Вторник</option>
                                  <option>Среда</option>
                                  <option>Четверг</option>
                                  <option>Пятница</option>
                                  <option>Суббота</option>
                                  <option>Воскресенье</option>
                                </Field>
                                <ErrorMessage
                                  name={`schedules.${index}.day`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>
                              <div className="col">
                                <Field
                                  name={`schedules.${index}.time`}
                                  type="time"
                                />
                                <ErrorMessage
                                  name={`schedules.${index}.time`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>
                              <div className="col">
                                <button
                                  type="button"
                                  className="secondary"
                                  onClick={() => remove(index)}
                                >
                                  Удалить
                                </button>
                              </div>
                            </div>
                          ))}
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => push({ day: "", time: "" })}
                        >
                          Добавить день
                        </button>
                      </div>
                    )}
                  </FieldArray>
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
            )}
          </Formik>
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

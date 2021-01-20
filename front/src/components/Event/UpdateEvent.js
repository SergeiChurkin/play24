import React, { Component } from "react";
import classnames from "classnames";

export default class UpdateEvent extends Component {
  render() {
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
                className="form-control form-control-lg"
                placeholder="Название"

                onChange={this.onChange}
              />

              <input
                className="form-check-input"
                type="checkbox"
                id="repeatedCheckBox"
                name="repeated"

                onChange={this.onChange}
              />
              <label className="form-check-label" htmlFor="repeatedCheckBox">
                Использовать расписание
              </label>
              <input
                name="eventDate"
                type="datetime-local"
                className="form-control form-control-lg"

                onChange={this.onChange}
              />

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

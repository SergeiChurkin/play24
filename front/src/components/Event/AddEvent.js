import React, { Component } from "react";

class AddEvent extends Component {
  constructor() {
    super();
    this.state = {
      eventName: "",
      repeated: false,
      eventDate: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    console.log(newEvent);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 m-auto">
          <h5 className="display-4 text-center">Create new Event</h5>
          <hr />
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                name="eventName"
                type="text"
                className="form-control form-control-lg mb-3"
                placeholder="Event Name"
                value={this.state.eventName}
                onChange={this.onChange}
              />
              <input
                className="form-check-input mb-3"
                type="checkbox"
                id="repeatedCheckBox"
                name="repeated"
                checked={this.state.repeated}
                onChange={this.onChange}
              />
              <label className="form-check-label mb-3" htmlFor="repeatedCheckBox">
                Использовать расписание для события
              </label>
              <input
                name="eventDate"
                type="datetime-local"
                className="form-control form-control-lg mb-3"
                value={this.state.eventDate}
                onChange={this.onChange}
              />

              <input type="submit" className="btn btn-info btn-block mt-4" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default AddEvent;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteEvent } from "../../actions/eventActions";

class EventItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteEvent(id);
  };

  render() {
    const { event } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <span className="mx-auto">{event.createdDate}</span>
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{event.eventName}</h3>
            <h4>{event.eventType.typeName}</h4>
            <p>{event.eventDate}</p>
          </div>
          <div className="col-md-4 btn-group-vertical">
            <Link to={`/showEvent/${event.id}`} className="btn btn-info">
              Подробная информация
            </Link>
            <Link to={`/updateEvent/${event.id}`} className="btn btn-warning">
              Изменить мероприятие
            </Link>
            <button
              className="btn btn-danger"
              onClick={this.onDeleteClick.bind(this, event.id)}
            >
              Удалить мероприятие
            </button>
          </div>
        </div>
      </div>
    );
  }
}

EventItem.propTypes = {
  deleteEvent: PropTypes.func.isRequired,
};

export default connect(null, { deleteEvent })(EventItem);

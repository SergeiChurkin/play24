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
            <p>{event.eventDate}</p>
            <h4>{event.eventType.typeName}</h4>
          </div>
          <div className="col-md-4 d-none d-lg-block">
            <ul className="list-group">
              <Link to={`/showEvent/${event.id}`}>
                <li className="list-group-item board">
                  <i className="fa fa-flag-checkered pr-1">
                    Подробная информация
                  </i>
                </li>
              </Link>
              <Link to={`/updateEvent/${event.id}`}>
                <li className="list-group-item update">
                  <i className="fa fa-edit pr-1">Изменить мероприятие</i>
                </li>
              </Link>

              <li
                className="list-group-item delete"
                onClick={this.onDeleteClick.bind(this, event.id)}
              >
                <i className="fa fa-minus-circle pr-1">Удалить мероприятие</i>
              </li>
            </ul>
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

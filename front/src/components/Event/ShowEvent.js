import React, { Component } from "react";
import { getEvent, createEvent } from "../../actions/eventActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFriends } from "../../actions/friendActions";
import { Modal, Button, Container } from "react-bootstrap";
import FriendItemInvite from "../User/FriendItemInvite";

class ShowEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      eventName: "",
      repeated: false,
      showModal: false,
      eventDate: "",
      eventType: {},
      errors: {},
      schedules: [],
      friends: [],
    };
  }
  /*
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return {
        errors: nextProps.errors,
      };
    }
  }

  componentDidUpdate(nextProps){
    const {
      id,
      eventName,
      repeated,
      eventDate,
      createdDate,
      eventType,
      schedules,
    } = nextProps.event;

    this.setState({
      id,
      eventName,
      repeated,
      eventDate,
      createdDate,
      eventType,
      schedules,
    });
  }*/

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
    } = nextProps.event;

    this.setState({
      id,
      eventName,
      repeated,
      eventDate,
      createdDate,
      eventType,
      schedules,
    });
  }

  componentDidMount() {
    document.title = "Просмотр мероприятия - Play 24/7";
    const { id } = this.props.match.params;
    this.props.getEvent(id, this.props.history);
    const { temp } = this.props.getFriends();
    this.setState({ friends: temp });
  }

  daySwitch(param) {
    switch (param) {
      case "1":
        return "Понедельник";
      case "2":
        return "Вторник";
      case "3":
        return "Среда";
      case "4":
        return "Четверг";
      case "5":
        return "Пятница";
      case "6":
        return "Суббота";
      case "7":
        return "Воскресенье";
      default:
        return "";
    }
  }
  handleClose = () => {
    this.setState({ showModal: false });
  };
  handleShow = () => {
    this.setState({ showModal: true });
  };

  render() {
    const { friends } = this.props.friends;
    return (
      <div className="container">
        <div className="card border-info mb-3  text-center">
          <h2 className="card-header">{this.state.eventName}</h2>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="card border-info mb-3">
              <h4 className="card-header">{this.state.eventType.typeName}</h4>
              <div className="card-body">
                {this.state.eventDate && (
                  <p className="card-text">{this.state.eventDate}</p>
                )}

                {this.state.schedules.map((item) => (
                  <p className="card-text" key={item.id}>
                    {this.daySwitch(item.day)} {item.time}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card border-info mb-3">
              <h4 className="card-header">Участники</h4>
              <div className="card-body">
                <Button variant="primary" onClick={this.handleShow.bind(this)}>
                  Добавить участиников
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Modal show={this.state.showModal} onHide={this.handleClose.bind(this)}>
          <Modal.Header>
            <Modal.Title>Позовите друзей на мероприятие</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              {friends.map((friend) => (
                <FriendItemInvite key={friend.id} friend={friend} />
              ))}
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose.bind(this)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ShowEvent.propTypes = {
  getEvent: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  friends: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.events.event,
  errors: state.errors,
  friends: state.friends,
});

export default connect(mapStateToProps, { getEvent, createEvent, getFriends })(
  ShowEvent
);

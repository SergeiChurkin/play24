import React, { Component } from "react";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteFriendRequest } from "../../actions/friendActions";
class InviteItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  onDeleteClick = (id) => {
    this.props.deleteFriendRequest(id);
  };

  onAcceptClick = (id) => {
    this.props.acceptFriendRequest(id);
  };

  componentDidMount() {
    this.setState({ isLoaded: true });
  }

  render() {
    const { invite } = this.props;
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return <Spinner animation="border" />;
    }

    return (
      <Container>
        <Row sm>
          <Col>
            Запрос в друзья от {invite.nickname} ({invite.sender})
          </Col>
          <Col>
            <button
              className="btn btn-success"
              onClick={this.onAcceptClick.bind(this, invite.id)}
            >
              Принять запрос
            </button>
          </Col>
          <Col>
            <button
              className="btn btn-danger"
              onClick={this.onDeleteClick.bind(this, invite.id)}
            >
              Отклонить запрос
            </button>
          </Col>
        </Row>
      </Container>
    );
  }
}

InviteItem.propTypes = {
  deleteFriendRequest: PropTypes.func.isRequired,
};

export default connect(null, { deleteFriendRequest })(InviteItem);

import React, { Component } from "react";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  deleteFriendRequest,
  acceptFriendRequest,
} from "../../actions/friendActions";
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
    this.props.acceptFriendRequest(id, this.props.refreshFriends);
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
        {invite.status === 1 && (
          <Row sm>
            <Col>
              Запрос в друзья от {invite.nickname} ({invite.sender})
            </Col>
            <Col>
              <button
                className="btn btn-success btn-sm"
                onClick={this.onAcceptClick.bind(this, invite.id)}
              >
                Принять
              </button>
            </Col>
            <Col>
              <button
                className="btn btn-danger btn-sm"
                onClick={this.onDeleteClick.bind(this, invite.id)}
              >
                Отклонить
              </button>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

InviteItem.propTypes = {
  deleteFriendRequest: PropTypes.func.isRequired,
  acceptFriendRequest: PropTypes.func.isRequired,
};

export default connect(null, { deleteFriendRequest, acceptFriendRequest })(
  InviteItem
);

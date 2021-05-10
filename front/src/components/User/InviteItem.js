import React, { Component } from "react";
import { Spinner, Container, Row, Col, Button } from "react-bootstrap";
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
      isAcceptDisable: false,
      isDeleteDisable: false,
      isLoaded: false,
    };
  }

  onDeleteClick = (id) => {
    this.setState({ isDeleteDisable: true });
    this.props.deleteFriendRequest(id);
  };

  onAcceptClick = (id) => {
    this.setState({ isAcceptDisable: true });
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
              <Button
                size="sm"
                variant="success"
                disabled={this.state.isAcceptDisable}
                onClick={this.onAcceptClick.bind(this, invite.id)}
              >
              {this.state.isAcceptDisable ? 'Загрузка...' : 'Принять'}
              </Button>
            </Col>
            <Col>
              <Button
                variant="danger"
                size="sm"
                disabled={this.state.isDeleteDisable}
                onClick={this.onDeleteClick.bind(this, invite.id)}
              >
              {this.state.isDeleteDisable ? 'Загрузка...' : 'Отклонить'}
              </Button>
            </Col>
            <Col> </Col>
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

import React, { Component } from "react";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteFriendRequest, acceptFriendRequest } from "../../actions/friendActions";
class FriendItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  onDeleteClick = (id) => {
    //this.props.deleteFriendRequest(id);
  };

  onAcceptClick = (id) => {
    //this.props.acceptFriendRequest(id);
  };

  componentDidMount() {
    this.setState({ isLoaded: true });
  }

  render() {
    const { friend } = this.props;
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return <Spinner animation="border" />;
    }

    return (
      <Container>
          <Row>
              {friend.nickname} ({friend.username})
          </Row>

      </Container>
    );
  }
}



export default connect(null)(
    FriendItem
);

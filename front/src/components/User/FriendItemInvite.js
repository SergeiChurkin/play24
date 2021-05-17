import React, { Component } from "react";
import { Spinner, Container, Row, Button, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

class FriendItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isDisable: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoaded: true });
  }

  handleClick = (eventId, userId) => {
    this.setState({ isDisable: true });
    axios.get(`/api/event/${eventId}/${userId}/invites`);
  };

  render() {
    const { friend } = this.props;
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return <Spinner animation="border" />;
    }

    return (
      <Row>
        <Col xs={12} md={8}>
          {friend.nickname}
        </Col>
        <Col xs={6} md={4}>
          <Button
            size="sm"
            disabled={this.state.isDisable}
            onClick={this.handleClick.bind(this, 2, friend.id)}
          >
            {this.state.isDisable ? "Отправка..." : "Пригласить"}
          </Button>
        </Col>
      </Row>
    );
  }
}

export default connect(null)(FriendItem);

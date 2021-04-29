import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";

class InviteItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

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
      <div>
        Запрос в друзья от {invite.nickname} ({invite.sender})
      </div>
    );
  }
}
export default connect(null)(InviteItem);

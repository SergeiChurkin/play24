import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyInfo, sendFriendRequest } from "../../actions/userActions";
import classnames from "classnames";

class UserInfo extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      username: "",
      nickname: "",
      phone: "",
      friends: [],
      email: "",
      errors: {},
      messages: {},
      isLoaded: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.messages) {
      this.setState({ messages: nextProps.messages });
    }

    const { id, username, nickname, phone, friends } = nextProps.user;

    this.setState({ id, username, nickname, phone, friends });
  }

  componentDidMount() {
    this.props.getMyInfo();
    this.setState({ isLoaded: true });
    }

  handleSubmit(e) {
    e.preventDefault();

    this.props.sendFriendRequest(this.state.email, this.props.history);
    this.setState({ email: "" });
  }

  render() {
    const { errors, isLoaded, messages } = this.state;

    if (!isLoaded) {
      return <div className="container">Loading...</div>;
    }

    return (
      <div className="container">
        <div className="container">
          <h3>email: {this.state.username}</h3>
          <h3>nickname: {this.state.nickname}</h3>
          <h3>phone: {this.state.phone}</h3>
        </div>

        <div className="container mt-5">
          {messages ? (
            <div className="alert alert-success" role="alert">
              Запрос в друзья отправлен
            </div>
          ) : null}

          <form action="" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Отправить запрос в друзья</label>
              <input
                type="text"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.email,
                })}
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

UserInfo.propTypes = {
  getMyInfo: PropTypes.func.isRequired,
  sendFriendRequest: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.users.user,
  errors: state.errors,
  messages: state.messages,
});

export default connect(mapStateToProps, {
  getMyInfo,
  sendFriendRequest,
})(UserInfo);

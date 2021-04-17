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
      friendRequests: [],
      email: "",
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      id,
      username,
      nickname,
      phone,
      friends,
      friendRequests,
    } = nextProps.user;

    this.setState({
      id,
      username,
      nickname,
      phone,
      friends,
      friendRequests,
    });
  }
  componentDidMount() {
    this.props.getMyInfo();
  }

  onSubmit(e) {
    //e.preventDefaults();
    this.props.sendFriendRequest(this.state.email, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <h2>email: {this.state.username}</h2>
        <h2>nickname: {this.state.nickname}</h2>
        <h2>phone: {this.state.phone}</h2>
        <hr />
        <form onSubmit={this.onSubmit}>
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
          <input type="submit" className="btn btn-info btn-block mt-4" />
        </form>
      </div>
    );
  }
}

UserInfo.propTypes = {
  getMyInfo: PropTypes.func.isRequired,
  sendFriendRequest: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.users.user,
  errors: state.errors,
});

export default connect(mapStateToProps, { getMyInfo, sendFriendRequest })(
  UserInfo
);

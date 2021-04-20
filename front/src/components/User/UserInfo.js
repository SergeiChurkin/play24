import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyInfo, sendFriendRequest } from "../../actions/userActions";
import classnames from "classnames";

class UserInfo extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    this.props.getMyInfo();
  }

  handleSubmit(e) {
    e.preventDefaults();
    const request = {
      email: this.state.email,
    };

    this.props.sendFriendRequest(request, this.props.history);
  }
  render() {
    const { errors } = this.state;
    const { user } = this.props.user;
    return (
      <div className="container">
        <div className="container">
          <h2>email: {this.state.username}</h2>
          <h2>nickname: {this.state.nickname}</h2>
          <h2>phone: {this.state.phone}</h2>
        </div>
        <div className="container">
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
};

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getMyInfo,
  sendFriendRequest,
})(UserInfo);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sendFriendRequest } from "../../actions/userActions";
import classnames from "classnames";
import axios from 'axios';


class Friends extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      errors: {},
    };
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

  handleSubmit(e) {
    e.preventDefaults();
    const request = {
        email:this.state.email
    }
     axios.post("/api/friends/invite/", { request})
     .then(res => {
        console.log(res);
      })
    //this.props.sendFriendRequest(request, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
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
            <button type="submit" className="btn btn-info btn-block mt-4" >button</button>
          </div>
        </form>
      </div>
    );
  }
}

Friends.propTypes = {
  errors: PropTypes.object.isRequired,
  sendFriendRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, {
  sendFriendRequest,
})(Friends);

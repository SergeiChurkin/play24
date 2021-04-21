import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Landing extends Component {
  componentDidMount() {
    document.title = "Play 24/7 играй всегда, играй везде";
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h1 className="display-3 mb-4">
           Play 24/7
          </h1>
          <p className="lead">
            
          </p>
          <hr />
          <Link className="btn btn-lg btn-primary" to="/register">
            Регистрация
          </Link>
          <Link className="btn btn-lg btn-secondary" to="/login">
            Вход
          </Link>
        </div>
      </div>
    </div>
    );
  }
}
Landing.propTypes = {
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps)(Landing);
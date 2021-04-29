import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { login } from "../../actions/securityActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameLogin: "",
      passwordLogin: "",
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    document.title = "Вход на сайт - Play 24/7";
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }
  componentDidUpdate() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  /*componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if(nextProps.security.validToken){
        this.props.history.push("/dashboard")
    }
  }*/

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }else{
      return {errors:{}}
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const loginRequest = {
      usernameLogin: this.state.usernameLogin,
      passwordLogin: this.state.passwordLogin,
    };
    this.props.login(loginRequest);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Вход</h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.usernameLogin,
                    })}
                    placeholder="Email"
                    name="usernameLogin"
                    value={this.state.usernameLogin}
                    onChange={this.handleChange}
                  />
                  {errors.usernameLogin && (
                    <div className="invalid-feedback">
                      {errors.usernameLogin}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.passwordLogin,
                    })}
                    placeholder="Пароль"
                    name="passwordLogin"
                    value={this.state.passwordLogin}
                    onChange={this.handleChange}
                  />
                  {errors.passwordLogin && (
                    <div className="invalid-feedback">
                      {errors.passwordLogin}
                    </div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  login,
})(Login);

import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light mb-4" >
        <div className="container">
          <a className="navbar-brand" href="/">
            Play 24/7
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/dashboard">
                  Мой Планшет
                </a>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link " href="register.html">
                  Регистрация
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="login.html">
                  Вход
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default Header;

import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <div className="container">
      <div className="col-md-8 m-auto">
        <h1>Добро пожаловать.</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Вход</h5>
            <p className="card-text">
              <form>
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="Имя пользователя"
                  name="username"
                ></input>
                <input
                  className="form-control mb-3"
                  type="password"
                  placeholder="Пароль"
                  name="password"
                ></input>
                <button type="submit" className="btn btn-primary mb-3">
                  Войти
                </button>
              </form>
            </p>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
export default Landing;

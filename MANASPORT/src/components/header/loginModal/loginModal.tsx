import React from "react";
import "./loginModal.css";
import { connect } from "react-redux";
import { IGlobalState } from "../../../reducers/reducers";
import * as actions from "../../../action";
import { createBrowserHistory } from "history";

interface IProps {
  handleCloseLogin: () => void;
}

interface IPropsGLobal {
  setToken: (token: string) => void;
}
const LoginModal: React.FC<IProps & IPropsGLobal> = props => {
  const history = createBrowserHistory({ forceRefresh: true });

  const [emailValue, setInputEmail] = React.useState("");
  const [passwordValue, setInputPassword] = React.useState("");

  const updateInputEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputEmail(event.currentTarget.value);

  const updateInputPassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputPassword(event.currentTarget.value);

  const getToken = () => {
    fetch("http://localhost:8080/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // Authorization: "Bearer " + token
      },
      body: JSON.stringify({ email: emailValue, password: passwordValue })
    }).then(response => {
      if (response.ok) {
        response.text().then(token => {
          localStorage.setItem("token", token);
          props.setToken(token);
          props.handleCloseLogin();
          history.push("/management");
        });
      }
    });
  };

  return (
    <div className="modal-dialog-centered" role="document">
      <div className="modal-content modal-login text-light">
        <div className="modal-header ">
          <h5 className="modal-title" id="exampleModalCenterTitle">
            Login
          </h5>
          <button
            type="button"
            className="close"
            onClick={props.handleCloseLogin}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control bg-warning border border-warning"
                  name="emaillogin"
                  id="emaillogin"
                  placeholder="Email"
                  onChange={updateInputEmail}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input
                  type="password"
                  className="form-control bg-warning border border-warning"
                  name="passwordlogin"
                  id="passwordlogin"
                  placeholder="***********"
                  onChange={updateInputPassword}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer no-border">
          <div className="col-6">
            <button
              type="button"
              className="btn btn-outline-info w-100"
              onClick={getToken}
            >
              Iniciar sesión
            </button>
          </div>
          <div className="col-6">
            <a href="/#">¿Olvidaste la contraseña?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token
});

const mapDispatchToProps = {
  setToken: actions.setToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);

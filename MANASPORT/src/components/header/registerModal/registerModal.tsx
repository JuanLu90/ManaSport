import React from "react";
import "./registerModal.css";

var md5 = require('md5');

interface IProps {
  handleCloseRegister: () => void;
}

const RegisterModal: React.FC<IProps> = props => {
  const [nameValue, setInputName] = React.useState("");
  const [surnameValue, setInputSurname] = React.useState("");
  const [usernameValue, setInputUsername] = React.useState("");
  const [emailValue, setInputEmail] = React.useState("");
  const [passwordValue, setInputPassword] = React.useState("");

  const updateInputName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputName(event.currentTarget.value);

  const updateInputSurname = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputSurname(event.currentTarget.value);

  const updateInputUsername = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputUsername(event.currentTarget.value);

  const updateInputEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputEmail(event.currentTarget.value);

  const updateInputPassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputPassword(md5(event.currentTarget.value));


  const newUser = () => {
    fetch("http://localhost:8080/api/users/newUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        name: nameValue,
        surname: surnameValue,
        username: usernameValue,
        email: emailValue,
        password: passwordValue
      })
    }).then(response => {
      if (response.ok) {
        response.text().then(token => {
          
        });
      }
    });
  };


  return (
    <div className="modal-dialog-centered" role="document">
      <div className="modal-content modal-register text-light">
        <div className="modal-header ">
          <h5 className="modal-title" id="exampleModalCenterTitle">
            Registro
          </h5>
          <button
            type="button"
            className="close"
            onClick={props.handleCloseRegister}
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
                  placeholder="Nombre"
                  name="name"
                  onChange={updateInputName}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control bg-warning border border-warning"
                  placeholder="Apellidos"
                  name="surname"
                  onChange={updateInputSurname}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control bg-warning border border-warning"
                  placeholder="Nombre de usuario"
                  name="username"
                  onChange={updateInputUsername}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control bg-warning border border-warning"
                  placeholder="Email"
                  name="email"
                  onChange={updateInputEmail}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input
                  type="password"
                  className="form-control bg-warning border border-warning"
                  placeholder="***********"
                  name="password"
                  onChange={updateInputPassword}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                  />
                  <label className="form-check-label">
                    Estoy de acuerdo con los términos y condiciones
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer no-border">
          <div className="col">
            <button
              type="button"
              className="btn btn-outline-success w-100"
              onClick={newUser}
            >
              Regístrate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;

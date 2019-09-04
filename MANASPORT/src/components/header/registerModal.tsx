import React, { useState } from "react";
import { InputGroup, FormControl, Alert, Form } from "react-bootstrap";
import styled from "styled-components";
var md5 = require('md5');

// ********* Styles - Styled Components - CSSINJS **********
const Label = styled.label`
  font-size: 0.85em;
`
const Span = styled.span`
  font-size: 0.85em;
`
const Modal = styled.div`
  width: 500px;
  opacity: 0.95;
`
const MiniHr = styled.hr({
  border: 'none',
  display: 'block',
  height: "2px",
  margin: "0 auto -18px auto",
  width: "200px",
  overflow: "visible",
  position: "relative"
});

interface IProps {
  handleCloseRegister: () => void;
}

const RegisterModal: React.FC<IProps> = props => {
  const [nameValue, setInputName] = React.useState("");
  const [surnameValue, setInputSurname] = React.useState("");
  const [usernameValue, setInputUsername] = React.useState("");
  const [emailValue, setInputEmail] = React.useState("");
  const [passwordValue, setInputPassword] = React.useState("");
  const [createDateValue, setInputCreateDateValue] = React.useState(
    new Date().toLocaleDateString()
  );

  const updateInputName = (event: any) =>
    setInputName(event.currentTarget.value);

  const updateInputSurname = (event: any) =>
    setInputSurname(event.currentTarget.value);

  const updateInputUsername = (event: any) =>
    setInputUsername(event.currentTarget.value);

  const updateInputEmail = (event: any) =>
    setInputEmail(event.currentTarget.value);

  const updateInputPassword = (event: any) =>
    setInputPassword(md5(event.currentTarget.value));

  const [alertWrongValue, setAlertWrongValue] = useState(false);
  const toggleWrongValue = React.useCallback(() => setAlertWrongValue(s => !s), []); //Open and close alert league name invalid


  const [alertRightValue, setAlertRightValue] = useState(false);
  const toggleRightValue = React.useCallback(() => setAlertRightValue(s => !s), []); //Open and close alert league name valid


  const [checkEmail, setCheckdEmail] = React.useState(true);
  const toggleCheckEmail = React.useCallback(() => setCheckdEmail(s => !s), []); //Check if email is valid
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const [checkCredentials, setCheckdCredentials] = React.useState(true);
  const toggleCheckCredentials = React.useCallback(() => setCheckdCredentials(s => !s), []); //Check if credentials are valid

  const [checkUserAdded, setCheckdUserAdded] = React.useState(false);
  const toggleCheckUserAdded = React.useCallback(() => setCheckdUserAdded(s => !s), []); //Check if credentials are valid


  const newUser = () => {
    const finalValidateEmail = validEmailRegex.test(emailValue);

    if (!finalValidateEmail) {
      toggleCheckEmail();
      setTimeout(() => toggleCheckEmail(), 4000);
    } else {
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
          password: passwordValue,
          createDate: createDateValue
        })
      }).then(response => {
        if (response.ok) {
          toggleCheckUserAdded();
          setTimeout(() => toggleCheckUserAdded(), 4000);
        }
        else {
          response.json().then(({ e }) => {
            if (e === 1062) {
              toggleWrongValue();
              setTimeout(() => toggleWrongValue(), 6000)
            } else {
              toggleCheckCredentials();
              setTimeout(() => toggleCheckCredentials(), 4000);
            }
          });
        }
      });
    }
  };


  return (
    <div className="modal-dialog-centered" role="document">
      <Modal className="modal-content bg-dark border border-secondary text-light rounded-0">
        <div className="modal-header border-0">
          <h5 className="modal-title pl-2" id="exampleModalCenterTitle">
            Registro en ManaSport
          </h5>
          <button
            type="button"
            className="close"
            onClick={props.handleCloseRegister}
          >
            <span aria-hidden="true" className="text-light">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="row">
              <div className="col">
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" className="pt-0 pb-0"><img src="/images/form/profile-login.png" width="15" alt="" /></InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type="text"
                    className="form-control pt-0 pb-0 pl-2 pr-2 mt-0"
                    placeholder="Nombre"
                    name="name"
                    onChange={updateInputName}
                  />
                </InputGroup>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" className="pt-0 pb-0"><img src="/images/form/profile-login.png" width="15" alt="" /></InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type="text"
                    className="form-control pt-0 pb-0 pl-2 pr-2 mt-0"
                    placeholder="Apellidos"
                    name="surname"
                    onChange={updateInputSurname}
                  />
                </InputGroup>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" className="pt-0 pb-0"><img src="/images/form/username.png" width="15" alt="" /></InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type="text"
                    className="form-control pt-0 pb-0 pl-2 pr-2 mt-0"
                    placeholder="Nombre de usuario"
                    name="username"
                    onChange={updateInputUsername}
                  />
                </InputGroup>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" className="pt-0 pb-0"><img src="/images/form/email.png" width="15" alt="" /></InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type="text"
                    className="form-control pt-0 pb-0 pl-2 pr-2 mt-0"
                    placeholder="Email"
                    name="email"
                    onChange={updateInputEmail}
                  />
                </InputGroup>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" className="pt-0 pb-0"><img src="/images/form/lock.png" width="15" alt="" /></InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type="password"
                    className="form-control pt-0 pb-0 pl-2 pr-2 mt-0 w-75"
                    placeholder="Contraseña"
                    name="password"
                    onChange={updateInputPassword}
                  />
                </InputGroup>
              </div>
            </div>
            {alertWrongValue && (
              <div className="row justify-content-center mt-2 pl-1 pr-1">
                <div className="col text-center">
                  <Alert variant="danger" className="pt-2 pb-2 pl-0 pr-0">
                    <img src="/images/other/cancel.png" width="35" alt="" className="mr-3" />
                    <Span> <b> Ya existe una cuenta con ese nombre de usuario o email.</b>
                      <br />
                      Si está registrado, inicie sesión. </Span>
                  </Alert>
                </div>
              </div>
            )}
            {!checkEmail && (
              <div className="row justify-content-center mt-1">
                <div className="col text-center">
                  <Alert variant="danger" className="p-2">
                    <img
                      src="/images/other/cancel.png"
                      width="35"
                      alt=""
                      className="mr-3"
                    />
                    <span>
                      <b> Email inválido.</b>
                    </span>
                  </Alert>
                </div>
              </div>
            )}
            {!checkCredentials && (
              <div className="row justify-content-center pl-3 pr-3">
                <Alert variant="danger" className="pt-1 pb-1 pr-4 pl-4">
                  <img src="/images/other/cancel.png" width="35" alt="" className="mr-3" />
                  <Span> <b> Datos introducidos erróneos</b></Span>
                </Alert>
              </div>
            )}
            {checkUserAdded && (
              <div className="row justify-content-center mt-1">
                <div className="col text-center">
                  <Alert variant="success" className="p-2">
                    <img src="/images/other/send.png" width="35" alt="" className="mr-3" />
                    <span> <b> Registrado correctamente</b> Puede iniciar sesión</span>
                  </Alert>
                </div>
              </div>
            )}
            <MiniHr className="bg-warning" />

          </form>
        </div>
        <div className="modal-footer border-0">
          <div className="col p-0">
            <button
              type="button"
              className="btn btn-warning w-100 font-weight-bold text-uppercase"
              onClick={newUser}
            >
              Regístrate
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RegisterModal;

import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import styled from "styled-components";
var md5 = require('md5');

// ********* Styles - Styled Components - CSSINJS **********
const Label = styled.label`
  font-size: 0.85em;
`
const Modal = styled.div`
  width: 500px;
  opacity: 0.95;
`

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
        password: passwordValue,
        createDate: createDateValue
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
      <Modal className="modal-content bg-dark border border-secondary text-light rounded-0">
        <div className="modal-header border-0">
          <h5 className="modal-title pl-2" id="exampleModalCenterTitle">
            Registro
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
            <div className="row">
              <div className="col">
                <div className="form-check">
                  <input
                    className="form-check-input align-items-center mt-2"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                  />
                  <Label className="form-check-label pl-1">
                    Estoy de acuerdo con los términos y condiciones
                  </Label>
                </div>
              </div>
            </div>
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

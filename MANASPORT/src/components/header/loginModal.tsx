import React from "react";
import "./transparentBgModal.css";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers/reducers";
import * as actions from "../../action";
import { createBrowserHistory } from "history";
import { InputGroup, FormControl } from "react-bootstrap";
import styled from "styled-components";

// ********* Styles - Styled Components - CSSINJS **********
const Col = styled.div`
  font-size: 0.85em;
`
const Modal = styled.div`
  width: 400px;
  opacity: 0.95;
`

interface IProps {
  handleCloseLogin: () => void;
  handleShowRegister: () => void;
}

interface IPropsGLobal {
  setToken: (token: string) => void;
}
const LoginModal: React.FC<IProps & IPropsGLobal> = props => {
  const history = createBrowserHistory({ forceRefresh: true });

  const [emailValue, setInputEmail] = React.useState("");
  const [passwordValue, setInputPassword] = React.useState("");

  const updateInputEmail = (event: any) =>
    setInputEmail(event.currentTarget.value);

  const updateInputPassword = (event: any) =>
    setInputPassword(event.currentTarget.value);

  const goToRegister = () => {
    props.handleCloseLogin();
    props.handleShowRegister();
  }

  const [inputCheckbox, setInputCheckbox] = React.useState(false);
  const toggleCheckbox = React.useCallback(() => setInputCheckbox(s => !s), []); //Open and close alert league name invalid
console.log(inputCheckbox)



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
      <Modal className="modal-content bg-dark border border-secondary text-light rounded-0">
        <div className="modal-header border-0">
          <h5 className="modal-title pl-2" id="exampleModalCenterTitle">
            Iniciar en ManaSport
          </h5>
          <button
            type="button"
            className="close"
            onClick={props.handleCloseLogin}
          >
            <span aria-hidden="true" className="text-light">&times;</span>
          </button>
        </div>
        <div className="modal-body pb-0">
          <form>
            <div className="row">
              <div className="col">
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" className="pt-0 pb-0">
                      <img src="/images/form/email.png" width="15" alt="" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type="text"
                    className="form-control pt-0 pb-0 pl-2 pr-2 mt-0"
                    name="emaillogin"
                    id="emaillogin"
                    placeholder="Email"
                    onChange={updateInputEmail}
                  />
                </InputGroup>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" className="pt-0 pb-0">
                      <img src="/images/form/lock.png" width="15" alt="" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type={inputCheckbox === true ? "text" : "password"}
                    className="form-control pt-0 pb-0 pl-2 pr-2 mt-0"
                    placeholder="Contraseña"
                    name="passwordlogin"
                    id="myInput"
                    onChange={updateInputPassword}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>
                    <button></button>
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </div>
          </form>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-warning w-100 font-weight-bold text-uppercase"
                onClick={getToken}
              >
                Iniciar sesión
            </button>
            </div>
          </div>
          <div className="row mt-3 mb-3">
            <Col className="col text-center">
              ¿La primera vez? <a href="/#" className="text-warning text-decoration-none" onClick={goToRegister}>Registrate </a>
            </Col>
          </div>
        </div>
      </Modal>
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

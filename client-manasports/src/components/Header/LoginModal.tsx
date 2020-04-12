// DEPENDENCES
import React, { useState, useEffect } from "react";
// import Modal from 'react-bootstrap/Modal';
import { InputGroup, FormControl, Modal } from "react-bootstrap";
import { connect } from 'react-redux';
import { loginAction } from "../../redux/actions/userActions";
import styled from "styled-components";
import './header.css';
// import md5 from "md5";

// ********* Styles - Styled Components - CSSINJS **********
const Col = styled.div`
  font-size: 0.85em;
`

interface IProps {
    loginAction: any;
    setOpenModalRegister: any;
    setOpenModalLogin: any;
    show: any;
    onHide: any;
}

const ModalLogin: React.FC<IProps> = ({ loginAction, setOpenModalRegister, setOpenModalLogin }) => {

    const initialState = {
        email: "",
        password: ""
    };

    const toogleLoginToRegister = () => {
        setOpenModalLogin(false)
        setOpenModalRegister(true);
    }

    const [user, setUser] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const onLogin = () => {
        loginAction(user);
    }

    const handleChange = (event: any) => {     // CHANGE PROPERTIES ABOUT THEM NAME
        const { name, value } = event.target;

        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    return (
        <>
            <Modal
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                className="loginModalHeader"
                centered
            >
                <Modal.Header className="p-2" closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h5 className="modal-title pl-2 text-white" id="exampleModalCenterTitle">
                            Iniciar en ManaSport
                        </h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            <InputGroup className="mb-3 rounded">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1" className="pt-0 pb-0">
                                        <img src="/images/form/email.png" width="15" alt="" />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    type="text"
                                    className="form-control pt-0 pb-0 pl-2 pr-2 mt-0"
                                    style={{ color: 'black' }}
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </InputGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1" className="pt-0 pb-0">
                                        <img src="/images/form/lock.png" width="15" alt="" />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    type={showPassword ? "text" : "password"}
                                    className="form-control pt-0 pb-0 pl-2 pr-2 mt-0 border-0"
                                    placeholder="Contraseña"
                                    name="password"
                                    id="myInput"
                                    value={user.password}
                                    onChange={handleChange}
                                />
                                <InputGroup.Append style={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                                    <InputGroup.Text>
                                        <img src={`/images/form/${showPassword ? 'noeye' : 'eye'}.png`} width="20" alt="" />
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <div className="container-fluid">
                        <div className="row mt-2">
                            <div className="col">
                                <button
                                    type="button"
                                    className="btn btn-warning w-100 font-weight-bold text-uppercase"
                                    onClick={onLogin}
                                >
                                    Iniciar sesión
                                </button>
                            </div>
                        </div>
                        <div className="row mt-2 mb-2">
                            <Col className="col text-center text-white">
                                ¿La primera vez?
                                <a href="/#"
                                    className="text-warning text-decoration-none"
                                    onClick={() => toogleLoginToRegister()}>
                                    Registrate
                                    </a>
                            </Col>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapDispatchToProps = {
    loginAction
};

export default connect(null, mapDispatchToProps)(ModalLogin);
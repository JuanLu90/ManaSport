// DEPENDENCES
import React, { useState } from "react";
import { InputGroup, FormControl, Modal } from "react-bootstrap";
import { connect } from 'react-redux';
import { registerAction } from "../../redux/actions/userActions";
import styled from "styled-components";
import md5 from "md5";

// ********* Styles - Styled Components - CSSINJS **********
const Col = styled.div`
  font-size: 0.85em;
`

const ModalRegister = (props) => {

    const { registerAction, setOpenModalRegister, setOpenModalLogin } = props;

    const initialState = {
        username: "",
        email: "",
        password: ""
    };

    const toogleRegisterToLogin = () => {
        setOpenModalLogin(true)
        setOpenModalRegister(false);
    }


    const [newUser, setNewUser] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = event => {     // CHANGE PROPERTIES ABOUT THEM NAME
        const { name, value } = event.target;

        setNewUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const onSave = () => {

        let newUserHash = {
            ...newUser,
            password: md5(newUser.password)
        }

        registerAction(newUserHash);
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            className="registerModalHeader"
            centered
        >
            <Modal.Header className="p-2" closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h5 className="modal-title pl-2 text-white" id="exampleModalCenterTitle">
                        REGISTER
                    </h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col">
                        <InputGroup className="mb-3 rounded">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1" className="pt-0 pb-0">
                                    <img src="/images/form/profile-login.png" width="15" alt="" />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="text"
                                className="form-control pt-0 pb-0 pl-2 pr-2 mt-0"
                                style={{ color: 'black' }}
                                name="username"
                                placeholder="Username"
                                value={newUser.username}
                                onChange={handleChange}
                            />
                        </InputGroup>
                    </div>
                </div>
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
                                placeholder="email"
                                value={newUser.email}
                                onChange={handleChange}
                            />
                        </InputGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <InputGroup className="rounded">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1" className="pt-0 pb-0">
                                    <img src="/images/form/email.png" width="15" alt="" />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type={showPassword ? "text" : "password"}
                                className="form-control pt-0 pb-0 pl-2 pr-2 mt-0 border-0"
                                style={{ color: 'black' }}
                                name="password"
                                placeholder="password"
                                value={newUser.password}
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
                                onClick={onSave}
                            >
                                REGISTER
                                </button>
                        </div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <Col className="col text-center text-white">
                            ¿Ya registrado? 
                            <a href="/#" 
                            className="text-warning text-decoration-none" 
                            onClick={() => toogleRegisterToLogin()}>Login </a>
                        </Col>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

const mapDispatchToProps = {
    registerAction
};

export default connect(null, mapDispatchToProps)(ModalRegister);
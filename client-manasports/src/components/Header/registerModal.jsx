// DEPENDENCES
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { registerAction } from "../../redux/actions/userActions";
import md5 from "md5";

const ModalRegister = (props) => {

    const { registerAction } = props;

    const initialState = {
        username: "",
        email: "",
        password: ""
    };

    const [newUser, setNewUser] = useState(initialState);

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
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    REGISTER
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col">
                        Username
                            <input type="text" name="username" value={newUser.username} onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Email
                            <input type="text" name="email" value={newUser.email} onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Password
                            <input type="text" name="password" value={newUser.password} onChange={handleChange}></input>
                    </div>
                </div>
                <button onClick={onSave} type="submit">REGISTER</button>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.onHide}>Close</button>
            </Modal.Footer>
        </Modal>
    );
}

const mapDispatchToProps = {
    registerAction
};

export default connect(null, mapDispatchToProps)(ModalRegister);
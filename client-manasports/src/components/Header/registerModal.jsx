// DEPENDENCES
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { registerAction } from "../../redux/actions/action";

const ModalRegister = (props) => {

    const { registerAction } = props;

    const initialState = {
        name: "",
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
        registerAction(newUser);
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
                <form onSubmit={onSave}>
                    <div className="row">
                        <div className="col">
                            Username
                            <input type="text" name="name" value={newUser.name} onChange={handleChange}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Email
                            <input type="text" name="username" value={newUser.username} onChange={handleChange}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Password
                            <input type="text" name="email" value={newUser.email} onChange={handleChange}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Confirm Password
                            <input type="text" name="password" value={newUser.password} onChange={handleChange}></input>
                        </div>
                    </div>
                    <button type="submit">REGISTER</button>
                </form>
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
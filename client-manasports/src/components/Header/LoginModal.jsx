// DEPENDENCES
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { loginAction } from "../../redux/actions/userActions";
// import md5 from "md5";

const ModalLogin = (props) => {

    const { loginAction } = props;

    const initialState = {
        email: "",
        password: ""
    };

    const [user, setUser] = useState(initialState);

    const onLogin = () => {
        loginAction(user)
    }

    const handleChange = event => {     // CHANGE PROPERTIES ABOUT THEM NAME
        const { name, value } = event.target;

        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    LOGIN
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col">
                        Email
                            <input type="text" name="email" value={user.email} onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Password
                            <input type="text" name="password" value={user.password} onChange={handleChange} />
                    </div>
                </div>
                <button onClick={onLogin} type="submit">LOGIN</button>
            </Modal.Body>
            <Modal.Footer>
                <button>Close</button>
            </Modal.Footer>
        </Modal>
    );
}

const mapDispatchToProps = {
    loginAction
};

export default connect(null, mapDispatchToProps)(ModalLogin);
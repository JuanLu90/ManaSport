// DEPENDENCES
import React, { useState } from "react";
import { connect } from "react-redux";
import ModalLogin from "./LoginModal";
import ModalRegister from "./RegisterModal";
import { Navbar, Nav } from 'react-bootstrap';

const Header = props => {
    const { user } = props;
    const [openModalLogin, setOpenModalLogin] = useState(false);
    const [openModalRegister, setOpenModalRegister] = useState(false);

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">MANASPORT</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav className="text-white">{user && user.username}</Nav>
                    <Nav>
                        <button className="btn btn-info" onClick={() => setOpenModalLogin(!openModalLogin)}>Login</button>
                        <button className="btn btn-success" onClick={() => setOpenModalRegister(!openModalRegister)}>REGISTER</button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <ModalRegister
                show={openModalRegister}
                onHide={() => setOpenModalRegister(false)}
            />
            <ModalLogin
                show={openModalLogin}
                onHide={() => setOpenModalLogin(false)}
            />
        </>
    );
};

const mapStateToProps = state => {
    const { userReducer } = state;
    return {
        user: userReducer.user
    }
};

export default connect(mapStateToProps)(Header);
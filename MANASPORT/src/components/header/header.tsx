import React, { useState } from "react";
import "./header.css";
import { Modal, Navbar, Nav } from "react-bootstrap";
import LoginModal from "./loginModal/loginModal";
import RegisterModal from "./registerModal/registerModal";
import jwt from "jsonwebtoken";
import * as actions from "../../action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

interface IPropsGLobal {
  setToken: (token: string) => void;
}

const Header: React.FC<IPropsGLobal> = props => {
  //Modals Login and Register
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const logout = () => {
    localStorage.removeItem("token");
    props.setToken("");
  };

  const token: any = localStorage.getItem("token");
  const decoded: any = jwt.decode(token);
  
  return (
    <>
      <header className="position-fixed w-100">
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand className="col header-logo">
            <a href="/">
              <img src="/images/logotipo.png" alt="logo" />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            {!token && (
              <Nav>
                <div className="col">
                  <button
                    className="btn btn-outline-light"
                    onClick={handleShowLogin}
                  >
                    Login
                  </button>
                </div>
                <div className="col">
                  <button
                    className="btn btn-outline-light mr-5"
                    onClick={handleShowRegister}
                  >
                    Register
                  </button>
                </div>
              </Nav>
            )}
            {token && (
              <Nav className="w-50">
                <div className="row align-items-center">
                  <div className="col-7 text-right">
                    <span className="text-light">Hola, {decoded.username}</span>
                  </div>
                  <div className="col-3">

                    <Link to={'/management/user'} >
                      {decoded.avatar === null &&
                        <img
                          src="/images/profile/no-profile.png"
                          width="30"
                          alt=""
                        />
                      }
                      {decoded.avatar !== null &&
                        <img
                          src="/images/profile/img-profile-1.png"
                          width="30"
                          alt=""
                        />
                      }
                    </Link>

                  </div>
                  <div className="col-2">
                    <a href="/#">
                      <img
                        src="/images/other/logout.png"
                        onClick={logout}
                        width="20"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>
      </header>
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <LoginModal handleCloseLogin={handleCloseLogin} />
      </Modal>
      <Modal show={showRegister} onHide={handleCloseRegister}>
        <RegisterModal handleCloseRegister={handleCloseRegister} />
      </Modal>
    </>
  );
};

const mapDispatchToProps = {
  setToken: actions.setToken
};

export default connect(
  null,
  mapDispatchToProps
)(Header);

import React, { useState } from "react";
import { Modal, Navbar, Nav } from "react-bootstrap";
import LoginModal from "./loginModal/loginModal";
import RegisterModal from "./registerModal/registerModal";
import jwt from "jsonwebtoken";
import * as actions from "../../action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IUser } from "../../interfaces";
import { IGlobalState } from "../../reducers/reducers";
import styled from "styled-components";

// ********* Styles - Styled Components - CSSINJS **********
const HeaderDiv = styled.header`
  background-color: rgba(36, 36, 36, 0);
  z-index: 1000;
`
const ButtonRegister = styled.button`
  background-color: #ecf0f1;
  font-size: 0.85em;
  font-weight: bolder;
  &:hover {
    background-color: #bdc3c7;
  }
`

interface IPropsGLobal {
  setToken: (token: string) => void;
  users: IUser[];
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
  const currentUser = token ? props.users.find(u => u.UserId === decoded.UserId) : null;

  return (
    <>
      <HeaderDiv className="position-fixed w-100">
        <Navbar collapseOnSelect expand="lg" className="p-0">
          <Navbar.Brand className="col header-logo">
            <a href="/">
              <img src="/images/logotipo.png" alt="logo" width="280px" />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            {!token && (
              <Nav className="w-50 justify-content-end">
                <div className="col-4 text-right">
                  <a
                    className="text-light"
                    href="/#"
                    onClick={handleShowLogin}
                  >
                    Iniciar sesión
                  </a>
                </div>
                <div className="col-4">
                  <ButtonRegister
                    className="btn text-dark pt-0 pb-0 pl-3 pr-3 text-uppercase"
                    onClick={handleShowRegister}
                  >
                    Regístrarse
                  </ButtonRegister>
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
                          src={currentUser ? currentUser.avatar : undefined}
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
      </HeaderDiv>
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


const mapStateToProps = (state: IGlobalState) => ({
  users: state.users,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

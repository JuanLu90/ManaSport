import React, { useState, useRef, useEffect } from "react";
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



const ButtonRegister = styled.button`
  background-color: #ecf0f1;
  font-size: 0.85em;
  font-weight: bolder;
  &:hover {
    background-color: #bdc3c7;
  }
`
const SpanUsername = styled.span`
  font-family: "Source Sans Pro", sans-serif;
  font-size: 0.95em;
`

interface IPropsGLobal {
  setToken: (token: string) => void;
  users: IUser[];
}

const Header: React.FC<IPropsGLobal> = props => {

  const [navBackground, setNavBackground] = useState(false)

  const navRef: any = useRef()
  navRef.current = navBackground
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 40
      if (navRef.current !== show) {
        setNavBackground(show)
      }
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  let HeaderDiv = styled.header``
  if(navBackground === false){
    HeaderDiv = styled.header`
    background-color: rgba(0, 0, 0, 0);
    z-index: 1000;
    transition: 0.3s;
    &:hover {
      background-color: rgba(36, 36, 36, 0.4);
    }
  `
  }else{
    HeaderDiv = styled.header`
    background-color: rgba(36, 36, 36, 0.95);
    z-index: 1000;
    transition: 0.3s;
  `
  }
 

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
              <Nav className="w-50 justify-content-center">
                <div className="row align-items-center">
                  <div className="col-7 pr-0 text-right">
                  <Link to={'/management/user'} >
                    <SpanUsername className="text-light">{decoded.username}</SpanUsername>
                  </Link>
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
                        title="Cerrar sesión"
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

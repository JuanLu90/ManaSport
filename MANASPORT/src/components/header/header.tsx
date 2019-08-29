import React, { useState, useRef, useEffect } from "react";
import { Modal, Navbar, Nav, Form, Button, FormControl, InputGroup } from "react-bootstrap";
import LoginModal from "./loginModal";
import RegisterModal from "./registerModal";
import jwt from "jsonwebtoken";
import * as actions from "../../action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IUser, ITournament } from "../../interfaces";
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
const SearchResult = styled.div`
  position: absolute;
  width: 93%;
  left: 25px;
  top: 40px;
  background-color: rgba(108, 117, 125, 0.95);
  font-size: 0.8em;
`
const SpanUsername = styled.span`
  font-family: "Source Sans Pro", sans-serif;
  font-size: 0.95em;
  &:hover{
    text-decoration: underline;
  }
`
const ButtonHeader = styled.button`
  background-color: transparent;
  border: none;
  box-shadow: inset 0 -4px rgba(255,193,7,0.2);
  height: 55px;
  padding: 10px;
  font-size: 0.9em;
  color: white;
  transition: 0.3s;
  &:hover{
    box-shadow: inset 0 -4px rgba(255,193,7,0.8);
  }
  &:focus{
    outline:none;
  }
`
const ImgSearch = styled.img`
  cursor: pointer;
`
interface IProps { }
interface IPropsGLobal {
  setToken: (token: string) => void;
  users: IUser[];
  allleagues: ITournament[];
}

const Header: React.FC<IProps & IPropsGLobal> = props => {

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
  if (navBackground === false) {
    HeaderDiv = styled.header`
    background-color: rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid #343A40;
    z-index: 1000;
  `
  } else {
    HeaderDiv = styled.header`
    background-color: rgba(39, 42, 51, 0.95);
    border-bottom: 1px solid #343A40;
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

  const [inputLeagues, setInputLeagues] = React.useState<string>("");

  const UpdateInputLeagues = (event: any) =>
    setInputLeagues(event.currentTarget.value);

  const token: any = localStorage.getItem("token");
  const decoded: any = jwt.decode(token);
  const currentUser = token ? props.users.find(u => u.UserId === decoded.UserId) : null;
  
  // let table = []
  // for (var i = 0; i < inputLeagues.length; i++) {
  //   table.push(<tr>
  //     {
  //       inputLeagues !== "" &&
  //       <SearchResult className="text-light rounded" key={['recipient', i].join('_')}>
  //         {props.allleagues
  //           .filter(l =>
  //             l.name.toLowerCase().includes(inputLeagues.toLowerCase())
  //           )
  //           .slice(0, 5)
  //           .map(l => (
  //             <Link
  //               to={"/leagues/allleaguesDetails/" + l.TournamentId}
  //               className="text-light p-0"
  //               style={{ textDecoration: 'none' }}>
  //               <div className="row p-2">
  //                 <div className="col-8">{l.name}</div>
  //                 <div className="col-4 text-center">{l.NameAdmin}</div>
  //               </div>
  //             </Link>
  //           ))}
  //       </SearchResult>


  //     }
  //   </tr>)
  // }



  return (
    <>
      <HeaderDiv className="position-fixed w-100">
        <Navbar collapseOnSelect expand="lg" className="p-0">
          <Navbar.Brand>
            <a href="/">
              <img src="/images/logotipo.png" alt="logo" width="230px" />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-between"
          >
            <Form inline style={{ width: '500px' }} className="ml-2">
              {token ? <ButtonHeader>Tus Ligas</ButtonHeader> : <Link to={'/leagues'} className="border-0"><ButtonHeader>Info Ligas</ButtonHeader> </Link>}
              {!token && (
                <InputGroup size="sm" className="w-75">
                  <FormControl className="bg-dark border border-dark text-light ml-sm-4" value={inputLeagues} onChange={UpdateInputLeagues} />
                  <InputGroup.Append>
                    <InputGroup.Text className="bg-dark border border-dark text-light" > <ImgSearch src="/images/other/search.png" width="14" alt="" /></InputGroup.Text>
                  </InputGroup.Append>
                  {inputLeagues !== "" &&
                    <SearchResult className="text-light rounded" key={1}>
                      {props.allleagues
                        .filter(l =>
                          l.name.toLowerCase().includes(inputLeagues.toLowerCase())
                        )
                        .slice(0, 5)
                        .map(l => (
                          <Link
                            to={"/leagues/allleaguesDetails/" + l.TournamentId}
                            className="text-light p-0"
                            style={{ textDecoration: 'none' }}>
                            <div className="row p-2" key={l.TournamentId}>
                              <div className="col-8">{l.name}</div>
                              <div className="col-4 text-center">{l.NameAdmin}</div>
                            </div>
                          </Link>
                        ))}
                    </SearchResult>
                  }

                </InputGroup>
              )}
            </Form>
            {!token && (
              <Nav className="w-50 justify-content-end mr-3">
                <a
                  className="text-light mr-4"
                  href="/#"
                  onClick={handleShowLogin}
                >
                  Iniciar sesión
                  </a>
                <ButtonRegister
                  className="btn text-dark pt-0 pb-0 pl-3 pr-3 text-uppercase"
                  onClick={handleShowRegister}
                >
                  Regístrarse
                  </ButtonRegister>
              </Nav>
            )}
            {token && (
              <Nav className="w-50 justify-content-end mr-4 align-middle">
                <Link to={'/management/user'} >
                  <SpanUsername className="text-light align-middle">{decoded.username}</SpanUsername>
                </Link>
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
                      className="ml-3"
                    />
                  }
                </Link>
                <a href="/#">
                  <img
                    src="/images/other/logout.png"
                    onClick={logout}
                    width="20"
                    alt=""
                    title="Cerrar sesión"
                    className="ml-3"
                  />
                </a>
              </Nav>
            )}

          </Navbar.Collapse>
        </Navbar>
      </HeaderDiv>
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <LoginModal handleCloseLogin={handleCloseLogin} handleShowRegister={handleShowRegister} />
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
  allleagues: state.allleagues
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

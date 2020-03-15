// DEPENDENCES
import React, { useState } from "react";
import { connect } from "react-redux";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import {
  Modal,
  Navbar,
  Nav,
  Form,
  FormControl,
  InputGroup
} from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = props => {
  const { user } = props;

  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);

  // ********* Styles - Styled Components - CSSINJS **********

  const HeaderDiv = styled.header`
      background-color: rgba(0, 0, 0, 0.2);
      border-bottom: 1px solid #343a40;
      z-index: 1000;
    `;
  const ButtonRegister = styled.button`
    background-color: #ecf0f1;
    font-size: 0.85em;
    font-weight: bolder;
    &:hover {
      background-color: #bdc3c7;
    }
`;
const ButtonLogin = styled.button`
  background-color: transparent;
  color: white;
  border: 0;
`;
  const SearchResult = styled.div`
    position: absolute;
    width: 93%;
    left: 25px;
    top: 35px;
    background-color: rgba(108, 117, 125, 1);
    font-size: 0.8em;
  `;
  const SpanUsername = styled.span`
    font-family: "Source Sans Pro", sans-serif;
    font-size: 0.95em;
    &:hover {
      text-decoration: underline;
    }
  `;
  const ButtonHeader = styled.button`
    background-color: transparent;
    border: none;
    box-shadow: inset 0 -4px rgba(255, 193, 7, 0.2);
    height: 55px;
    padding: 10px;
    font-size: 0.9em;
    color: white;
    transition: 0.3s;
    &:hover {
      box-shadow: inset 0 -4px rgba(255, 193, 7, 0.8);
    }
    &:focus {
      outline: none;
    }
    `;
  const ImgSearch = styled.img`
    cursor: pointer;
`;

  const RowHover = styled.div`
    &:hover {
      color: yellow;
    }
`;

  return (
    <> <HeaderDiv className="w-100">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
          <Form inline style={{ width: "500px" }} className="ml-2">
            {user ? (
              <Link to={"/management"} className="border-0">
                <ButtonHeader>Tus Ligas</ButtonHeader>{" "}
              </Link>
            ) : (
                <Link to={"/leagues"} className="border-0">
                  <ButtonHeader>Info Ligas</ButtonHeader>{" "}
                </Link>
              )}
            {!user && (
              <InputGroup size="sm" className="w-75">
                {/* <FormControl
                    className="bg-dark border border-dark text-light ml-sm-4"
                    autoFocus
                    value={inputLeagues}
                    onChange={UpdateInputLeagues}
                  /> */}
                <InputGroup.Append>
                  <InputGroup.Text className="bg-dark border border-dark text-light">
                    <ImgSearch
                      src="/images/other/search.png"
                      width="14"
                      alt=""
                    />
                  </InputGroup.Text>
                </InputGroup.Append>
                {/* {inputLeagues !== "" && (
                    <SearchResult className="text-light rounded">
                      {props.allleagues
                        .filter(l =>
                          l.name
                            .toLowerCase()
                            .includes(inputLeagues.toLowerCase())
                        )
                        .slice(0, 5)
                        .map(l => (
                          <RowHover className="row p-2" key={l.TournamentId} style={{ cursor: 'pointer' }} onClick={() => history.push("/management/leagueDetails/" + l.TournamentId)
                          }>
                            <div className="col-8">{l.name}</div>
                            <div className="col-4 text-center">
                              {l.NameAdmin}
                            </div>
                          </RowHover>
                        ))}
                    </SearchResult>
                  )} */}
              </InputGroup>
            )}
          </Form>
          {!user && (
            <Nav className="w-50 justify-content-end mr-3">
              <ButtonLogin className="text-light mr-4" onClick={() => setOpenModalLogin(!openModalLogin)}>
                Iniciar sesión
              </ButtonLogin>
              <ButtonRegister
                className="btn text-dark pt-0 pb-0 pl-3 pr-3 text-uppercase"
                onClick={() => setOpenModalRegister(!openModalRegister)}
              >
                Regístrarse
                </ButtonRegister>
            </Nav>
          )}
          {user && (
            <Nav className="w-50 justify-content-end mr-4 align-middle">
              <Link to={"/management/user"}>
                <SpanUsername className="text-light align-middle">
                  {/* {decoded.username} */}
                </SpanUsername>
              </Link>
              {/* <Link to={"/management/user"}>
                  {decoded.avatar === null && (
                    <img
                      src="/images/profile/no-profile.png"
                      width="30"
                      alt=""
                    />
                  )}
                  {decoded.avatar !== null && (
                    <img
                      src={currentUser ? currentUser.avatar : undefined}
                      width="30"
                      alt=""
                      className="ml-3"
                    />
                  )}
                </Link> */}
              <a href="/#">
                <img
                  src="/images/other/logout.png"
                  // onClick={logout}
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

      <RegisterModal
        show={openModalRegister}
        setOpenModalLogin={setOpenModalLogin}
        setOpenModalRegister={setOpenModalRegister}
        onHide={() => setOpenModalRegister(false)}
      />
      <LoginModal
        show={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
        setOpenModalRegister={setOpenModalRegister}
        onHide={() => setOpenModalLogin(false)}
      />
    </HeaderDiv>
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
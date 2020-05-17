// DEPENDENCES
import React, { useState } from "react";
import { connect } from "react-redux";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import {
  Navbar,
  Nav,
  Form,
  InputGroup
} from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IGlobalState } from "../../redux/reducers/reducers";

// ********* Styles - Styled Components - CSSINJS **********
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

const SpanUsername = styled.span`
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


interface IProps {
  user: any;
}

const Header: React.FC<IProps> = ({ user }) => {

  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);

  return (
    <> 
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="py-0">
        <Navbar.Brand>
          <a href="/">
            <img src="/images/logotipo.png" alt="logo" width="220px" />
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
                <ButtonHeader>Tournaments</ButtonHeader>
              </Link>
            ) : (
                <Link to={"/leagues"} className="border-0">
                  <ButtonHeader>Info Ligas</ButtonHeader>
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
              <span className="text-white mr-3">{user.username}</span>
              <a href="/#">
                <i className="fas text-warning fa-sign-out-alt" title="Log out"></i>
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
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => {
  const { userReducer } = state;
  return {
    user: userReducer.user
  }
};

export default connect(mapStateToProps)(Header);
//React´s Components
import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
//JsonWebToken
import jwt from "jsonwebtoken";
//Interfaces
import { IUser } from "../../interfaces";
//Redux
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers/reducers";
//Styled Components - CSSINJS
import styled from "styled-components";

// ********* Styles - Styled Components - CSSINJS **********

const Wrapper = styled.div`
  font-family: "Source Sans Pro", sans-serif;
  margin-top: 60px;
`;

//----------------------------------------------------

//Global Props
interface IProps {}
interface IPropsGlobal {
  users: IUser[];
}

const UserProfile: React.FC<
  RouteComponentProps & IProps & IPropsGlobal
> = props => {
  //Function Component
  const token: any = localStorage.getItem("token"); //Token - Get the token stored from local storage
  const decoded: any = jwt.decode(token); //Decode token to get the current user
  const currentUser = props.users.find(u => u.UserId === decoded.UserId);

  if (!currentUser) {
    //Avoid that 'user' will be undefined
    return null;
  }

  return (
    <Wrapper className="container w-50">
      <div className="row">
        <div className="col h3 text-light text-center mb-4">
          <span>
            Perfil: <b className="ml-2 text-warning">{currentUser.username}</b>
          </span>
        </div>
      </div>
      <div className="row border border-light rounded">
        <div className="col">
          <div className="row bg-dark text-light">
            <div className="col-2 text-center align-self-center pt-4 pb-4">
              <img src={currentUser.avatar} width="110" alt="" />
            </div>
            <div className="col align-self-center h3">
              {currentUser.name} <br />{" "}
              {currentUser.surname ? currentUser.surname : null}
            </div>
            <div className="col text-center align-self-center">
              <img
                src="/images/other/hand.png"
                width="40"
                alt=""
                title="Ligas creadas"
              />
              <span className="h4 ml-2">5</span> {currentUser.NTournaments}
            </div>
          </div>
          <div className="row bg-secondary">
            <div className="col">
              <div className="row text-light pt-3 pb-1">
                <div className="col-4 text-right">
                  <img
                    src="/images/other/mail.png"
                    width="30"
                    alt=""
                    title="Email"
                  />
                </div>
                <div className="col">{currentUser.email}</div>
              </div>
              <div className="row text-light pt-2 pb-2">
                <div className="col-4 text-right">
                  <img
                    src="/images/other/profile.png"
                    width="30"
                    alt=""
                    title="Nombre de usuario"
                  />
                </div>
                <div className="col">{currentUser.username}</div>
              </div>
              <div className="row text-light pt-1 pb-3">
                <div className="col-4 text-right">
                  <img
                    src="/images/other/date.png"
                    width="30"
                    alt=""
                    title="Fecha de registro"
                  />
                </div>
                <div className="col">{currentUser.createdate}</div>
              </div>
            </div>
            <div className="col align-self-center text-light text-center">
              <button
                className="btn btn-outline-light text-uppercase"
                onClick={() => props.history.push("/management/user/edit")}
              >
                Editar Perfil{" "}
                <img
                  src="/images/other/edit2.png"
                  className="ml-2 mb-1"
                  width="18"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  users: state.users
});

export default connect(mapStateToProps)(UserProfile);

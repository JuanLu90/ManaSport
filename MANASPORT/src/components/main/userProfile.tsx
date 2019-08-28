//React´s Components
import React from "react";
import { Link } from "react-router-dom";
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
`

//----------------------------------------------------



//Global Props
interface IProps { }
interface IPropsGlobal {
  users: IUser[];
}

const UserProfile: React.FC<IProps & IPropsGlobal> = props => { //Function Component
  const token: any = localStorage.getItem("token"); //Token - Get the token stored from local storage
  const decoded: any = jwt.decode(token); //Decode token to get the current user
  const currentUser = props.users.find(u => u.UserId === decoded.UserId);

  if (!currentUser) { //Avoid that 'user' will be undefined
    return null;
  }

  return (
    <Wrapper className="container w-50">
      <div className="row">
        <div className="col text-light mb-4">
          <span className="h2">
            Perfil
          </span>
        </div>
      </div>
      <div className="row bg-dark text-light rounded">
        <div className="col-2 text-center align-self-center pt-4 pb-4">
          <img src={currentUser.avatar} width="110" alt="" />
        </div>
        <div className="col align-self-center h3">
          {currentUser.name}  <br /> {currentUser.surname ? currentUser.surname : null}
        </div>
        <div className="col text-center align-self-center">
          <span>Ligas creadas: </span>
          {currentUser.NTournaments}
        </div>
      </div>
      <div className="row bg-secondary rounded">
        <div className="col">
          <div className="row text-light p-3">
            <div className="col-4 text-right">
              <img src="/images/other/mail.png" width="30" alt="" title="Email" />
            </div>
            <div className="col">
              {currentUser.email}
            </div>
          </div>
          <div className="row text-light p-3">
            <div className="col-4 text-right">
              <img src="/images/other/profile.png" width="30" alt="" title="Nombre de usuario" />
            </div>
            <div className="col">
              {currentUser.username}
            </div>
          </div>
          <div className="row text-light p-3">
            <div className="col-4 text-right">
              <img src="/images/other/date.png" width="30" alt="" title="Fecha de registro" />
            </div>
            <div className="col">
              {currentUser.createdate}
            </div>
          </div>
        </div>
        <div className="col align-self-center text-light text-center">
          EDITAR PERFIL
          <Link to={"/management/user/edit"}>
            <img src="/images/other/edit.png" width="20" alt="" />
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  users: state.users
});

export default connect(mapStateToProps)(UserProfile);

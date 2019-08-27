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
const FontSpan = styled.span`
      font-family: 'Anton', sans-serif;
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
    <div className="container w-75">
      <div className="row">
        <div className="col text-light mb-4">
          <FontSpan className="h2">
            Perfil
            <Link to={"/management/user/edit"}>
              <img src="/images/other/edit.png" width="20" alt="" />
            </Link>
          </FontSpan>
        </div>
      </div>
      <div className="row bg-dark text-light ">
        <div className="col-2 text-center align-self-center pt-4 pb-4">
          <img src={currentUser.avatar} width="110" alt="" />
        </div>
        <div className="col align-self-center h3">
        {currentUser.name} {currentUser.surname} <br/>  {currentUser.username}
        </div>
      </div>
      <div className="row bg-secondary text-light">
        <div className="col border-left border-dark">
          <div className="row text-center m-3">
          </div>
          <div className="row m-4">
            <div className="col-3 text-right">
              <FontSpan className="fontstyle-editUserProfile">Email:</FontSpan>
            </div>
            <div className="col">{currentUser.email}</div>
          </div>
          <div className="row m-4">
            <div className="col-3 text-right">
              <FontSpan className="fontstyle-editUserProfile">
                Fecha de nacimiento:
                </FontSpan>
            </div>
            <div className="col">{currentUser.birthDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  users: state.users
});

export default connect(mapStateToProps)(UserProfile);

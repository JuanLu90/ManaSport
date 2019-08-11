import React from "react";
import jwt from "jsonwebtoken";
import { IUser } from "../../../../interfaces";
import { connect } from "react-redux";
import { IGlobalState } from "../../../../reducers/reducers";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface IProps { }

interface IPropsGlobal {
  users: IUser[];
}

const UserProfile: React.FC<IProps & IPropsGlobal> = props => {
  const token: any = localStorage.getItem("token");
  const decoded: any = jwt.decode(token);
  const currentUser = props.users.find(u => u.UserId === decoded.UserId);

  //Evita que 'user' sea undefined
  if (!currentUser) {
    return null;
  }





  //******** STYLES *********
  const Wrapper = styled.div`
      box-shadow: 2px 2px 2px 2px #888888;
      background: #ffffff;
  `
  const FontSpan = styled.span`
      font-family: 'Anton', sans-serif;
  `
  const BorderRight = styled.span`
      border-color: #c4c3c3 !important;
  `

    // const Wrapper = styled('div')({
    //   background: '#ffffff',
    //   height: '120vh !important'
    // });

  //*************************

  return (
    <>
      <Wrapper className="container w-75 border border-light">
        <div className="row ">
          <BorderRight className="col text-dark border-right border-dark">
            <div className="row text-center m-3">
              <div className="col mb-4">
                <FontSpan className="h2">
                  Perfil
                  <Link to={"/management/user/edit"}>
                    <img src="/images/other/edit.png" width="20" alt="" />{" "}
                  </Link>
                </FontSpan>
              </div>
            </div>
            <div className="row m-4">
              <div className="col-3 text-right">
                <FontSpan className="fontstyle-editUserProfile">
                  Nombre de usuario:
                </FontSpan>
              </div>
              <div className="col">{currentUser.username}</div>
            </div>
            <div className="row m-4">
              <div className="col-3 text-right">
                <FontSpan className="fontstyle-editUserProfile">Nombre:</FontSpan>
              </div>
              <div className="col">{currentUser.name}</div>
            </div>
            <div className="row m-4">
              <div className="col-3 text-right">
                <FontSpan className="fontstyle-editUserProfile">Apellidos:</FontSpan>
              </div>
              <div className="col">{currentUser.surname}</div>
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
          </BorderRight>
          <div className="col-3 text-center align-self-center">
            <div className="row">
              <div className="col">
                <img src={currentUser.avatar} width="110" alt="" />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <div className="container">
        <div className="row justify-content-center">
          <button className="m-2">Enviar</button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  users: state.users
});

export default connect(mapStateToProps)(UserProfile);

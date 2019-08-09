import React from "react";
import jwt from "jsonwebtoken";
import { IUser } from "../../../../interfaces";
import { connect } from "react-redux";
import { IGlobalState } from "../../../../reducers/reducers";
import { createBrowserHistory } from "history";
import { Link } from "react-router-dom";

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

  const history = createBrowserHistory({ forceRefresh: true });

  return (
    <div className="col-10 main-userprofile h-100 text-light">
      <div className="container w-75 bg-editUserProfile border border-light">
        <div className="row ">
          <div className="col text-dark border-right border-dark">
            <div className="row text-center m-3">
              <div className="col mb-4">
                <span className="h2">
                  Perfil
                  <Link to={"/management/user/edit"}>
                    <img src="/images/other/edit.png" width="20" alt="" />{" "}
                  </Link>
                </span>
              </div>
            </div>
            <div className="row m-4">
              <div className="col-3 text-right">
                <span className="fontstyle-editUserProfile">
                  Nombre de usuario:
                </span>
              </div>
              <div className="col">{currentUser.username}</div>
            </div>
            <div className="row m-4">
              <div className="col-3 text-right">
                <span className="fontstyle-editUserProfile">Nombre:</span>
              </div>
              <div className="col">{currentUser.name}</div>
            </div>
            <div className="row m-4">
              <div className="col-3 text-right">
                <span className="fontstyle-editUserProfile">Apellidos:</span>
              </div>
              <div className="col">{currentUser.surname}</div>
            </div>
            <div className="row m-4">
              <div className="col-3 text-right">
                <span className="fontstyle-editUserProfile">Email:</span>
              </div>
              <div className="col">{currentUser.email}</div>
            </div>
            <div className="row m-4">
              <div className="col-3 text-right">
                <span className="fontstyle-editUserProfile">
                  Fecha de nacimiento:
                </span>
              </div>
              <div className="col">{currentUser.birthDate}</div>
            </div>
          </div>
          <div className="col-3 text-center align-self-center">
            <div className="row">
              <div className="col">
                <img src={currentUser.avatar} width="110" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <button className="m-2">Enviar</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  users: state.users
});

export default connect(mapStateToProps)(UserProfile);

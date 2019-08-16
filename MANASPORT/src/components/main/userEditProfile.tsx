//React´s Components
import React, { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import { Link, RouteComponentProps } from "react-router-dom";
//React Bootstrap
import DatePicker from "react-datepicker";
import { Modal } from "react-bootstrap";
//Interfaces
import { IUser } from "../../interfaces";
//Components made by Juanlu
import EditAvatarModal from "./editAvatarModal";
//Redux
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import * as action from "../../action";
//JsonWebToken
import jwt from "jsonwebtoken";
//Styled Components - CSSINJS
import styled from "styled-components";
//CSS
import "react-datepicker/dist/react-datepicker.css";



//----------------------------------------------------



//Global Props
interface IProps { }
interface IPropsGlobal {
  token: string;
  users: IUser[];
  putUserById: (UserId: string, user: IUser) => void;
}

const EditUserProfile: React.FC<RouteComponentProps & IProps & IPropsGlobal> = props => { //Function Component
  //Hooks to edit user
  const [inputName, setInputName] = React.useState("");
  const [inputSurname, setInputSurname] = React.useState("");
  const [inputEmail, setInputEmail] = React.useState("");
  // const [inputBirthDate, setInputBirthDate] = React.useState(new Date());
  const [inputAvatar, setInputAvatar] = React.useState("");

  //Onchanges for inputs
  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.currentTarget.value);
  };
  const updateSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSurname(event.currentTarget.value);
  };
  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.currentTarget.value);
  };

  // const updateBirthDate = (date: any) => {
  //   setInputBirthDate(date);
  //   console.log("date " + date)
  //   console.log("inputBirthDate " + inputBirthDate)
  // };

  // const updateBirthDate = (date: any) => {
  //   if (date !== null) {
  //     const dateDay = date.getDay();
  //     const dateMonth = date.getMonth();
  //     const dateYear = date.getFullYear();
  //     const fullyear = dateDay + "/" + dateMonth + "/" + dateYear;
  //     date = fullyear;
  //     setInputBirthDate(date);
  //     console.log(date)
  //   }
  // };

  const updateAvatar = (event: any) => {
    setInputAvatar(event.currentTarget.value);
  };

  const token: any = localStorage.getItem("token"); // Get the token stored from local storage to get the UserId
  const decoded: any = jwt.decode(token);
  const currentUser = props.users.find(u => u.UserId === decoded.UserId);
  const history = createBrowserHistory({ forceRefresh: true });


  const [showEditAvatar, setEditAvatar] = useState(false); //Hook for edit avatar modal
  const handleCloseEditAvatar = () => setEditAvatar(false);
  const handleShowEditAvatar = () => setEditAvatar(true);

  useEffect(() => { //Update inputs with information about current user
    if (currentUser) {
      setInputEmail(currentUser.email);
      setInputName(currentUser.name);
      setInputSurname(currentUser.surname);
      // updateBirthDate(currentUser.birthDate);
      setInputAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  //Avoid that 'user' will be undefined
  if (!currentUser) {
    return null;
  }

  const editCurrentUserById = () => { //Function Component
    fetch("http://localhost:8080/api/users/edit/" + currentUser.UserId, { //Fetch current user updated to redux
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
        // Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({ //New info about user
        UserId: currentUser.UserId,
        username: currentUser.username,
        name: inputName,
        surname: inputSurname,
        email: inputEmail,
        avatar: currentUser.avatar
        // birthDate: inputBirthDate
      })
    })
      .then(response => {
        if (response.ok) {
          const u: any = {
            UserId: currentUser.UserId,
            username: currentUser.username,
            name: currentUser.name,
            surname: currentUser.surname,
            email: currentUser.email,
            avatar: currentUser.avatar
            // birthDate: inputBirthDate
          };
          response.json().then(u => {
            props.putUserById(currentUser.UserId, u);
            history.push("/management/user/");
          });
        }
      })
      .catch(err => {
        console.log("Error, " + err);
      });
  };

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
  //*************************
  return (
    <>
      <Wrapper className="container w-75 bg-editUserProfile border border-light">
        <div className="row ">
          <BorderRight className="col text-dark border-right border-dark">
            <div className="row text-center m-3">
              <Link to={"/management/user/"}>
                Volver
                </Link>
              <div className="col mb-4">
                <FontSpan className="h2"> Perfil</FontSpan>
              </div>
            </div>
            <div className="row m-4">
              <div className="col-3 text-right">
                <FontSpan className="fontstyle-editUserProfile">
                  Nombre de usuario:
                </FontSpan>
              </div>
              <div className="col">
                {currentUser.username}
              </div>
            </div>
            <div className="row m-4">
              <div className="col-3 text-right">
                <FontSpan className="fontstyle-editUserProfile">Nombre:</FontSpan>
              </div>
              <div className="col">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  value={inputName}
                  onChange={updateName}
                />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-3 text-right">
                <FontSpan className="fontstyle-editUserProfile">Apellidos:</FontSpan>
              </div>
              <div className="col">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  value={inputSurname}
                  onChange={updateSurname}
                />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-3 text-right">
                <FontSpan className="fontstyle-editUserProfile">Email:</FontSpan>
              </div>
              <div className="col">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  value={inputEmail}
                  onChange={updateEmail}
                />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-3 text-right">
                <FontSpan className="fontstyle-editUserProfile">
                  Fecha de nacimiento:
                </FontSpan>
              </div>
              {/* <div className="col">
                <DatePicker
                  selected={inputBirthDate}
                  onSelect={setInputBirthDate}
                  onChange={updateBirthDate}
                  className="form-control form-control-sm"
                />
              </div> */}
            </div>
          </BorderRight>
          <div className="col-3 text-center align-self-center">
            <div className="row">
              <div className="col">
                <img
                  src={inputAvatar}
                  width="110"
                  alt=""
                  onChange={updateAvatar}
                />
              </div>
            </div>
            <div className="row text-dark mt-4">
              <div className="col"> <button onClick={handleShowEditAvatar}>Actualizar avatar</button> </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <button className="m-2" onClick={() => props.history.push("/management/user")}>
              Volver
          </button>
          </div>
          <div className="col">
            <button className="m-2" onClick={editCurrentUserById}>
              Enviar
          </button>
          </div>
        </div>
      </div>
      <Modal size="lg" show={showEditAvatar} onHide={() => null}>
        <EditAvatarModal handleCloseEditAvatar={handleCloseEditAvatar} />
      </Modal>
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({ //Send props to redux
  token: state.token,
  users: state.users,
  putUserById: action.putUserById
});

export default connect(mapStateToProps)(EditUserProfile);

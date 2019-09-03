//React´s Components
import React, { useEffect, useState, useLayoutEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
//React Bootstrap
import { Modal, Card } from "react-bootstrap";
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

const Span = styled.span`
  font-size: 0.9em;
`;

//----------------------------------------------------

//Global Props
interface IProps {}
interface IPropsGlobal {
  token: string;
  users: IUser[];
  putUserById: (UserId: string, user: IUser) => void;
}

const EditUserProfile: React.FC<
  RouteComponentProps & IProps & IPropsGlobal
> = props => {
  //Function Component

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

  const updateAvatar = (event: any) => {
    setInputAvatar(event.currentTarget.value);
  };

  useLayoutEffect(() => {
    const a: any = document.getElementById("inputUserEditProfile2");
    a && a.focus();
  }, [inputSurname]);

  useLayoutEffect(() => {
    const a: any = document.getElementById("inputUserEditProfile1");
    a && a.focus();
  }, [inputName]);

  const token: any = localStorage.getItem("token"); // Get the token stored from local storage to get the UserId
  const decoded: any = jwt.decode(token);
  const currentUser = props.users.find(u => u.UserId === decoded.UserId);

  const [showEditAvatar, setEditAvatar] = useState(false); //Hook for edit avatar modal
  const handleCloseEditAvatar = () => setEditAvatar(false);
  const handleShowEditAvatar = () => setEditAvatar(true);

  useEffect(() => {
    //Update inputs with information about current user
    if (currentUser) {
      setInputEmail(currentUser.email);
      setInputName(currentUser.name);
      setInputSurname(currentUser.surname);
      setInputAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  //Avoid that 'user' will be undefined
  if (!currentUser) {
    return null;
  }

  const editCurrentUserById = () => {
    //Function Component
    fetch("http://localhost:8080/api/users/edit/" + currentUser.UserId, {
      //Fetch current user updated to redux
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
        // Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        //New info about user
        UserId: currentUser.UserId,
        username: currentUser.username,
        name: inputName,
        surname: inputSurname,
        email: inputEmail,
        avatar: currentUser.avatar
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
          };
          response.json().then(u => {
            props.putUserById(currentUser.UserId, u);
            props.history.push("/management/user/");
          });
        }
      })
      .catch(err => {
        console.log("Error, " + err);
      });
  };

  //******** STYLES *********

  const Wrapper = styled.div`
    font-family: "Source Sans Pro", sans-serif;
    margin-top: 60px;
  `;
  //*************************
  return (
    <>
      <Wrapper className="container w-25">
        <div className="row">
          <div className="col h3 text-light mb-3">
            <span>
              Editando perfil:
              <b className="ml-2 text-warning"> {currentUser.username}</b>
            </span>
          </div>
        </div>
        <Card border="light" bg="secondary">
          <img
            src={currentUser.avatar}
            width="110"
            alt=""
            className="align-self-center mt-3"
          />
          <br />
          <button
            className="btn btn-outline-light pt-0 pb-0 pl-3 pr-3 align-self-center"
            onClick={handleShowEditAvatar}
          >
            Actualizar avatar
          </button>
          <Card.Body>
            <Card.Text>
              <Span className="text-light">Nombre:</Span>
              <p>
                <input
                  id="inputUserEditProfile1"
                  className="form-control form-control-sm"
                  type="text"
                  value={inputName}
                  onChange={updateName}
                />
              </p>
            </Card.Text>
            <Card.Text>
              <Span className="text-light">Apellidos:</Span>
              <p>
                <input
                  id="inputUserEditProfile2"
                  className="form-control form-control-sm"
                  type="text"
                  value={inputSurname}
                  onChange={updateSurname}
                />
              </p>
            </Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-around">
            <button
              className="btn btn-light m-2 pt-1 pb-1 pl-3 pr-3 font-weight-bold"
              onClick={() => props.history.push("/management/user/")}
            >
              Volver
            </button>
            <button
              className="btn btn-warning m-2 pt-1 pb-1 pl-3 pr-3 font-weight-bold"
              onClick={editCurrentUserById}
            >
              Enviar
            </button>
          </Card.Footer>
        </Card>
      </Wrapper>
      <Modal size="lg" show={showEditAvatar} onHide={() => null}>
        <EditAvatarModal handleCloseEditAvatar={handleCloseEditAvatar} />
      </Modal>
    </>
  );
};
const mapStateToProps = (state: IGlobalState) => ({
  //Send props to redux
  token: state.token,
  users: state.users
});

const mapDispatchToProps = {
  putUserById: action.putUserById
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUserProfile);

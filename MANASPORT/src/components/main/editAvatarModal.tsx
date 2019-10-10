//React´s Components
import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
//Redux
import { connect } from "react-redux";
import * as action from "../../action";
import { IGlobalState } from "../../reducers/reducers";
//Interfaces
import { ITournament, IUser } from "../../interfaces";
//Json Web Token
import jwt from "jsonwebtoken";
//Styled Components
import styled from "styled-components";
//Jquery
import $ from 'jquery';


//******** STYLES - STYLED-COMPONENTS - CCSSINJS *********
const Wrapper = styled.div`
  height: 80vh;
`;
const ImgCursorPointer = styled.img`
cursor: pointer;
width: 60px;
`;
//----------------------------------------------------


//Props & Global Props
interface IProps {
  leagues: ITournament[];
  handleCloseEditAvatar: () => void;
  putLeagueById: (LeagueId: number, league: ITournament) => void;
  DeleteLeagueId: number;
  users: IUser[];
  putUserById: (UserId: string, user: IUser) => void;
}
interface IPropsGLobal { }


const EditAvatarModal: React.FC<IProps & IPropsGLobal> = props => { //Function Component
  const history = createBrowserHistory({ forceRefresh: true });

  //Hook to get the current Avatar and update it
  const [inputAvatar, setInputAvatar] = React.useState("");
  const updateAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputAvatar(event.currentTarget.value);
  };


  //Get the avatar selected and set it a css style
  $('.position-image img').click(function () {
    let alt = $(this).attr("alt");
    let currentImg = $(this);
    let othersImgs = $("img");

    //Loop to walk through avatars image
    for (let i = 1; i < 16; i++) {
      switch (alt) {
        case `${i}`:
          currentImg.css({ "box-shadow": " 0 0 10pt 4pt #ffc107", "border-radius": "40px" });
          othersImgs.not($(this)).css("box-shadow", "none");
          break;
        default:
          console.log("petaso");
      }
    }
  })

  //Show the image selected and set it in hook
  const ProfileImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
    return <div className="col-2 pl-4 pr-4 pt-3 pb-3">
      <ImgCursorPointer
        src={`/images/profile/img-profile-${i}.png`}
        onClick={() => setInputAvatar(`/images/profile/img-profile-${i}.png`)}
        alt={i.toString()}
        key={i}
      />
    </div>
  })

  const token: any = localStorage.getItem("token"); //Get token from localstorage
  const decoded: any = jwt.decode(token); //Decode the token to get the info
  const currentUser = props.users.find(u => u.UserId === decoded.UserId); //Select the current user 

  //When user changes, avatar is updated
  useEffect(() => {
    if (currentUser) {
      setInputAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  //Avoid 'user' will be undefined
  if (!currentUser) {
    return null;
  }

  //Fetch to update the user with new info
  const editAvatar = () => {
    fetch("http://localhost:8080/api/users/edit/" + currentUser.UserId, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
        // Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        UserId: currentUser.UserId,
        username: currentUser.username,
        name: currentUser.name,
        surname: currentUser.surname,
        email: currentUser.email,
        avatar: inputAvatar
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
            avatar: inputAvatar
          };
          response.json().then(u => {
            props.putUserById(currentUser.UserId, u);
            history.push("/management/user");
          });
        }
      })
      .catch(err => {
        console.log("Error, " + err);
      });
  };

  return ( //Modal
    <Wrapper className="modal-dialog-centered" role="document">
      <div className="modal-content bg-dark border border-secondary text-dark">
        <div className="modal-header">
          <h5 className="modal-title text-light" id="exampleModalCenterTitle">
            Elige tu avatar:
          </h5>
          <button
            type="button"
            className="close"
            onClick={props.handleCloseEditAvatar}
          >
            <span className="text-light" aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col">
              <input
                type="text"
                value={inputAvatar}
                onChange={updateAvatar}
                className="w-50"
                id="position"
                hidden
              />
            </div>
          </div>
          <div className="row justify-content-center m-4 position-image">
            {ProfileImages}
          </div>
        </div>
        <div className="modal-footer">
          <div className="col text-right">
            <button className="btn btn-light font-weight-bold" onClick={props.handleCloseEditAvatar}>Cancelar</button>
          </div>
          <div className="col">
            <button className="btn btn-warning font-weight-bold" onClick={editAvatar}>Aceptar</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  leagues: state.leagues,
  deleteLeagueById: action.deleteLeagueById,
  DeleteLeagueId: state.TournamentId,
  putLeagueById: action.putLeagueById,
  users: state.users,
  putUserById: action.putUserById
});

export default connect(mapStateToProps)(EditAvatarModal);

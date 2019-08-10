import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as action from "../../../../../../action";
import { IGlobalState } from "../../../../../../reducers/reducers";
import { ITournament, IUser } from "../../../../../../interfaces";
import { createBrowserHistory } from "history";
import jwt from "jsonwebtoken";
import "./editAvatarModal.css"

interface IProps {
  leagues: ITournament[];
  handleCloseEditAvatar: () => void;
  putLeagueById: (LeagueId: number, league: ITournament) => void;
  DeleteLeagueId: number;
  users: IUser[];
  putUserById: (UserId: string, user: IUser) => void;
}

interface IPropsGLobal {
  // EditLeagueId: number;
  // editLeagueById: (LeagueId: number) => void;
}

const EditAvatarModal: React.FC<IProps & IPropsGLobal> = props => {
  const history = createBrowserHistory({ forceRefresh: true });

  const [inputAvatar, setInputAvatar] = React.useState("");

  const updateAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputAvatar(event.currentTarget.value);
  };

  const token: any = localStorage.getItem("token");
  const decoded: any = jwt.decode(token);
  const currentUser = props.users.find(u => u.UserId === decoded.UserId);

  useEffect(() => {
    if (currentUser) {
      setInputAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  //Evita que 'user' sea undefined
  if (!currentUser) {
    return null;
  }

  const editAvatar = () => {
    fetch(
      "http://localhost:8080/api/users/edit/" + currentUser.UserId, {
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
      }
    )
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

  return (
    <div className="modal-dialog-centered" role="document">
      <div className="modal-content bg-light text-dark">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalCenterTitle">
            Elige tu avatar:
          </h5>
          <button
            type="button"
            className="close"
            onClick={props.handleCloseEditAvatar}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body modal-editavatar-img">
          <div className="row">
            <div className="col">
              <input type="text" value={inputAvatar} onChange={updateAvatar} className="w-50" hidden />
            </div>
          </div>
          <div className="row text-center m-4">
            <div className="col">
              <img src="/images/profile/img-profile-1.png" onClick={() => setInputAvatar('/images/profile/img-profile-1.png')} width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-2.png" onClick={() => setInputAvatar('/images/profile/img-profile-2.png')} width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-3.png" onClick={() => setInputAvatar('/images/profile/img-profile-3.png')} width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-4.png" onClick={() => setInputAvatar('/images/profile/img-profile-4.png')} width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-5.png" onClick={() => setInputAvatar('/images/profile/img-profile-5.png')} width="60" alt="" />
            </div>
          </div>
          <div className="row text-center m-4">
            <div className="col">
              <img src="/images/profile/img-profile-6.png"  onClick={() => setInputAvatar('/images/profile/img-profile-6.png')} width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-7.png"  onClick={() => setInputAvatar('/images/profile/img-profile-7.png')} width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-8.png"  onClick={() => setInputAvatar('/images/profile/img-profile-8.png')} width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-9.png"  onClick={() => setInputAvatar('/images/profile/img-profile-9.png')} width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-10.png"  onClick={() => setInputAvatar('/images/profile/img-profile-10.png')} width="60" alt="" />
            </div>
          </div>
          <div className="row text-center m-4">
            <div className="col">
              <img src="/images/profile/img-profile-11.png"  onClick={() => setInputAvatar('/images/profile/img-profile-11.png')} width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-12.png"  onClick={() => setInputAvatar('/images/profile/img-profile-12.png')} width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-13.png"  onClick={() => setInputAvatar('/images/profile/img-profile-13.png')} width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-14.png"  onClick={() => setInputAvatar('/images/profile/img-profile-14.png')} width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-15.png"  onClick={() => setInputAvatar('/images/profile/img-profile-15.png')} width="60" alt="" />
            </div>
          </div>
        </div>
        <div className="modal-footer no-border">
          <div className="col text-right">
            <button onClick={props.handleCloseEditAvatar}>Cancelar</button>
          </div>
          <div className="col">
            <button onClick={editAvatar}>Aceptar</button>
          </div>
        </div>
      </div>
    </div>
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

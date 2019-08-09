import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as action from "../../../../../../action";
import { IGlobalState } from "../../../../../../reducers/reducers";
import { ITournament } from "../../../../../../interfaces";
import { createBrowserHistory } from "history";

interface IProps {
  leagues: ITournament[];
  handleCloseEditAvatar: () => void;
  putLeagueById: (LeagueId: number, league: ITournament) => void;
  DeleteLeagueId: number;
}

interface IPropsGLobal {
  // EditLeagueId: number;
  // editLeagueById: (LeagueId: number) => void;
}

const EditLeagueModal: React.FC<IProps & IPropsGLobal> = props => {
  const history = createBrowserHistory({ forceRefresh: true });

  const [inputLeagueName, setInputLeagueName] = React.useState("");
  const [inputLeagueSport, setInputLeagueSport] = React.useState("Futbol");
  const [inputLeagueCategory, setInputLeagueCategory] = React.useState(
    "Futbol 11"
  );

  const updateLeagueName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLeagueName(event.currentTarget.value);
  };
  const updateLeagueCategory = (event: any) => {
    setInputLeagueCategory(event.currentTarget.value);
  };

  const currentLeague = props.leagues.find(
    u => u.TournamentId === props.DeleteLeagueId
  );

  useEffect(() => {
    if (currentLeague) {
      setInputLeagueName(currentLeague.name);
      setInputLeagueCategory(currentLeague.category);
    }
  }, [currentLeague]);

  const editCurrentLeague = () => {
    //Evita que 'league' sea undefined
    if (!currentLeague) {
      return null;
    }
    fetch(
      "http://localhost:8080/api/tournaments/editTournament/" +
      currentLeague.TournamentId,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
          // Authorization: "Bearer " + props.token
        },
        body: JSON.stringify({
          TournamentId: currentLeague.TournamentId,
          sport: inputLeagueSport,
          name: inputLeagueName,
          category: inputLeagueCategory
        })
      }
    )
      .then(response => {
        if (response.ok) {
          const u: any = {
            TournamentId: currentLeague.TournamentId,
            sport: inputLeagueSport,
            name: inputLeagueName,
            category: inputLeagueCategory
          };
          response.json().then(u => {
            props.putLeagueById(currentLeague.TournamentId, u);
            history.push("/management");
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
        <div className="modal-body">
          <div className="row text-center m-4">
            <div className="col">
              <img src="/images/profile/img-profile-1.png" width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-2.png" width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-3.png" width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-4.png" width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-5.png" width="60" alt="" />
            </div>
          </div>
          <div className="row text-center m-4">
            <div className="col">
              <img src="/images/profile/img-profile-5.png" width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-6.png" width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-7.png" width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-8.png" width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-9.png" width="60" alt="" />
            </div>
          </div>
          <div className="row text-center m-4">
            <div className="col">
              <img src="/images/profile/img-profile-10.png" width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-11.png" width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-12.png" width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-13.png" width="60" alt="" />
            </div>
            <div className="col">
              <img src="/images/profile/img-profile-14.png" width="60" alt="" />
            </div>
          </div>
        </div>
        <div className="modal-footer no-border">
          <div className="col text-right">
            <button onClick={props.handleCloseEditAvatar}>Cancelar</button>
          </div>
          <div className="col">
            <button onClick={editCurrentLeague}>Enviar</button>
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
  putLeagueById: action.putLeagueById
});

export default connect(mapStateToProps)(EditLeagueModal);

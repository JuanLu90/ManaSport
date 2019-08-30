import React, { useEffect } from "react";
import { ITournament, ITeam, IPlayer } from "../../interfaces";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import * as action from "../../action";
import styled from "styled-components";


const Wrapper = styled.div`
  font-family: "Source Sans Pro", sans-serif;
  z-index: 9999;
`
const Wrapper2 = styled.div`
  background-color: #2B2F38;
`

interface IProps {
  leagues: ITournament[];
  teamPlayers: IPlayer[];
  handleCloseEditPlayer: () => void;
  putPlayerById: (PlayerId: number, player: IPlayer) => void;
  toggleSetTeamPlayers: () => void;
}

interface IPropsGlobal {
  DeleteLeagueId: number;
}

const EditPlayerModal: React.FC<IProps & IPropsGlobal> = props => {
  const history = createBrowserHistory({ forceRefresh: true });
  const path: any = history.location.pathname;
  let pathTournamentId = path.split(["/"]).slice(-1)[0]; //Get the TournamentID from the path

  const [inputPlayerName, setInputPlayerName] = React.useState("");
  const [inputPlayerSurname, setInputPlayerSurname] = React.useState("");
  const [inputPlayerAge, setInputPlayerAge] = React.useState(0);
  const [inputPlayerPosition, setInputPlayerPosition] = React.useState("");
  const [inputPlayerGoals, setInputPlayerGoals] = React.useState(0);

  const updatePlayerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPlayerName(event.currentTarget.value);
  };
  const updatePlayerSurname = (event: any) => {
    setInputPlayerSurname(event.currentTarget.value);
  };
  const updatePlayerAge = (event: any) => {
    setInputPlayerAge(event.currentTarget.value);
  };
  const updatePlayerPosition = (event: any) => {
    setInputPlayerPosition(event.currentTarget.value);
  };
  const updatePlayerGoals = (event: any) => {
    setInputPlayerGoals(event.currentTarget.value);
  };

  const currentPlayer = props.teamPlayers.find(
    u => u.PlayerId === props.DeleteLeagueId
  );

  useEffect(() => {
    if (currentPlayer) {
      setInputPlayerName(currentPlayer.name);
      setInputPlayerSurname(currentPlayer.surname);
      setInputPlayerAge(currentPlayer.age);
      setInputPlayerPosition(currentPlayer.position);
      setInputPlayerGoals(currentPlayer.goals);
    }
  }, [currentPlayer]);

  if (!currentPlayer) {
    return null;
  }

  const editCurrentPlayer = () => {
    //Evita que 'league' sea undefined
    if (!currentPlayer) {
      return null;
    }
    fetch("http://localhost:8080/api/players/editPlayer/" + currentPlayer.PlayerId, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
        // Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        PlayerId: currentPlayer.PlayerId,
        name: inputPlayerName,
        surname: inputPlayerSurname,
        age: inputPlayerAge,
        position: inputPlayerPosition,
        goals: inputPlayerGoals
      })
    })
      .then(response => {
        if (response.ok) {
          const u: any = {
            PlayerId: currentPlayer.PlayerId,
            name: inputPlayerName,
            surname: inputPlayerSurname,
            age: inputPlayerAge,
            position: inputPlayerPosition,
            goals: inputPlayerGoals
          };
          response.json().then(u => {
            props.putPlayerById(currentPlayer.PlayerId, u);
            props.handleCloseEditPlayer();
            props.toggleSetTeamPlayers();

          });
        }
      })
      .catch(err => {
        console.log("Error, " + err);
      });
  };

  return (
    <Wrapper className="modal-dialog-centered" role="document">
      <Wrapper2 className="modal-content text-light border border-secondary">
        <div className="modal-header bg-warning text-dark">
          <h5 className="modal-title" id="exampleModalCenterTitle">
            Está editando a: <b> {currentPlayer.name} </b>
          </h5>
          <button
            type="button"
            className="close"
            onClick={props.handleCloseEditPlayer}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col">
              Nombre del jugador
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control form-control-sm mt-0"
                value={inputPlayerName}
                onChange={updatePlayerName}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              Apellidos
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control form-control-sm mt-0"
                value={inputPlayerSurname}
                onChange={updatePlayerSurname}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              Edad
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control form-control-sm mt-0"
                value={inputPlayerAge}
                onChange={updatePlayerAge}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              Posición
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control form-control-sm mt-0"
                value={inputPlayerPosition}
                onChange={updatePlayerPosition}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              Goles
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control form-control-sm mt-0"
                value={inputPlayerGoals}
                onChange={updatePlayerGoals}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="col text-right">
            <button className="btn btn-light font-weight-bold" onClick={props.handleCloseEditPlayer}>Cancelar</button>
          </div>
          <div className="col">
            <button className="btn btn-warning font-weight-bold" onClick={editCurrentPlayer}>Guardar</button>
          </div>
        </div>
      </Wrapper2>
    </Wrapper>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  teamPlayers: state.teamPlayers,
  leagues: state.leagues,
  DeleteLeagueId: state.TournamentId,
  putPlayerById: action.putPlayerById
});

export default connect(mapStateToProps)(EditPlayerModal);

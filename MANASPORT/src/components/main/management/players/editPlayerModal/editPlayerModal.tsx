import React, { useEffect } from "react";
import { InputGroup } from "react-bootstrap";
import { ITournament, ITeam, IPlayer } from "../../../../../interfaces";
import { IGlobalState } from "../../../../../reducers/reducers";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import * as action from "../../../../../action";

interface IProps {
  leagues: ITournament[];
  teamPlayers: IPlayer[];
  handleCloseEditPlayer: () => void;
  putPlayerById: (PlayerId: number, player: IPlayer) => void;
}

interface IPropsGlobal {
  DeleteLeagueId: number;
}

const EditPlayerModal: React.FC<IProps & IPropsGlobal> = props => {
  const history = createBrowserHistory({ forceRefresh: true });

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
            // history.push(
            //   "/management/leagueDetails/" + currentPlayer.TournamentId
            // );
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
          <h5 className="modal-title" id="exampleModalCenterTitle" />
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
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Nombre del jugador*
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <input
                  type="text"
                  className="form-control form-control-sm mt-0"
                  value={inputPlayerName}
                  onChange={updatePlayerName}
                />
              </InputGroup>
            </div>
            <div className="col">
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Apellidos*
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <input
                  type="text"
                  className="form-control form-control-sm mt-0"
                  value={inputPlayerSurname}
                  onChange={updatePlayerSurname}
                />
              </InputGroup>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Edad*
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <input
                  type="text"
                  className="form-control form-control-sm mt-0"
                  value={inputPlayerAge}
                  onChange={updatePlayerAge}
                />
              </InputGroup>
            </div>
            <div className="col">
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Posición*
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <input
                  type="text"
                  className="form-control form-control-sm mt-0"
                  value={inputPlayerPosition}
                  onChange={updatePlayerPosition}
                />
              </InputGroup>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Goles*
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <input
                  type="text"
                  className="form-control form-control-sm mt-0"
                  value={inputPlayerGoals}
                  onChange={updatePlayerGoals}
                />
              </InputGroup>
            </div>
          </div>
        </div>
        <div className="modal-footer no-border">
          <div className="col text-right">
            <button onClick={props.handleCloseEditPlayer}>Cancelar</button>
          </div>
          <div className="col">
            <button onClick={editCurrentPlayer}>Enviar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  teamPlayers: state.teamPlayers,
  leagues: state.leagues,
  DeleteLeagueId: state.TournamentId,
  putPlayerById: action.putPlayerById
});

export default connect(mapStateToProps)(EditPlayerModal);

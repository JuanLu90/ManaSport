//React´s Components
import React, { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
//React Bootstrap
import { InputGroup } from "react-bootstrap";
//Redux
import { IGlobalState } from "../../reducers/reducers";
import * as action from "../../action";
import { connect } from "react-redux";
//Interfaces
import { ITournament, ITeam } from "../../interfaces";



//----------------------------------------------------



//Global Props
interface IProps {
  leagues: ITournament[];
  leagueTeams: ITeam[];
  handleCloseEditTeam: () => void;
  putTeamById: (TeamId: number, team: ITeam) => void;
}
interface IPropsGlobal {
  DeleteLeagueId: number;
}

const EditTeamModal: React.FC<IProps & IPropsGlobal> = props => {
  //Hooks update Team
  const [inputTeamName, setInputTeamName] = React.useState("");
  const [inputTeamLocality, setInputTeamLocality] = React.useState("");
  const [inputTeamCoach, setInputTeamCoach] = React.useState("");
  const [inputTeamCoach2, setInputTeamCoach2] = React.useState("");
  const [inputTeamEmail, setInputTeamEmail] = React.useState("");
  const [inputTeamPhone, setInputTeamPhone] = React.useState("");

  //Onchanges input teams
  const updateTeamName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTeamName(event.currentTarget.value);
  };
  const updateTeamLocality = (event: any) => {
    setInputTeamLocality(event.currentTarget.value);
  };
  const updateTeamCoach = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTeamCoach(event.currentTarget.value);
  };
  const updateTeamCoach2 = (event: any) => {
    setInputTeamCoach2(event.currentTarget.value);
  };
  const updateTeamEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTeamEmail(event.currentTarget.value);
  };
  const updateTeamPhone = (event: any) => {
    setInputTeamPhone(event.currentTarget.value);
  };

  // Hook to get fetch error
  const [fetchError, setFetchError] = useState("");

  const currentTeam = props.leagueTeams.find( //Avoid that 'team' will be undefined
    u => u.TeamId === props.DeleteLeagueId
  );

  const history = createBrowserHistory({ forceRefresh: true });
  const path: any = history.location.pathname;
  let pathTournamentId = path.split(["/"]).slice(-1)[0]; //Get the TournamentID from the path

  useEffect(() => { //Fetch current team every time it changes
    if (currentTeam) {
      setInputTeamName(currentTeam.name);
      setInputTeamLocality(currentTeam.locality);
      setInputTeamCoach(currentTeam.coach);
      setInputTeamCoach2(currentTeam.coach2);
      setInputTeamEmail(currentTeam.contactEmail);
      setInputTeamPhone(currentTeam.contactPhone);
    }
  }, [currentTeam]);

  const editCurrentTeam = () => {
    //Avoid that 'team' will be undefined
    if (!currentTeam) {
      return null;
    }
    fetch("http://localhost:8080/api/teams/editTeam/" + currentTeam.TeamId, { //Fetch the current team updated
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
        // Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        TeamId: currentTeam.TeamId,
        name: inputTeamName,
        locality: inputTeamLocality,
        coach: inputTeamCoach,
        coach2: inputTeamCoach2,
        contactEmail: inputTeamEmail,
        contactPhone: inputTeamPhone
      })
    })
      .then(response => {
        if (response.ok) {
          const u: any = {
            TeamId: currentTeam.TeamId,
            name: inputTeamName,
            locality: inputTeamLocality,
            coach: inputTeamCoach,
            coach2: inputTeamCoach2,
            contactEmail: inputTeamEmail,
            contactPhone: inputTeamPhone
          };
          response.json().then(u => {
            props.putTeamById(currentTeam.TeamId, u);
            history.push("/management/leagueDetails/" + pathTournamentId);
          });
        } else {
          response.json().then(({ e }) => {
            if (e === 1048) {
              setFetchError("El nombre del equipo no puede estar vacío");
            }
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
            onClick={props.handleCloseEditTeam}
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
                    Nombre del equipo*
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <input
                  type="text"
                  className="form-control form-control-sm mt-0"
                  value={inputTeamName}
                  onChange={updateTeamName}
                />
              </InputGroup>
            </div>
            <div className="col">
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Localidad*
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <input
                  type="text"
                  className="form-control form-control-sm mt-0"
                  value={inputTeamLocality}
                  onChange={updateTeamLocality}
                />
              </InputGroup>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Entrenador*
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <input
                  type="text"
                  className="form-control form-control-sm mt-0"
                  value={inputTeamCoach}
                  onChange={updateTeamCoach}
                />
              </InputGroup>
            </div>
            <div className="col">
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    2º Entrenador*
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <input
                  type="text"
                  className="form-control form-control-sm mt-0"
                  value={inputTeamCoach2}
                  onChange={updateTeamCoach2}
                />
              </InputGroup>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Email*
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <input
                  type="text"
                  className="form-control form-control-sm mt-0"
                  value={inputTeamEmail}
                  onChange={updateTeamEmail}
                />
              </InputGroup>
            </div>
            <div className="col">
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Teléfono*
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <input
                  type="text"
                  className="form-control form-control-sm mt-0"
                  value={inputTeamPhone}
                  onChange={updateTeamPhone}
                />
              </InputGroup>
            </div>
          </div>
        </div>
        <div className="modal-footer no-border">
          <div className="col text-right">
            <button onClick={props.handleCloseEditTeam}>Cancelar</button>
          </div>
          <div className="col">
            <button onClick={editCurrentTeam}>Enviar</button>
          </div>
          <div className="col">
            {fetchError && <div className="bg-danger">{fetchError}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({ //Send Props to redux
  leagueTeams: state.leagueTeams,
  leagues: state.leagues,
  DeleteLeagueId: state.TournamentId,
  putTeamById: action.putTeamById
});

export default connect(mapStateToProps)(EditTeamModal);

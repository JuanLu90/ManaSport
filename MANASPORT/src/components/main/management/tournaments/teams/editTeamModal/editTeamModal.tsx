import React, { useEffect } from "react";
import { InputGroup } from "react-bootstrap";
import { ITournament, ITeam } from "../../../../../../interfaces";
import { IGlobalState } from "../../../../../../reducers/reducers";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import * as action from "../../../../../../action";

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
  const history = createBrowserHistory({ forceRefresh: true });

  const [inputTeamName, setInputTeamName] = React.useState("");
  const [inputTeamLocality, setInputTeamLocality] = React.useState("");
  const [inputTeamCoach, setInputTeamCoach] = React.useState("");
  const [inputTeamCoach2, setInputTeamCoach2] = React.useState("");
  const [inputTeamEmail, setInputTeamEmail] = React.useState("");
  const [inputTeamPhone, setInputTeamPhone] = React.useState("");

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

  const currentTeam = props.leagueTeams.find(
    u => u.TeamId === props.DeleteLeagueId
  );

  useEffect(() => {
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
    //Evita que 'league' sea undefined
    if (!currentTeam) {
      return null;
    }
    fetch("http://localhost:8080/api/teams/editTeam/" + currentTeam.TeamId, {
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
            history.push(
              "/management/leagueDetails/" + currentTeam.TournamentId
            );
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
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  leagueTeams: state.leagueTeams,
  leagues: state.leagues,
  DeleteLeagueId: state.TournamentId,
  putTeamById: action.putTeamById
});

export default connect(mapStateToProps)(EditTeamModal);

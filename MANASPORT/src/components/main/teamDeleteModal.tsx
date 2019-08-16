import React from "react";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import * as action from "../../action";
import { createBrowserHistory } from "history";
import { ITeam } from "../../interfaces";

interface IProps {
  teams: ITeam[];
  handleCloseDeleteTeam: () => void;
}

interface IPropsGLobal {
  DeleteLeagueId: number;
  deleteTeamById: (TeamId: number) => void;
}

const DeleteTeamModal: React.FC<IProps & IPropsGLobal> = props => {
  const history = createBrowserHistory({ forceRefresh: true });
  const path: any = history.location.pathname;
  let pathTournamentId = path.split(["/"]).slice(-1)[0];

  const deleteTeam = (TeamId: number) => {
    fetch("http://localhost:8080/api/teams/deleteTeam/" + TeamId, {
      method: "POST"
    }).then(response => {
      if (response.ok) {
        props.deleteTeamById(TeamId);
        props.handleCloseDeleteTeam();
        history.push("/management/LeagueDetails/" + pathTournamentId);
      }
    });
  };

  const currentTeam = props.teams.find(
    u => u.TeamId === props.DeleteLeagueId
  );

  //Evita que 'league' sea undefined
  if (!currentTeam) {
    return null;
  }

  return (
    <div className="modal-dialog-centered" role="document">
      <div className="modal-content bg-light text-dark">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalCenterTitle">
            ¿Está seguro de eliminar esta liga?
          </h5>
          <button
            type="button"
            className="close"
            onClick={props.handleCloseDeleteTeam}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          El equipo "<b>{currentTeam.name}</b>" y todos sus datos serán eliminada de manera 
          permanente e irreversible.
          <br />
          <br />
          <b>Recomendación:</b> Si tiene información importante que podría falta
          en un futuro(como hacer historial de jugadores participantes, o algún
          otro tipo de estadística), mantenla.
        </div>
        <div className="modal-footer no-border">
          <div className="col text-right">
            <button onClick={props.handleCloseDeleteTeam}>Cancelar</button>
          </div>
          <div className="col">
            <button onClick={() => deleteTeam(props.DeleteLeagueId)}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  teams: state.teams,
  deleteTeamById: action.deleteTeamById,
  DeleteLeagueId: state.TeamId
});

export default connect(mapStateToProps)(DeleteTeamModal);

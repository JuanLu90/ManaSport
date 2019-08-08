import React from "react";
import "./deleteLeagueModal.css";
import { IGlobalState } from "../../../../../reducers/reducers";
import { connect } from "react-redux";
import * as action from "../../../../../action";
import { createBrowserHistory } from "history";
import { ITournament } from "../../../../../interfaces";

interface IProps {
  leagues: ITournament[];
  handleCloseDeleteLeague: () => void;
}

interface IPropsGLobal {
  DeleteLeagueId: number;
  deleteLeagueById: (LeagueId: number) => void;
}

const DeleteLeagueModal: React.FC<IProps & IPropsGLobal> = props => {
  const history = createBrowserHistory({ forceRefresh: true });

  const deleteLeague = (LeagueId: number) => {
    fetch("http://localhost:8080/api/tournaments/deleteTournament/" + LeagueId, {
      method: "POST"
    }).then(response => {
      if (response.ok) {
        props.deleteLeagueById(LeagueId);
        props.handleCloseDeleteLeague();
        history.push("/management");
      }
    });
  };

  const currentLeague = props.leagues.find(
    u => u.TournamentId === props.DeleteLeagueId
  );
  //Evita que 'league' sea undefined
  if (!currentLeague) {
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
            onClick={props.handleCloseDeleteLeague}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          La liga "<b>{currentLeague.name}</b>" y todos sus datos(equipos,
          estadisticas...) será eliminada de manera permanente e irreversible.
          <br />
          <br />
          <b>Recomendación:</b> Si tiene información importante que podría falta
          en un futuro(como hacer historial de equipos participantes, o algún
          otro tipo de estadística), mantenla.
        </div>
        <div className="modal-footer no-border">
          <div className="col text-right">
            <button onClick={props.handleCloseDeleteLeague}>Cancelar</button>
          </div>
          <div className="col">
            <button onClick={() => deleteLeague(props.DeleteLeagueId)}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  leagues: state.leagues,
  deleteLeagueById: action.deleteLeagueById,
  DeleteLeagueId: state.TournamentId
});

export default connect(mapStateToProps)(DeleteLeagueModal);

import React from "react";
import "./deletePlayoffModal.css";
import { IGlobalState } from "../../../../../reducers/reducers";
import { connect } from "react-redux";
import * as action from "../../../../../action";
import { createBrowserHistory } from "history";
import { ITournament } from "../../../../../interfaces";

interface IProps {
  playoffs: ITournament[];
  handleCloseDeletePlayoff: () => void;
}

interface IPropsGLobal {
  DeletePlayoffId: number;
  deletePlayoffById: (PlayoffId: number) => void;
}

const DeletePlayoffModal: React.FC<IProps & IPropsGLobal> = props => {
  const history = createBrowserHistory({ forceRefresh: true });

  const deletePlayoff = (PlayoffId: number) => {
    fetch("http://localhost:8080/api/tournaments/deleteTournament/" + PlayoffId, {
      method: "POST"
    }).then(response => {
      if (response.ok) {
        props.deletePlayoffById(PlayoffId);
        props.handleCloseDeletePlayoff();
        history.push("/management");
      }
    });
  };

  const currentPlayoff = props.playoffs.find(
    u => u.TournamentId === props.DeletePlayoffId
  );
  //Evita que 'league' sea undefined
  if (!currentPlayoff) {
    return null;
  }

  return (
    <div className="modal-dialog-centered" role="document">
      <div className="modal-content bg-light text-dark">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalCenterTitle">
            ¿Está seguro de eliminar esta competición?
          </h5>
          <button
            type="button"
            className="close"
            onClick={props.handleCloseDeletePlayoff}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          La liga "<b>{currentPlayoff.name}</b>" y todos sus datos(equipos,
          estadisticas...) será eliminada de manera permanente e irreversible.
          <br />
          <br />
          <b>Recomendación:</b> Si tiene información importante que podría falta
          en un futuro(como hacer historial de equipos participantes, o algún
          otro tipo de estadística), mantenla.
        </div>
        <div className="modal-footer no-border">
          <div className="col text-right">
            <button onClick={props.handleCloseDeletePlayoff}>Cancelar</button>
          </div>
          <div className="col">
            <button onClick={() => deletePlayoff(props.DeletePlayoffId)}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  playoffs: state.playoffs,
  deletePlayoffById: action.deletePlayoffById,
  DeletePlayoffId: state.TournamentId
});

export default connect(mapStateToProps)(DeletePlayoffModal);

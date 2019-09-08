//React´s Components
import React from "react";
import { IGlobalState } from "../../reducers/reducers";
//Redux
import { connect } from "react-redux";
import * as action from "../../action";
//Interfaces
import { IPlayer } from "../../interfaces";
import styled from "styled-components";



//----------------------------------------------------

const Wrapper = styled.div`
  font-family: "Source Sans Pro", sans-serif;
  z-index: 9999;
`



//Global Props
interface IProps {
  teamPlayers: IPlayer[];
  handleCloseDeletePlayer: () => void;
  toggleSetTeamPlayers: () => void;
}
interface IPropsGLobal {
  DeleteLeagueId: number;
  deletePlayerById: (PlayerId: number) => void;
}

const DeletePlayerModal: React.FC<IProps & IPropsGLobal> = props => { //Function Component

  const deletePlayer = (PlayerId: number) => {
    fetch("http://localhost:8080/api/players/deletePlayer/" + PlayerId, {
      method: "DELETE"
    }).then(response => {
      if (response.ok) {
        props.deletePlayerById(PlayerId);
        props.handleCloseDeletePlayer();
        props.toggleSetTeamPlayers();
      }
    });
  };

  const currentPlayer = props.teamPlayers.find(
    u => u.PlayerId === props.DeleteLeagueId
  );

  //Avoid that 'player' will be undefined
  if (!currentPlayer) {
    return null;
  }

  return (
    <Wrapper className="modal-dialog-centered" role="document">
      <div className="modal-content bg-light text-dark">
        <div className="modal-header bg-danger">
          <h5 className="modal-title text-light" id="exampleModalCenterTitle">
            ¿Está seguro de eliminar este equipo?
              </h5>
          <button
            type="button"
            className="close"
            onClick={props.handleCloseDeletePlayer}
          >
            <span aria-hidden="true" className="text-light">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          El jugador "<b>{currentPlayer.name}</b>" y todos sus datos serán eliminado de manera
          permanente e irreversible.
          <br />
          <br />
          <b>Recomendación:</b> Si tiene información importante que podría hacerle falta
          en un futuro(como historial de goles, asistencias o algún
          otro tipo de estadística), mantenla.
        </div>
        <div className="modal-footer p-2">
          <div className="row">
            <div className="col">
              <button className="btn btn-light" onClick={props.handleCloseDeletePlayer}>Cancelar</button>
            </div>
            <div className="col">
              <button className="btn btn-danger" onClick={() => deletePlayer(props.DeleteLeagueId)}>
                Eliminar
            </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  teamPlayers: state.teamPlayers,
  deletePlayerById: action.deletePlayerById,
  DeleteLeagueId: state.TeamId
});

export default connect(mapStateToProps)(DeletePlayerModal);

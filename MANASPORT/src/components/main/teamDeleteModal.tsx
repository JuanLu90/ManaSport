//React´s Components
import React from "react";
import { IGlobalState } from "../../reducers/reducers";
import { createBrowserHistory } from "history";
//Redux
import { connect } from "react-redux";
import * as action from "../../action";
//Interfaces
import { ITeam } from "../../interfaces";
import styled from "styled-components";



//----------------------------------------------------

const Wrapper = styled.div`
  font-family: "Source Sans Pro", sans-serif;
`



//Global Props
interface IProps {
  teams: ITeam[];
  handleCloseDeleteTeam: () => void;
}
interface IPropsGLobal {
  DeleteLeagueId: number;
  deleteTeamById: (TeamId: number) => void;
}

const DeleteTeamModal: React.FC<IProps & IPropsGLobal> = props => { //Function Component
  const history = createBrowserHistory({ forceRefresh: true }); //Refresh the page
  const path: any = history.location.pathname; //Get the path content
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

  //Avoid that 'team' will be undefined
  if (!currentTeam) {
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
            onClick={props.handleCloseDeleteTeam}
          >
            <span aria-hidden="true" className="text-light">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          El equipo "<b>{currentTeam.name}</b>" y todos sus datos será eliminado de manera
          permanente e irreversible.
          <br />
          <br />
          <b>Recomendación:</b> Si tiene información importante que podría hacerle falta
          en un futuro(como historial de jugadores participantes, o algún
          otro tipo de estadística), mantenla.
        </div>
        <div className="modal-footer p-2">
          <div className="row">
            <div className="col">
              <button className="btn btn-light" onClick={props.handleCloseDeleteTeam}>Cancelar</button>
            </div>
            <div className="col">
              <button className="btn btn-danger" onClick={() => deleteTeam(props.DeleteLeagueId)}>
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
  teams: state.teams,
  deleteTeamById: action.deleteTeamById,
  DeleteLeagueId: state.TeamId
});

export default connect(mapStateToProps)(DeleteTeamModal);

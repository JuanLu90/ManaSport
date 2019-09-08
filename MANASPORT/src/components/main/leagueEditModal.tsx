import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as action from "../../action";
import { IGlobalState } from "../../reducers/reducers";
import { Form, Alert } from "react-bootstrap";
import { ITournament } from "../../interfaces";
import styled from "styled-components";

// STYLES ----- STYLED COMPONENTS ----- CSSINJS
const Wrapper = styled.div`
  font-family: "Source Sans Pro", sans-serif;
`
const Wrapper2 = styled.div`
  background-color: #2B2F38;
`
const SpanAlert = styled.span`
  font-size: 0.85em;
`

//----------------------------------------------------


interface IProps {
  leagues: ITournament[];
  handleCloseEditLeague: () => void;
  toggleSetLeagues: () => void;
  putLeagueById: (LeagueId: number, league: ITournament) => void;
  DeleteLeagueId: number;
}

interface IPropsGLobal {
  // EditLeagueId: number;
  // editLeagueById: (LeagueId: number) => void;
}

const EditLeagueModal: React.FC<IProps & IPropsGLobal> = props => {

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

  const [alertWrongLeagueName, setAlertWrongLeagueName] = useState(false);
  const toggleWrongLeagueName = React.useCallback(() => setAlertWrongLeagueName(s => !s), []); //Open and close alert league name invalid

  useEffect(() => {
    if (currentLeague) {
      setInputLeagueName(currentLeague.name);
      setInputLeagueCategory(currentLeague.category);
    }
  }, [currentLeague]);

  //Evita que 'league' sea undefined
  if (!currentLeague) {
    return null;
  }

  const editCurrentLeague = () => {
    if (inputLeagueName.length > 3 && inputLeagueName.length < 41) {
    fetch("http://localhost:8080/api/tournaments/editTournament/" +
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
            props.handleCloseEditLeague();
            props.toggleSetLeagues();
          });
        }
      })
      .catch(err => {
        console.log("Error, " + err);
      });
    } else {
      toggleWrongLeagueName();
      setInputLeagueName(currentLeague.name);
      setTimeout(() => toggleWrongLeagueName(), 4000)
    }
  };

  return (
    <Wrapper className="modal-dialog-centered" role="document">
      <Wrapper2 className="modal-content text-light border border-secondary">
        <div className="modal-header bg-warning text-dark">
          <h5 className="modal-title" id="exampleModalCenterTitle">
            Está editando: <b>{currentLeague.name}</b>
          </h5>
          <button
            type="button"
            className="close"
            onClick={props.handleCloseEditLeague}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col">
              Nombre de la liga:
            </div>
          </div>
          <div className="row  mb-3">
            <div className="col">
                <input
                  type="text"
                  className="form-control form-control-sm mt-0"
                  value={inputLeagueName}
                  onChange={updateLeagueName}
                />
            </div>
          </div>
          <div className="row">
            <div className="col">
              Modalidad:
            </div>
          </div>
          <div className="row">
            <div className="col">
                <Form.Control
                  as="select"
                  value={inputLeagueCategory}
                  onChange={updateLeagueCategory}
                  size="sm"
                >
                  <option>Futbol 11</option>
                  <option>Futbol 7</option>
                  <option>Futbol Sala</option>
                  <option>Futbol(otros)</option>
                </Form.Control>
            </div>
          </div>
          {alertWrongLeagueName && (
          <div className="row justify-content-center mt-4">
            <div className="col text-center">
              <Alert variant="danger" className="p-2">
                <img src="/images/other/cancel.png" width="25" alt="" className="mr-1" />
                <SpanAlert> 
                  <b> Nombre de liga inválido.</b> 
                  <br/>
                  El nombre de una liga debe de contener entre 4 y 40 caracteres.
                </SpanAlert>
              </Alert>
            </div>
          </div>
        )}
        </div>
        <div className="modal-footer">
          <div className="col text-right">
            <button className="btn btn-light font-weight-bold" onClick={props.handleCloseEditLeague}>Cancelar</button>
          </div>
          <div className="col">
            <button className="btn btn-warning font-weight-bold" onClick={editCurrentLeague}>Guardar</button>
          </div>
        </div>
      </Wrapper2>
    </Wrapper>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  leagues: state.leagues,
  deleteLeagueById: action.deleteLeagueById,
  DeleteLeagueId: state.TournamentId,
  putLeagueById: action.putLeagueById
});

export default connect(mapStateToProps)(EditLeagueModal);

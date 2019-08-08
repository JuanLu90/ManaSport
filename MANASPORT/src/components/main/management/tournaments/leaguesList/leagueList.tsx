import React, { useState } from "react";
import "./leagueList.css";
import { Button, InputGroup, Form, Table, Modal } from "react-bootstrap";
import { ITournament } from "../../../../../interfaces";
import { IGlobalState } from "../../../../../reducers/reducers";
import { connect } from "react-redux";
import * as action from "../../../../../action";
import DeleteLeagueModal from "../deleteLeagueModal/deleteLeagueModal";
import EditLeagueModal from "../editLeagueModal/editLeagueModal";
import jwt from "jsonwebtoken";
import NewTeamLeagueModal from "../teams/newTeamLeagueModal/newTeamLeagueModal";
import { Link } from "react-router-dom";

interface IProps {}

interface IPropsGlobal {
  leagues: ITournament[];
  newLeague: (league: ITournament) => void;
  setLeagueId: (DeleteLeagueId: number) => void;
  DeleteLeagueId: number;
  deleteLeagueById: (LeagueId: number) => void;
}

const LeaguesList: React.FC<IProps & IPropsGlobal> = props => {
  const [inputLeagueName, setInputLeagueName] = useState("");
  const [inputLeagueSport, setInputLeagueSport] = useState("Futbol");
  const [inputLeagueCategory, setInputLeagueCategory] = React.useState(
    "Futbol 11"
  );

  const [inputLeagueCreateDate, setInputLeagueCreateDate] = useState(
    new Date().toLocaleDateString()
  );

  const updateLeagueName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLeagueName(event.currentTarget.value);
  };
  const updateLeagueSport = (event: any) => {
    setInputLeagueSport(event.currentTarget.value);
  };
  const updateLeagueCategory = (event: any) => {
    setInputLeagueCategory(event.currentTarget.value);
  };

  const [showDeleteLeague, setDeleteLeague] = useState(false);
  const handleCloseDeleteLeague = () => setDeleteLeague(false);
  const handleShowDeleteLeague = () => setDeleteLeague(true);

  function funcionDeleteLeague(DeleteLeagueId: any): any {
    handleShowDeleteLeague();
    props.setLeagueId(DeleteLeagueId);
  }

  const [showEditLeague, setEditLeague] = useState(false);
  const handleCloseEditLeague = () => setEditLeague(false);
  const handleShowEditLeague = () => setEditLeague(true);

  function funcionEditLeague(DeleteLeagueId: any): any {
    handleShowEditLeague();
    props.setLeagueId(DeleteLeagueId);
  }

  const [showNewTeamLeague, setShowNewTeamLeague] = useState(false);
  const handleCloseShowNewTeamLeague = () => setShowNewTeamLeague(false);
  const handleShowNewTeam = () => setShowNewTeamLeague(true);

  function funcionNewTeamLeague(DeleteLeagueId: any): any {
    handleShowNewTeam();
    props.setLeagueId(DeleteLeagueId);
  }

  const sendLeague = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwt.decode(token);
      const UserId: number = decoded.UserId;
      setInputLeagueName("");
      fetch("http://localhost:8080/api/tournaments/newTournament", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          name: inputLeagueName,
          sport: inputLeagueSport,
          category: inputLeagueCategory,
          createdate: inputLeagueCreateDate,
          UserId: UserId,
          type: "league"
        })
      })
        .then(response => {
          if (response.ok) {
            response.json().then(l => {
              props.newLeague(l);
           
            });
          }
        })
        .catch(err => {
          console.log("Error," + err);
        });
    }
  };

  const token: any = localStorage.getItem("token");

  const decoded: any = jwt.decode(token);
  const UserId: number = decoded.UserId;

  return (
    <>
      <div className="container-fluid text-dark">
        <div className="row mt-4">
          <div className="col style-head-leagueList">Tus ligas:</div>
        </div>
        <div className="row mt-1 bg-leagueList">
          <div className="col p-3 text-center">
            <Table responsive="md" striped hover size="lg">
              <thead className="style-tablehead-leagueList">
                <tr>
                  <th />
                  <th />
                  <th>DEPORTE</th>
                  <th>MODALIDAD</th>
                  <th>Nº EQUIPOS</th>
                  <th>FECHA CREACIÓN</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody className="style-tablebody-leagueList">
                {props.leagues.map(l => (
                  <tr key={l.TournamentId}>
                    <td className="p-1">{l.TournamentId}</td>
                    <td className="p-1">
                      <Link
                        to={"/management/leagueDetails/" + l.TournamentId}
                        className="nounderline"
                      >
                        {l.name}
                      </Link>
                    </td>
                    <td className="p-1">{l.sport}</td>
                    <td className="p-1">{l.category}</td>
                    <td className="p-1">
                      <div className="row">
                        <div className="col text-center">{l.NTeams}</div>
                        {/* <div className="col p-0 text-left">
                          <Button
                            variant="outline-dark"
                            className="pt-0 pb-0 pl-2 pr-2 rounded-circle"
                            size="sm"
                            onClick={() => funcionNewTeamLeague(l.TournamentId)}
                          >
                            +
                          </Button>
                        </div> */}
                      </div>
                    </td>
                    <td className="p-1">
                      {l.createdate}
                      {/* {new Date(l.createdate).toLocaleDateString()} */}
                      {/* en la BBDD 'createdate' datatype TIMESTAMP Y default/expression DEFAULT_TIMESTAMP  */}
                    </td>
                    <td className="p-1">
                      <Button
                        variant="outline-info"
                        className="pt-0 pb-0 pl-3 pr-3"
                        size="sm"
                        onClick={() => funcionEditLeague(l.TournamentId)}
                      >
                        Editar
                      </Button>
                    </td>
                    <td className="p-1 cursor-pointer">
                      <Button
                        variant="outline-danger"
                        className="pt-0 pb-0 pl-3 pr-3"
                        size="sm"
                        onClick={() => funcionDeleteLeague(l.TournamentId)}
                      >
                        Desactivar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="row justify-content-center mt-4 p-2 bg-leagueList">
          <div className="col-5">
            <InputGroup size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Nombre de la liga*
                </InputGroup.Text>
              </InputGroup.Prepend>
              <input
                type="text"
                className="form-control form-control-sm"
                value={inputLeagueName}
                onChange={updateLeagueName}
              />
            </InputGroup>
          </div>
          <div className="col-3">
            <InputGroup size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Deporte*
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control as="select" onChange={updateLeagueSport}>
                <option>Futbol</option>
              </Form.Control>
            </InputGroup>
          </div>
          <div className="col-3">
            <InputGroup size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Categoría*
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control as="select" onChange={updateLeagueCategory}>
                <option>Futbol 11</option>
                <option>Futbol 7</option>
                <option>Futbol Sala</option>
                <option>Futbol(otros)</option>
              </Form.Control>
            </InputGroup>
          </div>
          <div className="col-1 text-center align-self-center">
            <Button
              variant="outline-success"
              onClick={sendLeague}
              className="pt-0 pb-0 pl-3 pr-3"
            >
              Crear
            </Button>
          </div>
        </div>
      </div>
      <Modal show={showDeleteLeague} onHide={() => null}>
        <DeleteLeagueModal handleCloseDeleteLeague={handleCloseDeleteLeague} />
      </Modal>
      <Modal size="lg" show={showEditLeague} onHide={() => null}>
        <EditLeagueModal handleCloseEditLeague={handleCloseEditLeague} />
      </Modal>
      <Modal size="lg" show={showNewTeamLeague} onHide={() => null}>
        <NewTeamLeagueModal
          handleCloseShowNewTeamLeague={handleCloseShowNewTeamLeague}
        />
      </Modal>
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  leagues: state.leagues,
  DeleteLeagueId: state.TournamentId
});

const mapDispatchToProps = {
  deleteLeagueById: action.deleteLeagueById,
  newLeague: action.newLeague,
  setLeagueId: action.setLeagueId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaguesList);

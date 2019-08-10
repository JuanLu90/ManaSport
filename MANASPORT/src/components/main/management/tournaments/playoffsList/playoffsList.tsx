import React, { useState } from "react";
import "./playoffList.css";
import { Button, InputGroup, Form, Table, Modal } from "react-bootstrap";
import { ITournament } from "../../../../../interfaces";
import { IGlobalState } from "../../../../../reducers/reducers";
import { connect } from "react-redux";
import * as action from "../../../../../action";
import DeletePlayoffModal from "../deletePlayoffModal";
import EditPlayoffModal from "../editPlayoffModal";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";

interface IProps { }

interface IPropsGlobal {
  playoffs: ITournament[];
  newPlayoff: (playoff: ITournament) => void;
  setPlayoffId: (DeletePlayoffId: number) => void;
  DeletePlayoffId: number;
  deletePlayoffById: (PlayoffId: number) => void;
}

const PlayoffList: React.FC<IProps & IPropsGlobal> = props => {
  const [inputPlayoffName, setInputPlayoffName] = React.useState("");
  const [inputPlayoffSport, setInputPlayoffSport] = React.useState("Futbol");
  const [inputPlayoffCategory, setInputPlayoffCategory] = React.useState(
    "Futbol 11"
  );

  const [inputPlayoffCreateDate, setInputPlayoffCreateDate] = useState(
    new Date().toLocaleDateString()
  );

  const updatePlayoffName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPlayoffName(event.currentTarget.value);
  };
  const updatePlayoffSport = (event: any) => {
    setInputPlayoffSport(event.currentTarget.value);
  };
  const updatePlayoffCategory = (event: any) => {
    setInputPlayoffCategory(event.currentTarget.value);
  };

  const [showDeletePlayoff, setDeletePlayoff] = useState(false);
  const handleCloseDeletePlayoff = () => setDeletePlayoff(false);
  const handleShowDeletePlayoff = () => setDeletePlayoff(true);

  function funcionDeletePlayoff(DeletePlayoffId: any): any {
    handleShowDeletePlayoff();
    props.setPlayoffId(DeletePlayoffId);
  }

  const [showEditPlayoff, setEditPlayoff] = useState(false);
  const handleCloseEditPlayoff = () => setEditPlayoff(false);
  const handleShowEditPlayoff = () => setEditPlayoff(true);

  function funcionEditPlayoff(DeletePlayoffId: any): any {
    handleShowEditPlayoff();
    props.setPlayoffId(DeletePlayoffId);
  }

  const [showNewTeamPlayoff, setShowNewTeamPlayoff] = useState(false);
  const handleCloseShowNewTeamPlayoff = () => setShowNewTeamPlayoff(false);
  const handleShowNewTeamPlayoff = () => setShowNewTeamPlayoff(true);

  function funcionNewTeamPlayoff(DeletePlayoffId: any): any {
    handleShowNewTeamPlayoff();
    props.setPlayoffId(DeletePlayoffId);
  }

  const sendPlayoff = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwt.decode(token);
      const UserId: number = decoded.UserId;
      fetch("http://localhost:8080/api/tournaments/newTournament", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          name: inputPlayoffName,
          sport: inputPlayoffSport,
          category: inputPlayoffCategory,
          createdate: inputPlayoffCreateDate,
          UserId: UserId,
          type: 'playoff'
        })
      })
        .then(response => {
          if (response.ok) {
            response.json().then(p => {
              props.newPlayoff(p);
            });
          }
        })
        .catch(err => {
          console.log("Error," + err);
        });
    };
  };


  return (
    <>
      <div className="container-fluid text-dark">
        <div className="row mt-4">
          <div className="col style-head-PlayoffList">Tus eliminatorias:</div>
        </div>
        <div className="row mt-1 bg-playoffList">
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
              <tbody className="style-tablebody-playoffList">
                {props.playoffs.map(p => (
                  <tr key={p.TournamentId}>
                    <td className="p-1">{p.TournamentId}</td>
                    <td className="p-1">
                      <Link to={"/management/leagueDetails/" + p.TournamentId} className="nounderline">
                        {p.name}
                      </Link></td>
                    <td className="p-1">{p.sport}</td>
                    <td className="p-1">{p.category}</td>
                    <td className="p-1">
                      <div className="row">
                        <div className="col text-center">{p.NTeams}</div>
                        {/* <div className="col p-0 text-left">
                          <Button
                            variant="outline-dark"
                            className="pt-0 pb-0 pl-2 pr-2 rounded-circle"
                            size="sm"
                            onClick={() => funcionNewTeamPlayoff(p.TournamentId)}
                          >
                            +
                          </Button>
                        </div> */}
                      </div>

                    </td>
                    <td className="p-1">
                      {p.createdate}
                    </td>
                    <td className="p-1">
                      <Button
                        variant="outline-info"
                        className="pt-0 pb-0 pl-3 pr-3"
                        size="sm"
                        onClick={() => funcionEditPlayoff(p.TournamentId)} >
                        Editar
                      </Button>
                    </td>
                    <td className="p-1 cursor-pointer">
                      <Button
                        variant="outline-danger"
                        className="pt-0 pb-0 pl-3 pr-3"
                        size="sm"
                        onClick={() => funcionDeletePlayoff(p.TournamentId)}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="row justify-content-center mt-4 p-2 bg-playoffList">
          <div className="col-5">
            <InputGroup size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Nombre de la eliminatoria*
                </InputGroup.Text>
              </InputGroup.Prepend>
              <input
                type="text"
                className="form-control form-control-sm"
                onChange={updatePlayoffName}
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
              <Form.Control as="select" onChange={updatePlayoffSport}>
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
              <Form.Control as="select" onChange={updatePlayoffCategory}>
                <option>Futbol 11</option>
                <option>Futbol 7</option>
                <option>Futbol Sala</option>
                <option>Futbol(otros)</option>
              </Form.Control>
            </InputGroup>
          </div>
          <div className="col-1 text-center align-self-center">
            <Button variant="outline-success" onClick={sendPlayoff} className="pt-0 pb-0 pl-3 pr-3">
              Crear
            </Button>
          </div>
        </div>
      </div>
      <Modal show={showDeletePlayoff} onHide={() => null}>
        <DeletePlayoffModal handleCloseDeletePlayoff={handleCloseDeletePlayoff} />
      </Modal>
      <Modal size="lg" show={showEditPlayoff} onHide={() => null}>
        <EditPlayoffModal
          handleCloseEditPlayoff={handleCloseEditPlayoff} />
      </Modal>
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  playoffs: state.playoffs,
  DeletePlayoffId: state.TournamentId
});

const mapDispatchToProps = {
  deletePlayoffById: action.deletePlayoffById,
  newPlayoff: action.newPlayoff,
  setPlayoffId: action.setPlayoffId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayoffList);

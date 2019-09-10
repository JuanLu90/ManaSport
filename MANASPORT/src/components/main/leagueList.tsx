//React´s Components
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
//Components made by Juanlu
import DeleteLeagueModal from "./leagueDeleteModal";
import EditLeagueModal from "./leagueEditModal";
//React Bootstrap
import { Button, InputGroup, Form, Table, Modal, Alert, Spinner } from "react-bootstrap";
//Interfaces
import { ITournament } from "../../interfaces";
//Redux
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import * as action from "../../action";
//JsonWebToken
import jwt from "jsonwebtoken";
//Styled Components - CSSINJS
import styled from "styled-components";

// ********* Styles - Styled Components - CSSINJS **********


const TableHead = styled.thead`
  font-family: "Roboto", sans-serif;
`;
const Title = styled.span`
  font-size: 2.3em;
  font-family: "Source Sans Pro", sans-serif;
  color: #bdbdbd;
  text-transform: uppercase;
`;

//----------------------------------------------------

//Global Props
interface IProps { }
interface IPropsGlobal {
  setLeagues: (leagues: ITournament[]) => void;
  leagues: ITournament[];
  newLeague: (league: ITournament) => void;
  setLeagueId: (DeleteLeagueId: number) => void;
  DeleteLeagueId: number;
  deleteLeagueById: (LeagueId: number) => void;
  allleagues: ITournament[];
}

const LeaguesList: React.FC<RouteComponentProps & IProps & IPropsGlobal> = props => {

  const token = localStorage.getItem("token"); //Token - Get the token stored from local storage

  let leagueorallleagues;
  if (token) {
    leagueorallleagues = props.leagues;
  } else {
    leagueorallleagues = props.allleagues;
  }

  const compareName = (a: any, b: any) => {
    if (a.name.localeCompare(b.name) > b.name.localeCompare(a.name)) {
      return -1;
    }
    if (a.name.localeCompare(b.name) < b.name.localeCompare(a.name)) {
      return 1;
    }
    return 0;
  };
  const compareNameReverse = (a: any, b: any) => {
    if (a.name.localeCompare(b.name) < b.name.localeCompare(a.name)) {
      return -1;
    }
    if (a.name.localeCompare(b.name) > b.name.localeCompare(a.name)) {
      return 1;
    }
    return 0;
  };

  const [sortByName, setSortByName] = React.useState(false);
  const toggleSortByName = React.useCallback(() => setSortByName(s => !s), []);

  if (sortByName) {
    leagueorallleagues.sort(compareName);
  } else {
    leagueorallleagues.sort(compareNameReverse);
  }

  const [inputLeagueName, setInputLeagueName] = useState("");
  const [inputLeagueSport, setInputLeagueSport] = useState("Fútbol");
  const [inputLeagueCategory, setInputLeagueCategory] = React.useState(
    "Fútbol 11"
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

  const [alertWrongLeagueName, setAlertWrongLeagueName] = useState(false);
  const toggleWrongLeagueName = React.useCallback(
    () => setAlertWrongLeagueName(s => !s),
    []
  ); //Open and close alert league name invalid

  const [alertRightLeagueName, setAlertRightLeagueName] = useState(false);
  const toggleRightLeagueName = React.useCallback(
    () => setAlertRightLeagueName(s => !s),
    []
  ); //Open and close alert league name valid

  const [updateSetLeagues, setUpdateSetLeagues] = React.useState(false);
  const toggleSetLeagues = React.useCallback(
    () => setUpdateSetLeagues(s => !s),
    []
  ); //Open and close alert league name invalid


  useEffect(() => {
    //Fetch leagues of the current user to redux
    if (token) {
      // We need that token exits to decode it but React will fall down
      const decoded: any = jwt.decode(token); //Decode token to get the UserId
      const UserId: number = decoded.UserId; //Get the UserId
      fetch(
        "http://localhost:8080/api/users/tournamentsList/leagues/" + UserId,
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json"
            // Authorization: "Bearer " + props.token
          }
        }
      ).then(response => {
        if (response.ok) {
          response.json().then(leagues => props.setLeagues(leagues));
        }
      });
    }
  }, [token, props.leagues.length, updateSetLeagues]); //When a new League is add, Redux will be update.

  const [spinner, setSpinner] = useState(false);
  const toggleSpinner = React.useCallback(() => setSpinner(s => !s), []);


  const sendLeague = () => {
    if (inputLeagueName.length > 3 && inputLeagueName.length < 41) {
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
            name: inputLeagueName,
            sport: inputLeagueSport,
            category: inputLeagueCategory,
            createdate: inputLeagueCreateDate,
            UserId: UserId
          })
        })
          .then(response => {
            if (response.ok) {
              response.json().then(l => {
                props.newLeague(l);
                setInputLeagueName("");
                toggleRightLeagueName();
                setTimeout(() => toggleRightLeagueName(), 4000);
              });
            }
          })
          .catch(err => {
            console.log("Error," + err);
          });
      }
    } else {
      toggleWrongLeagueName();
      setInputLeagueName("");
      setTimeout(() => toggleWrongLeagueName(), 4000);
    }
  };
  return (
    <>
      <div className="container-fluid" style={token ? { marginBottom: '100px', fontFamily: "'Source Sans Pro', sans-serif" } : { margin: '120px 0', fontFamily: "'Source Sans Pro', sans-serif" }}>
        <div className="row mt-4 justify-content-center">
          <div className="col-10">
            <Title>Tus ligas:</Title>
          </div>
        </div>
        <div className="row mt-1 justify-content-center">
          <div className="col-10 p-3 text-center">
            <Table
              responsive="md"
              variant="dark"
              striped
              hover
              className=" border border-secondary"
            >
              <TableHead>
                <tr>
                  <th />
                  <th>
                    NOMBRE
                    <img
                      src="/images/other/sort.png"
                      className="ml-2 mb-1"
                      width="15"
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleSortByName()}
                      alt=""
                    />
                  </th>
                  {!token && <th>Administrador</th>}
                  <th>DEPORTE</th>
                  <th>MODALIDAD</th>
                  <th>Nº EQUIPOS</th>
                  <th>FECHA CREACIÓN</th>
                  {!token && <>
                    <th />
                    <th />
                  </>
                  }
                </tr>
              </TableHead>
              <tbody>
                {leagueorallleagues.map(l => (
                  <tr key={l.TournamentId}>
                    <td className="p-1 align-middle">{l.TournamentId}</td>
                    <td className="text-warning p-0 align-middle"
                      style={{ cursor: 'pointer' }}
                      onClick={() => (
                        toggleSpinner(),
                        setTimeout(() => toggleSpinner(), 1000),
                        setTimeout(() => props.history.push("/management/leagueDetails/" + l.TournamentId), 1000)
                      )}
                    >
                      {l.name}
                    </td>
                    {!token && <td className="p-1 align-middle">{l.NameAdmin}</td>}
                    <td className="p-1 align-middle">{l.sport}</td>
                    <td className="p-1 align-middle">{l.category}</td>
                    <td className="p-1 align-middle">
                      <div className="row">
                        <div className="col text-center">{l.NTeams}</div>
                      </div>
                    </td>
                    <td className="p-1 align-middle">{l.createdate}</td>
                    {token && <>
                      <td className="p-1 align-middle">
                        <img
                          src="/images/other/edit.png"
                          width="15"
                          alt=""
                          onClick={() => funcionEditLeague(l.TournamentId)}
                          style={{ cursor: "pointer" }}
                        />
                      </td>

                      <td className="p-1 cursor-pointer  align-middle">
                        <Button
                          variant="danger"
                          className="pt-0 pb-0 pl-3 pr-3"
                          size="sm"
                          onClick={() => funcionDeleteLeague(l.TournamentId)}
                        >
                          Eliminar
                          </Button>
                      </td>
                    </>
                    }

                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        {token && <>
          <div className="row justify-content-center">
            <div className="col-4">
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text
                    id="inputGroup-sizing-sm"
                    className="bg-secondary border border-secondary text-light"
                  >
                    Nombre de la liga*
                </InputGroup.Text>
                </InputGroup.Prepend>
                <input
                  type="text"
                  className="form-control form-control-sm bg-dark border border-secondary text-light"
                  value={inputLeagueName}
                  onChange={updateLeagueName}
                // autoFocus
                />
              </InputGroup>
            </div>
            <div className="col-2">
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text
                    id="inputGroup-sizing-sm"
                    className="bg-secondary border border-secondary text-light"
                  >
                    Deporte*
                </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  as="select"
                  onChange={updateLeagueSport}
                  className="bg-dark border border-secondary text-light"
                >
                  <option>Fútbol</option>
                </Form.Control>
              </InputGroup>
            </div>
            <div className="col-2">
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text
                    id="inputGroup-sizing-sm"
                    className="bg-secondary border border-secondary text-light"
                  >
                    Categoría*
                </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  as="select"
                  onChange={updateLeagueCategory}
                  className="bg-dark border border-secondary text-light"
                >
                  <option>Fútbol 11</option>
                  <option>Fútbol 7</option>
                  <option>Fútbol Sala</option>
                  <option>Fútbol(otros)</option>
                </Form.Control>
              </InputGroup>
            </div>
            <div className="col-2 text-center align-self-center">
              <Button
                variant="warning"
                onClick={sendLeague}
                className="font-weight-bold text-dark pl-3 pr-3 btn-sm"
              >
                <img
                  src="/images/other/plus.png"
                  className="mr-2 align-middle"
                  width="17"
                  alt=""
                />
                <span className="align-middle">CREAR LIGA</span>
              </Button>
            </div>
          </div>
          {alertWrongLeagueName && (
            <div className="row justify-content-center mt-4">
              <div className="col-10 text-center">
                <Alert variant="danger" className="p-2">
                  <img
                    src="/images/other/cancel.png"
                    width="35"
                    alt=""
                    className="mr-3"
                  />
                  <span>
                    <b> Nombre de liga inválido.</b> El nombre de una liga debe de
                    contener entre 4 y 40 caracteres.
                </span>
                </Alert>
              </div>
            </div>
          )}
          {alertRightLeagueName && (
            <div className="row justify-content-center mt-4">
              <div className="col-10 text-center">
                <Alert variant="success" className="p-2">
                  <img
                    src="/images/other/send.png"
                    width="35"
                    alt=""
                    className="mr-3"
                  />
                  <span>
                    <b> Liga creada correctamente</b>{" "}
                  </span>
                </Alert>
              </div>
            </div>
          )}
        </>}
      </div>
      <Modal show={showDeleteLeague} onHide={() => null}>
        <DeleteLeagueModal
          handleCloseDeleteLeague={handleCloseDeleteLeague}
          toggleSetLeagues={toggleSetLeagues}
        />
      </Modal>
      <Modal show={showEditLeague} onHide={() => null}>
        <EditLeagueModal
          handleCloseEditLeague={handleCloseEditLeague}
          toggleSetLeagues={toggleSetLeagues}
        />
      </Modal>
      <Modal show={spinner}>
        <div className="modal-dialog-centered justify-content-center" role="document">
          <Spinner animation="border" variant="primary" style={{ width: '120px', height: '120px', borderWidth: '8px' }} />
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  leagues: state.leagues,
  DeleteLeagueId: state.TournamentId,
  allleagues: state.allleagues

});

const mapDispatchToProps = {
  deleteLeagueById: action.deleteLeagueById,
  newLeague: action.newLeague,
  setLeagueId: action.setLeagueId,
  setLeagues: action.setLeagues
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaguesList);

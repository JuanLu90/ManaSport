import React, { useEffect, useState } from "react";
import {
  Table,
  Tab,
  Nav,
  Card,
  CardDeck,
  ListGroupItem,
  ListGroup,
  Modal,
  Form,
  InputGroup,
  Button
} from "react-bootstrap";
import { ITeam } from "../../interfaces";
import * as action from "../../action";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import { IGlobalState } from "../../reducers/reducers";
import EditTeamModal from "./teamEditModal";
import DeleteTeamModal from "./teamDeleteModal";
import styled from "styled-components";

interface IProps {}

interface IPropsGlobal {
  leagueTeams: ITeam[];
  newTeam: (team: ITeam) => void;
  setLeagueTeams: (leagueTeams: ITeam[]) => void;
  setTeamId: (TeamId: number) => void;
  setLeagueId: (DeleteLeagueId: number) => void;
  DeleteLeagueId: number;
}

const LeagueDetailsTeams: React.FC<IProps & IPropsGlobal> = props => {
  const token: any = localStorage.getItem("token");
  const history = createBrowserHistory({});
  const path: any = history.location.pathname;
  let pathTournamentId = path.split(["/"]).slice(-1)[0];

  useEffect(() => {
    //FETCH LEAGUE´S TEAMS TO REDUX
    // const decoded: any = jwt.decode(token);
    // const UserId: number = decoded.UserId;
    fetch(
      "http://localhost:8080/api/tournaments/tournamentTeams/" +
        pathTournamentId,
      {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
          // Authorization: "Bearer " + props.token
        }
      }
    ).then(response => {
      if (response.ok) {
        response.json().then(result => props.setLeagueTeams(result));
      }
    });
  }, [token]);

  const [showEditTeam, setEditTeam] = useState(false);
  const handleCloseEditTeam = () => setEditTeam(false);
  const handleShowEditTeam = () => setEditTeam(true);

  function funcionEditTeam(DeleteLeagueId: any): any {
    handleShowEditTeam();
    props.setTeamId(DeleteLeagueId);
  }

  // const currentTeam = props.leagueTeams.find(
  //   u => u.TeamId === props.DeleteLeagueId
  // );
  //Evita que 'league' sea undefined
  //   if (!currentTeam) {
  //     return null;
  //   }

  const [inputTeamName, setInputTeamName] = useState("");
  const [inputTeamLocality, setInputTeamLocality] = useState("Álava");
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
  const updateTeamCoach2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTeamCoach2(event.currentTarget.value);
  };
  const updateTeamEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTeamEmail(event.currentTarget.value);
  };
  const updateTeamPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTeamPhone(event.currentTarget.value);
  };

  const [showDeleteTeam, setDeleteTeam] = useState(false);
  const handleCloseDeleteTeam = () => setDeleteTeam(false);
  const handleShowDeleteTeam = () => setDeleteTeam(true);

  function funcionDeleteTeam(DeleteLeagueId: any): any {
    handleShowDeleteTeam();
    props.setTeamId(DeleteLeagueId);
  }

  const [fetchError, setFetchError] = useState("");

  const sendTeam = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:8080/api/teams/newTeam", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          name: inputTeamName === "" ? null : inputTeamName,
          locality: inputTeamLocality === "" ? null : inputTeamLocality,
          coach: inputTeamCoach === "" ? null : inputTeamCoach,
          coach2: inputTeamCoach2 === "" ? null : inputTeamCoach2,
          contactEmail: inputTeamEmail === "" ? null : inputTeamEmail,
          contactPhone: inputTeamPhone === "" ? null : inputTeamPhone,
          TournamentId: pathTournamentId
        })
      })
        .then(response => {
          if (response.ok) {
            response.json().then(t => {
              props.newTeam(t);
              setInputTeamName("");
              setInputTeamCoach("");
              setInputTeamCoach2("");
              setInputTeamEmail("");
              setInputTeamPhone("");
            });
          } else {
            response.json().then(({ e }) => {
              if (e === 1062) {
                setFetchError("El nombre del equipo ya existe");
              }
            });
          }
        })
        .catch(err => {
          console.log("Error," + err);
        });
    }
  };

  // ****** Styles *******
  const WrapperTeams = styled.div`
    box-shadow: 2px 2px 2px 2px #888888;
  `;
  const WrapperCardBody = styled.div`
    background: #232980;
  `;
  const ListgroupCard = styled.thead`
    font-size: 0.8em;
  `;
  const borderCard = {
    border: "1px solid rgb(35, 41, 128)"
  };
  // *********************

  return (
    <>
      <div className="container-fluid text-dark">
        <div className="row">EQUIPOS</div>
        <div className="row mt-1 ">
          <div className="col p-3 m-1 text-center bg-leagueList">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Nav
                variant="pills"
                className="flex-fill text-right justify-content-end mb-3"
              >
                <Nav.Item style={{ width: "2rem" }}>
                  <Nav.Link
                    eventKey="first"
                    className="pt-0 pl-0 pr-0 pb-1 bg-light text-center"
                  >
                    <img src="/images/other/normal.png" width="20" alt="" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item style={{ width: "2rem" }}>
                  <Nav.Link
                    eventKey="second"
                    className="pt-0 pl-0 pr-0 pb-1 bg-light text-center"
                  >
                    <img src="/images/other/cards.png" width="20" alt="" />
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <WrapperTeams className="row">
                    <Table responsive striped hover>
                      <thead className="style-tablehead-leagueList">
                        <tr>
                          <th> </th>
                          <th> NOMBRE </th>
                          {/* <th> JUGADORES </th> */}
                          <th> PROVINCIA </th>
                          <th> ENTRENADOR </th>
                          <th>2º ENTRENADOR</th>
                          <th>Nº JUGADORES</th>
                          <th>EMAIL</th>
                          <th>TELÉFONO</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {props.leagueTeams.map(l => (
                          <tr key={l.TeamId}>
                            <td className="p-0 align-middle">
                              <img src={l.badge} width="24" />
                            </td>
                            <td className="p-2">
                              {l.name === null ? "-" : l.name}
                            </td>
                            {/* <td className="p-2"> 21 </td> */}
                            <td className="p-2">
                              {l.locality === null ? "-" : l.locality}
                            </td>
                            <td className="p-2">
                              {l.coach === null ? "-" : l.coach}
                            </td>
                            <td className="p-2">
                              {l.coach2 === null ? "-" : l.coach2}
                            </td>
                            <td className="p-2">
                              {l.NPlayers === null ? "-" : l.NPlayers}
                            </td>
                            <td className="p-2">
                              {l.contactEmail === null ? "-" : l.contactEmail}
                            </td>
                            <td className="p-2">
                              {l.contactPhone === null ? "-" : l.contactPhone}
                            </td>
                            <td className="p-2">
                              <img
                                src="/images/other/edit.png"
                                width="15"
                                alt=""
                                onClick={() => funcionEditTeam(l.TeamId)}
                              />
                            </td>
                            <td className="p-1 cursor-pointer">
                              <Button
                                variant="outline-danger"
                                className="pt-0 pb-0 pl-3 pr-3"
                                size="sm"
                                onClick={() => funcionDeleteTeam(l.TeamId)}
                              >
                                Desactivar
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </WrapperTeams>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div className="row justify-content-center">
                    {props.leagueTeams.map(l => (
                      <CardDeck
                        key={l.TeamId}
                        className="m-1"
                        style={{ width: "18rem" }}
                      >
                        <Card style={borderCard}>
                          <WrapperCardBody>
                            <Card.Body>
                              <Card.Img
                                src={l.badge}
                                style={{ width: "4rem" }}
                              />
                              <Card.Title className="text-light">
                                {l.name === null ? "-" : l.name}
                              </Card.Title>
                            </Card.Body>
                          </WrapperCardBody>
                          <ListgroupCard>
                            <ListGroup className="list-group-flush text-left">
                              <ListGroupItem
                                className="p-2"
                                variant="secondary"
                              >
                                <b>Localidad: </b>
                                {l.locality === null ? "-" : l.locality}
                              </ListGroupItem>
                              <ListGroupItem className="p-2">
                                <b>Entrenador: </b>
                                {l.coach === null ? "-" : l.coach}
                              </ListGroupItem>
                              <ListGroupItem
                                className="p-2"
                                variant="secondary"
                              >
                                <b>2º Entrenador: </b>
                                {l.coach2 === null ? "-" : l.coach2}
                              </ListGroupItem>
                              <ListGroupItem className="p-2">
                                <b>Email: </b>
                                {l.contactEmail === null ? "-" : l.contactEmail}
                              </ListGroupItem>
                              <ListGroupItem
                                className="p-2"
                                variant="secondary"
                              >
                                <b>Teléfono: </b>
                                {l.contactPhone === null ? "-" : l.contactPhone}
                              </ListGroupItem>
                            </ListGroup>
                          </ListgroupCard>
                          {/* <Card.Footer>
                            <small className="text-muted">
                              Last updated 3 mins ago
                            </small>
                          </Card.Footer> */}
                        </Card>
                      </CardDeck>
                    ))}
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
            <div className="row justify-content-center mt-4 p-2 bg-leagueList">
              <div className="col-5">
                <InputGroup size="sm">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Nombre del equipo*
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={inputTeamName}
                    onChange={updateTeamName}
                  />
                </InputGroup>
              </div>
              <div className="col-3">
                <InputGroup size="sm">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Provincia*
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control as="select" onChange={updateTeamLocality}>
                    <option value="alava">Álava</option>
                    <option value="albacete">Albacete</option>
                    <option value="alicante">Alicante</option>
                    <option value="almeria">Almería</option>
                    <option value="asturias">Asturias</option>
                    <option value="avila">Ávila</option>
                    <option value="badajoz">Badajoz</option>
                    <option value="barcelona">Barcelona</option>
                    <option value="burgos">Burgos</option>
                    <option value="caceres">Cáceres</option>
                    <option value="cadiz">Cádiz</option>
                    <option value="cantabria">Cantabria</option>
                    <option value="castellon">Castellón</option>
                    <option value="ceuta">Ceuta</option>
                    <option value="ciudadreal">Ciudad Real</option>
                    <option value="cordoba">Córdoba</option>
                    <option value="cuenca">Cuenca</option>
                    <option value="girona">Girona</option>
                    <option value="laspalmas">Las Palmas</option>
                    <option value="granada">Granada</option>
                    <option value="guadalajara">Guadalajara</option>
                    <option value="guipuzcoa">Guipúzcoa</option>
                    <option value="huelva">Huelva</option>
                    <option value="huesca">Huesca</option>
                    <option value="illesbalears">Illes Balears</option>
                    <option value="jaen">Jaén</option>
                    <option value="acoruña">A Coruña</option>
                    <option value="larioja">La Rioja</option>
                    <option value="leon">León</option>
                    <option value="lleida">Lleida</option>
                    <option value="lugo">Lugo</option>
                    <option value="madrid">Madrid</option>
                    <option value="malaga">Málaga</option>
                    <option value="melilla">Melilla</option>
                    <option value="murcia">Murcia</option>
                    <option value="navarra">Navarra</option>
                    <option value="ourense">Ourense</option>
                    <option value="palencia">Palencia</option>
                    <option value="pontevedra">Pontevedra</option>
                    <option value="salamanca">Salamanca</option>
                    <option value="segovia">Segovia</option>
                    <option value="sevilla">Sevilla</option>
                    <option value="soria">Soria</option>
                    <option value="tarragona">Tarragona</option>
                    <option value="santacruztenerife">
                      Santa Cruz de Tenerife
                    </option>
                    <option value="teruel">Teruel</option>
                    <option value="toledo">Toledo</option>
                    <option value="valencia">Valencia</option>
                    <option value="valladolid">Valladolid</option>
                    <option value="vizcaya">Vizcaya</option>
                    <option value="zamora">Zamora</option>
                    <option value="zaragoza">Zaragoza</option>
                  </Form.Control>
                </InputGroup>
              </div>
              <div className="col-3">
                <InputGroup size="sm">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Entrenador*
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={inputTeamCoach}
                    onChange={updateTeamCoach}
                  />
                </InputGroup>
              </div>
            </div>
            <div className="row justify-content-center mt-4 p-2 bg-leagueList">
              <div className="col-5">
                <InputGroup size="sm">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      2º entrenador*
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={inputTeamCoach2}
                    onChange={updateTeamCoach2}
                  />
                </InputGroup>
              </div>
              <div className="col-3">
                <InputGroup size="sm">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Email*
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={inputTeamEmail}
                    onChange={updateTeamEmail}
                  />
                </InputGroup>
              </div>
              <div className="col-3">
                <InputGroup size="sm">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Teléfono*
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={inputTeamPhone}
                    onChange={updateTeamPhone}
                  />
                </InputGroup>
              </div>
              <div className="col-1 text-center align-self-center">
                <Button
                  variant="outline-success"
                  className="pt-0 pb-0 pl-3 pr-3"
                  onClick={sendTeam}
                >
                  Crear
                </Button>
                {fetchError && <div className="bg-danger">{fetchError}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal size="lg" show={showEditTeam} onHide={handleCloseEditTeam}>
        <EditTeamModal handleCloseEditTeam={handleCloseEditTeam} />
      </Modal>
      <Modal show={showDeleteTeam} onHide={() => null}>
        <DeleteTeamModal handleCloseDeleteTeam={handleCloseDeleteTeam} />
      </Modal>
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  leagueTeams: state.leagueTeams,
  DeleteLeagueId: state.TournamentId
});

const mapDispatchToProps = {
  DeleteLeagueId: action.deleteLeagueById,
  setLeagueTeams: action.setLeagueTeams,
  setLeagueId: action.setLeagueId,
  setTeamId: action.setTeamId,
  newTeam: action.newTeam
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueDetailsTeams);

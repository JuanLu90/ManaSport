//React´s Components
import React, { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
//Components made by Juanlu
import EditTeamModal from "./teamEditModal";
import DeleteTeamModal from "./teamDeleteModal";
//React Bootstrap
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
  Button,
  Alert,
  Accordion
} from "react-bootstrap";
//Interfaces
import { ITeam } from "../../interfaces";
//Redux
import * as action from "../../action";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers/reducers";
//Styled Components - CSSINJS
import styled from "styled-components";



//----------------------------------------------------



// ****** Styles *******
const Wrapper = styled.div`
  font-family: "Source Sans Pro", sans-serif;
`;
const WrapperCardBody = styled.div`
  background: rgba(35,41,128, 0.5);
`;
const WrapperFormAddTeam = styled.div`
  background: rgba(83, 92, 104, 0.8);
`;
const ListgroupCard = styled.thead`
  font-size: 0.8em;
`;
const borderCard = {
  border: "1px solid rgb(35, 41, 128)"
};
const ImgBadge = styled.img`
  height: 28px;
`;
const ImgBadgeCard = styled.img`
  height: 80px;
`;
const Tbody = styled.tbody`
  font-family: "Source Sans Pro", sans-serif;
`;
const SpanFieldTeam = styled.span`
  font-family: "Source Sans Pro", sans-serif;
`;
const SpanFieldRequired = styled.span`
  font-size: 0.8em;
  font-family: "Source Sans Pro", sans-serif;
`;
const DivDegraded = styled.div`
background: linear-gradient(50deg, rgba(255,193,7,0.9), rgba(255,193,7,0.5), rgba(43,47,56,0.7), rgba(43,47,56,0.4));
`;
// *********************


//Global Props
interface IProps { }
interface IPropsGlobal {
  leagueTeams: ITeam[];
  newTeam: (team: ITeam) => void;
  setLeagueTeams: (leagueTeams: ITeam[]) => void;
  setTeamId: (TeamId: number) => void;
  setLeagueId: (DeleteLeagueId: number) => void;
  DeleteLeagueId: number;
}

const LeagueDetailsTeams: React.FC<IProps & IPropsGlobal> = props => { //Function Component
  const token: any = localStorage.getItem("token"); //Token - Get the token stored from local storage
  const history = createBrowserHistory({});
  const path: any = history.location.pathname; //Get path content
  let pathTournamentId = path.split(["/"]).slice(-1)[0];

  useEffect(() => { //Fetch league´s teams to Redux every time token changes
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
        response.json().then(teams => props.setLeagueTeams(teams));
      }
    });
  }, [token, props.leagueTeams.length]);

  const [showEditTeam, setEditTeam] = useState(false); //Hook for edit team modal
  const handleCloseEditTeam = () => setEditTeam(false); //Close edit team modal
  const handleShowEditTeam = () => setEditTeam(true); //Open edit team modal

  //This function send the selected league ID to Redux and open the edit team modal
  function funcionEditTeam(DeleteLeagueId: any): any {
    handleShowEditTeam();
    props.setTeamId(DeleteLeagueId);
  }

  //Hooks to create a new team
  const [inputTeamName, setInputTeamName] = useState("");
  const [inputTeamLocality, setInputTeamLocality] = useState("Álava");
  const [inputTeamCoach, setInputTeamCoach] = React.useState("");
  const [inputTeamCoach2, setInputTeamCoach2] = React.useState("");
  const [inputTeamEmail, setInputTeamEmail] = React.useState("");
  const [inputTeamPhone, setInputTeamPhone] = React.useState("");

  //Onchanges to create a new team
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

  const [showDeleteTeam, setDeleteTeam] = useState(false); //Hook to delete a team
  const toggleEditTeam = React.useCallback(() => setDeleteTeam(s => !s), []); //Open and close delete team modal

  //This function send the selected league to Redux and open the delete team modal
  function funcionDeleteTeam(DeleteLeagueId: any): any {
    toggleEditTeam();
    props.setTeamId(DeleteLeagueId);
  }

  const [fetchError, setFetchError] = useState(""); //Hook to manage an error
  const [inputAlert, setInputAlert] = useState(true); //Hook to manage the error alert
  const [inputAddedTeam, setInputAddedTeam] = useState(false); //Hook to manage the alert if a team is added


  const sendTeam = () => { //Function Component
    const token = localStorage.getItem("token");  //Token - Get the token stored from local storage
    if (token) { // We need that token exits to decode it but React will fall down
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
                setInputAlert(true)
                setTimeout(() => setInputAlert(false), 3000)
              }
            });
          }
        })
        .catch(err => {
          console.log("Error," + err);
        });
    }
  };

  return (
    <>
      <Wrapper className="container-fluid text-dark">
        <div className="row mt-1">
          <div className="col p-3 m-1 text-center">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Nav
                variant="pills"
                className="flex-fill text-right justify-content-end mb-3"
              >
                <Nav.Item style={{ width: "2rem" }}>
                  <Nav.Link
                    eventKey="first"
                    className="pt-0 pl-0 pr-0 pb-1 bg-light border border-dark text-center"
                  >
                    <img src="/images/other/normal.png" width="20" alt="" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item style={{ width: "2rem" }}>
                  <Nav.Link
                    eventKey="second"
                    className="pt-0 pl-0 pr-0 pb-1 bg-light border border-dark text-center"
                  >
                    <img src="/images/other/cards.png" width="20" alt="" />
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>

                <div className="row justify-content-center pl-3 pr-3">
                  <DivDegraded className="col-10 p-2 h2 font-weight-bold text-left">
                    Equipos
                    </DivDegraded>
                </div>
                <Tab.Pane eventKey="first">
                  <div className="row justify-content-center">
                    <div className="col-10">
                      <Table responsive striped hover variant="dark" className="border border-secondary">
                        <thead>
                          <tr>
                            <th />
                            <th> NOMBRE </th>
                            <th> PROVINCIA </th>
                            <th> ENTRENADOR </th>
                            <th>2º ENTRENADOR</th>
                            <th>Nº JUGADORES</th>
                            <th>EMAIL</th>
                            <th>TELÉFONO</th>
                            <th />
                            <th />
                          </tr>
                        </thead>
                        <Tbody>
                          {props.leagueTeams.map(l => (
                            <tr key={l.TeamId}>
                              <td className="p-0 align-middle">
                              {l.badge === null ? <ImgBadge src="/images/badges-teams/default-badge.png" /> : <ImgBadge src={l.badge} />}
                              </td>
                              <td className="p-2 align-middle">
                                {l.name === null ? "-" : l.name}
                              </td>
                              <td className="p-2 align-middle">
                                {l.locality === null ? "-" : l.locality}
                              </td>
                              <td className="p-2 align-middle">
                                {l.coach === null ? "-" : l.coach}
                              </td>
                              <td className="p-2 align-middle">
                                {l.coach2 === null ? "-" : l.coach2}
                              </td>
                              <td className="p-2 align-middle">
                                {l.NPlayers === null ? "-" : l.NPlayers}
                              </td>
                              <td className="p-2 align-middle">
                                {l.contactEmail === null ? "-" : l.contactEmail}
                              </td>
                              <td className="p-2 align-middle">
                                {l.contactPhone === null ? "-" : l.contactPhone}
                              </td>
                              <td className="p-2 align-middle">
                                <img
                                  src="/images/other/edit.png"
                                  width="15"
                                  alt=""
                                  onClick={() => funcionEditTeam(l.TeamId)}
                                />
                              </td>
                              <td className="p-1">
                                <Button
                                  variant="danger"
                                  className="pt-0 pb-0 pl-3 pr-3"
                                  size="sm"
                                  onClick={() => funcionDeleteTeam(l.TeamId)}
                                >
                                  Eliminar
                              </Button>
                              </td>
                            </tr>
                          ))}
                        </Tbody>
                      </Table>
                    </div>
                  </div>
                  <Accordion defaultActiveKey="0" className="bg-transparent border-0">
                    <Card className="bg-transparent border-0">
                      <div className="row">
                        <div className="col text-light">
                          <Card.Header className="bg-transparent border-0">
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                              <Button
                                variant="warning"
                                // onClick={sendLeague}
                                className="font-weight-bold text-dark pl-3 pr-3 btn-sm"
                              >
                                <img src="/images/other/plus.png" className="mr-2 align-middle" width="17" alt="" />
                                <span className="align-middle">AÑADIR EQUIPO</span>
                              </Button>
                            </Accordion.Toggle>
                          </Card.Header>
                        </div>
                      </div>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body className="p-0">
                          <Wrapper className="container text-light p-3 mb-4">
                            <div className="row justify-content-center">
                              <WrapperFormAddTeam className="col-5 pt-1 pl-4 pr-4 pb-1 rounded">
                                <div className="row mt-4 mb-4">
                                  <div className="col-3 text-right">
                                    <img src="/images/football-badge.png" width="50" alt="" />
                                  </div>
                                  <div className="col-9 text-left align-self-center">
                                    <SpanFieldTeam className="h4">
                                      Formulario añadir equipo:
                                      </SpanFieldTeam>
                                  </div>
                                </div>
                                <hr className="bg-light" />
                                <div className="row mt-4">
                                  <div className="col text-left">
                                    <SpanFieldTeam>*Nombre del equipo:</SpanFieldTeam>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <input
                                      type="text"
                                      className="form-control form-control-sm bg-dark border border-secondary text-light"
                                      value={inputTeamName}
                                      onChange={updateTeamName}
                                    />
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col text-left">
                                    *Provincia:
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <Form.Control as="select" size="sm" onChange={updateTeamLocality} className="pt-0 pb-0 bg-dark border border-secondary text-light">
                                      <option value="Álava">Álava</option>
                                      <option value="Albacete">Albacete</option>
                                      <option value="Alicante">Alicante</option>
                                      <option value="Almeria">Almería</option>
                                      <option value="Asturias">Asturias</option>
                                      <option value="Ávila">Ávila</option>
                                      <option value="Badajoz">Badajoz</option>
                                      <option value="Barcelona">Barcelona</option>
                                      <option value="Burgos">Burgos</option>
                                      <option value="Cáceres">Cáceres</option>
                                      <option value="Cádiz">Cádiz</option>
                                      <option value="Cantabria">Cantabria</option>
                                      <option value="Castellón">Castellón</option>
                                      <option value="Ceuta">Ceuta</option>
                                      <option value="Ciudad Real">Ciudad Real</option>
                                      <option value="Córdoba">Córdoba</option>
                                      <option value="Cuenca">Cuenca</option>
                                      <option value="Girona">Girona</option>
                                      <option value="Las Palmas">Las Palmas</option>
                                      <option value="Granada">Granada</option>
                                      <option value="Guadalajara">Guadalajara</option>
                                      <option value="Guipúzcoa">Guipúzcoa</option>
                                      <option value="Huelva">Huelva</option>
                                      <option value="Huesca">Huesca</option>
                                      <option value="illesbalIlles Balearsears">Illes Balears</option>
                                      <option value="Jaén">Jaén</option>
                                      <option value="A Coruña">A Coruña</option>
                                      <option value="La Rioja">La Rioja</option>
                                      <option value="León">León</option>
                                      <option value="Lleida">Lleida</option>
                                      <option value="lugo">Lugo</option>
                                      <option value="Madrid">Madrid</option>
                                      <option value="Málaga">Málaga</option>
                                      <option value="Melilla">Melilla</option>
                                      <option value="Murcia">Murcia</option>
                                      <option value="Navarra">Navarra</option>
                                      <option value="Ourense">Ourense</option>
                                      <option value="Palencia">Palencia</option>
                                      <option value="Pontevedra">Pontevedra</option>
                                      <option value="Salamanca">Salamanca</option>
                                      <option value="Segovia">Segovia</option>
                                      <option value="Sevilla">Sevilla</option>
                                      <option value="Soria">Soria</option>
                                      <option value="Tarragona">Tarragona</option>
                                      <option value="Santa Cruz de Tenerife">
                                        Santa Cruz de Tenerife
                                      </option>
                                      <option value="Teruel">Teruel</option>
                                      <option value="Toledo">Toledo</option>
                                      <option value="Valencia">Valencia</option>
                                      <option value="Valladolid">Valladolid</option>
                                      <option value="vizcVizcayaaya">Vizcaya</option>
                                      <option value="Zamora">Zamora</option>
                                      <option value="Zaragoza">Zaragoza</option>
                                    </Form.Control>
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col text-left">
                                    Entrenador:
                                </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <input
                                      type="text"
                                      className="form-control form-control-sm bg-dark border border-secondary text-light"
                                      value={inputTeamCoach}
                                      onChange={updateTeamCoach}
                                    />
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col text-left">
                                    2º Entrenador:
                                </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <input
                                      type="text"
                                      className="form-control form-control-sm bg-dark border border-secondary text-light"
                                      value={inputTeamCoach2}
                                      onChange={updateTeamCoach2}
                                    />
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col text-left">
                                    Email:
                                </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <input
                                      type="text"
                                      className="form-control form-control-sm bg-dark border border-secondary text-light"
                                      value={inputTeamEmail}
                                      onChange={updateTeamEmail}
                                    />
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col text-left">
                                    Teléfono:
                                </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <input
                                      type="text"
                                      className="form-control form-control-sm bg-dark border border-secondary text-light"
                                      value={inputTeamPhone}
                                      onChange={updateTeamPhone}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-4 text-left mt-1">
                                    <SpanFieldRequired>* Campos obligatorios </SpanFieldRequired>
                                  </div>
                                </div>
                                <div className="row mt-4 mb-2">
                                  <div className="col text-center">
                                    <Button
                                      variant="warning"
                                      className="pt-1 pb-1 pl-4 pr-4 font-weight-bold"
                                      onClick={sendTeam}
                                    >
                                      Enviar
                                      {/* <img src="/images/other/send2.png" className="ml-2 align-middle" width="17" alt="" /> */}
                                    </Button>
                                  </div>
                                </div>
                                <div className="row mt-4">
                                  <div className="col">
                                    {(fetchError && inputAlert) &&
                                      <Alert variant="danger">
                                        {fetchError}
                                      </Alert>}
                                    {(inputAddedTeam && inputAlert) &&
                                      <Alert variant="success">
                                        Se ha añadido correctamente
                                      </Alert>}
                                  </div>
                                </div>
                              </WrapperFormAddTeam>
                            </div>
                          </Wrapper>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div className="row mx-auto pl-2 pr-2" style={{ width: "86%" }}>
                    {props.leagueTeams.map(l => (
                      <CardDeck
                        key={l.TeamId}
                        className="ml-0 mt-2 mb-2"
                        style={{ width: "17rem" }}
                      >
                        <Card style={borderCard} className="bg-transparent">
                          <WrapperCardBody>
                            <Card.Body>
                              <ImgBadgeCard src={l.badge} />
                              <Card.Title className="text-light mt-2">
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
                        </Card>
                      </CardDeck>
                    ))}
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </Wrapper>
      <Modal size="lg" show={showEditTeam} onHide={handleCloseEditTeam}>
        <EditTeamModal handleCloseEditTeam={handleCloseEditTeam} />
      </Modal>
      <Modal show={showDeleteTeam} onHide={() => null}>
        <DeleteTeamModal handleCloseDeleteTeam={toggleEditTeam} />
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

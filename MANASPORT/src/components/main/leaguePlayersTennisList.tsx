//React´s Components
import React, { useEffect, useState } from "react";
//Components made by Juanlu
import EditPlayerModal from "./playerEditModal";
import DeletePlayerModal from "./playerDeleteModal";
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
  Button,
  Accordion,
  Alert
} from "react-bootstrap";
//Interfaces
import { ITeam, IPlayer } from "../../interfaces";
//Redux
import * as action from "../../action";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers/reducers";
//Styled Components - CSSINJS
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";

//******** STYLES - STYLED-COMPONENTS - CCSSINJS *********
const Wrapper = styled.div`
  font-family: "Source Sans Pro", sans-serif;
`;
const Wrapper2 = styled.div`
  min-height: 400px;
`;
const borderCard = {
  border: "1px solid rgb(35, 41, 128)"
};
const WrapperCardBody = styled.div`
  background: rgba(35, 41, 128, 0.5);
`;
const WrapperFormAddTeam = styled.div`
  background: rgba(83, 92, 104, 0.8);
`;
const ListgroupCard = styled.span`
  font-size: 0.8em;
`;
const TdMatchdayBig = styled.td`
  width: 15%;
`;
const TdMatchdaySmall = styled.td`
  width: 10%;
`;
const DivDegraded = styled.div`
  background: linear-gradient(
    50deg,
    rgba(255, 193, 7, 0.9),
    rgba(255, 193, 7, 0.5),
    rgba(43, 47, 56, 0.7),
    rgba(43, 47, 56, 0.4)
  );
`;
const ImgBadgeCard = styled.img`
  height: 80px;
`;
const ImgBadgeCardTitle = styled.img`
  height: 35px;
`;
const SpanFieldRequired = styled.span`
  font-size: 0.8em;
  font-family: "Source Sans Pro", sans-serif;
`;
const SpanFieldTeam = styled.span`
  font-family: "Source Sans Pro", sans-serif;
`;
const Row = styled.div`
  min-height: 40vh;
`;

//----------------------------------------------------


//Props & Global Props
interface IProps { }
interface IPropsGlobal {
  leagueTeams: ITeam[];
  setLeagueTeams: (leagueTeams: ITeam[]) => void;
  teamPlayers: IPlayer[];
  setTeamPlayers: (teamPlayers: IPlayer[]) => void;
  setTeamId: (TeamId: number) => void;
  setLeagueId: (DeleteLeagueId: number) => void;
  DeleteLeagueId: number;
  setPlayerId: (PlayerId: number) => void;
  newPlayer: (player: IPlayer) => void;
}

const LeagueDetailsPlayersTennis: React.FC<IProps & IPropsGlobal> = props => {   //Function Component
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
    props.teamPlayers.sort(compareName);
  } else {
    props.teamPlayers.sort(compareNameReverse);
  }

  const [valueTeamId, setValueTeamId] = useState(-1); //Hook the team ID to show the team players

  const [showEditPlayer, setEditPlayer] = useState(false); //Hook for edit player modal
  const handleCloseEditPlayer = () => setEditPlayer(false); // Close edit player modal
  const handleShowEditPlayer = () => setEditPlayer(true); // Show edit player modal

  //This function send the selected team ID to Redux and open the edit team modal
  function funcionEditPlayer(DeleteLeagueId: any): any {
    handleShowEditPlayer();
    props.setPlayerId(DeleteLeagueId);
  }

  const [showDeletePlayer, setDeletePlayer] = useState(false); //Hook to delete a team
  const toggleEditPlayer = React.useCallback(
    () => setDeletePlayer(s => !s),
    []
  ); //Open and close delete team modal

  function funcionDeletePlayer(DeleteLeagueId: any): any {
    toggleEditPlayer();
    props.setPlayerId(DeleteLeagueId);
  }

  const [fetchError, setFetchError] = useState(""); //Hook to manage an error
  const [inputAlert, setInputAlert] = useState(true); //Hook to manage the error alert

  //Hooks to create a new player
  const [inputPlayerName, setInputPlayerName] = useState("");
  const [inputPlayerSurname, setInputPlayerSurname] = useState("");
  const [inputPlayerAge, setInputPlayerAge] = React.useState("");
  const [inputPlayerTeam, setInputPlayerTeam] = React.useState("");

  //Onchanges to create a new player
  const updatePlayerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPlayerName(event.currentTarget.value);
  };
  const updatePlayerSurname = (event: any) => {
    setInputPlayerSurname(event.currentTarget.value);
  };
  const updatePlayerAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPlayerAge(event.currentTarget.value);
  };
  const updatePlayerTeam = (event: any) => {
    setInputPlayerTeam(event.currentTarget.value);
  };

  const [updateSetTeamPlayers, setUpdateSetTeamPlayers] = React.useState(false);
  const toggleSetTeamPlayers = React.useCallback(
    () => setUpdateSetTeamPlayers(s => !s),
    []
  ); //Open and close alert league name invalid

  useEffect(() => {
    //Fetch team players to redux every time the team ID changes
    fetch("http://localhost:8080/api/teams/teamPlayers/" + valueTeamId, {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
        // Authorization: "Bearer " + props.token
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(players => props.setTeamPlayers(players));
      }
    });
  }, [valueTeamId, props.teamPlayers.length, updateSetTeamPlayers]);

  const currentTeam = props.leagueTeams.find(u => u.TeamId === valueTeamId);

  const [alertWrongPlayer, setAlertWrongPlayer] = useState(false);
  const toggleWrongPlayer = React.useCallback(
    () => setAlertWrongPlayer(s => !s),
    []
  ); //Open and close alert player name invalid

  const [alertRightPlayer, setAlertRightPlayer] = useState(false);
  const toggleRightPlayer = React.useCallback(
    () => setAlertRightPlayer(s => !s),
    []
  ); //Open and close alert right player name



  const randomNumber = () => {
    let number = Math.floor(Math.random() * (1 - 51)) + 51;
    return number;
  }




  const token = localStorage.getItem("token"); //Token - Get the token stored from local storage

  const sendPlayer = () => {

    //Function Component
    if (
      inputPlayerTeam === "" ||
      (inputPlayerName.length < 3 || inputPlayerName.length > 25)
    ) {
      toggleWrongPlayer();
      setTimeout(() => toggleWrongPlayer(), 5000);
    } else {
      if (token) {
        // We need that token exits to decode it but React will fall down
        fetch("http://localhost:8080/api/players/newPlayer", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            name: inputPlayerName === "" ? null : inputPlayerName,
            surname: inputPlayerSurname === "" ? null : inputPlayerSurname,
            age: inputPlayerAge === "" ? null : inputPlayerAge,
            TeamId: inputPlayerTeam
          })
        })
          .then(response => {
            if (response.ok) {
              response.json().then(p => {
                props.newPlayer(p);
                toggleRightPlayer();
                setTimeout(() => toggleRightPlayer(), 5000);
                setInputPlayerName("");
                setInputPlayerSurname("");
                setInputPlayerAge("");
              });
            } else {
              response.json().then(({ e }) => {
                if (e === 1062) {
                  setFetchError("El nombre del jugador ya existe");
                  setInputAlert(true);
                  setTimeout(() => setInputAlert(false), 3000);
                }
              });
            }
          })
          .catch(err => {
            console.log("Error," + err);
          });
      }
    }
  };

  return (
    <>
      {/* '<> ... </>' used to send an only one container */}
      <Wrapper className="container-fluid text-dark">
        <div className="row mt-1 ">
          <div className="col pt-3 pl-3 pr-3 m-1 text-center">
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
              <div className="row justify-content-center pl-3 pr-3">
                <DivDegraded className="col-10 p-2 h2 font-weight-bold text-left">
                  Jugadores
                </DivDegraded>
              </div>
              <Row className="row justify-content-center mb-4">
                <div className="col-10 justify-content-center">
                  <Scrollbars autoHide>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <Wrapper2 className="row ">
                          <Table
                            responsive
                            striped
                            hover
                            variant="dark"
                            className="m-0 border-0"
                          >
                            <thead>
                              <tr>
                                <th> </th>
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
                                <th> APELLIDOS </th>
                                <th> EDAD </th>
                                {token &&
                                  <>
                                    <th />
                                    <th />
                                  </>
                                }

                              </tr>
                            </thead>
                            <tbody>
                              {props.teamPlayers.map(p => (
                                <tr key={p.PlayerId}>
                                  <TdMatchdaySmall className="p-0 align-middle">
                                    <ImgBadgeCardTitle src={`/images/profile/player-${randomNumber()}.png`} className="align-middle" />                                  </TdMatchdaySmall>
                                  <TdMatchdayBig className="p-2">
                                    {p.name === null ? "-" : p.name}
                                  </TdMatchdayBig>
                                  <TdMatchdayBig className="p-2">
                                    {p.surname === null ? "-" : p.surname}
                                  </TdMatchdayBig>
                                  <TdMatchdaySmall className="p-2">
                                    {p.age === null ? "-" : p.age}
                                  </TdMatchdaySmall>
                                  {token &&
                                    <>
                                      <TdMatchdaySmall className="p-2">
                                        <img
                                          src="/images/other/edit.png"
                                          width="15"
                                          alt=""
                                          onClick={() =>
                                            funcionEditPlayer(p.PlayerId)
                                          }
                                          style={{ cursor: "pointer" }}
                                        />
                                      </TdMatchdaySmall>
                                      <TdMatchdayBig className="p-1">
                                        <Button
                                          variant="danger"
                                          className="pt-0 pb-0 pl-3 pr-3"
                                          size="sm"
                                          onClick={() =>
                                            funcionDeletePlayer(p.PlayerId)
                                          }
                                        >
                                          Eliminar
                                    </Button>
                                      </TdMatchdayBig>
                                    </>
                                  }

                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Wrapper2>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <div className="row justify-content-center mt-3 overflow-auto">
                          {props.teamPlayers.map(p => (
                            <CardDeck
                              key={p.PlayerId}
                              className="m-1"
                              style={{ width: "13rem" }}
                            >
                              <Card
                                style={borderCard}
                                className="bg-transparent m-2"
                              >
                                <WrapperCardBody>
                                  <Card.Body className="p-2">
                                    <ImgBadgeCard src={`/images/profile/player-${randomNumber()}.png`} />
                                    <Card.Title className="text-light mt-2">
                                      {p.name === null ? "-" : p.name} <br />
                                      {p.surname === null ? "-" : p.surname}
                                    </Card.Title>
                                  </Card.Body>
                                </WrapperCardBody>
                                <ListgroupCard>
                                  <ListGroup className="list-group-flush text-left">
                                    <ListGroupItem className="p-2">
                                      <b className="mr-1">Equipo: </b>
                                      {currentTeam &&
                                        (currentTeam.name === null
                                          ? "-"
                                          : currentTeam.name)}
                                    </ListGroupItem>
                                    <ListGroupItem
                                      className="p-2"
                                      variant="secondary"
                                    >
                                      <b className="mr-1">Edad: </b>
                                      {p.age === null ? "-" : p.age}
                                    </ListGroupItem>
                                  </ListGroup>
                                </ListgroupCard>
                              </Card>
                            </CardDeck>
                          ))}
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Scrollbars>
                </div>
              </Row>
            </Tab.Container>
          </div>
        </div>
      </Wrapper>
      {token &&
        <Accordion defaultActiveKey="0" className="bg-transparent border-0">
          <Card className="bg-transparent border-0">
            <div className="row">
              <div className="col text-center text-light">
                <Card.Header className="bg-transparent border-0 mb-4">
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    <Button
                      variant="warning"
                      // onClick={sendLeague}
                      className="font-weight-bold text-dark pl-3 pr-3 btn-sm"
                    >
                      <img
                        src="/images/other/plus.png"
                        className="mr-2 align-middle"
                        width="17"
                        alt=""
                      />
                      <span className="align-middle">AÑADIR JUGADOR</span>
                    </Button>
                  </Accordion.Toggle>
                </Card.Header>
              </div>
            </div>
            <Accordion.Collapse eventKey="1">
              <Card.Body className="p-0">
                <Wrapper className="container text-light p-3 mb-1">
                  <div className="row justify-content-center">
                    <WrapperFormAddTeam className="col-5 pt-1 pl-4 pr-4 pb-1 rounded">
                      <div className="row mt-4 mb-4">
                        <div className="col-3 text-right">
                          <img
                            src="/images/football-player.png"
                            width="50"
                            alt=""
                          />
                        </div>
                        <div className="col-9 align-self-center">
                          <SpanFieldTeam className="h4">
                            Formulario añadir jugador:
                        </SpanFieldTeam>
                        </div>
                      </div>
                      <hr className="bg-light" />
                      <hr className="bg-secondary" />
                      <div className="row mt-3">
                        <div className="col text-left">
                          <SpanFieldTeam>*Nombre del jugador:</SpanFieldTeam>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control form-control-sm bg-dark border border-secondary text-light"
                            value={inputPlayerName}
                            onChange={updatePlayerName}
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">Apellidos:</div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control form-control-sm bg-dark border border-secondary text-light"
                            value={inputPlayerSurname}
                            onChange={updatePlayerSurname}
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">Edad:</div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control form-control-sm bg-dark border border-secondary text-light"
                            value={inputPlayerAge}
                            onChange={updatePlayerAge}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4 text-left mt-1">
                          <SpanFieldRequired>
                            * Campos obligatorios
                        </SpanFieldRequired>
                        </div>
                      </div>
                      {alertWrongPlayer && (
                        <div className="row justify-content-center mt-4">
                          <div className="col text-center">
                            <Alert variant="danger" className="p-2">
                              <img
                                src="/images/other/cancel.png"
                                width="35"
                                alt=""
                                className="mr-3"
                              />
                              <span>
                                <b>
                                  Error, comprueba que el jugador cumple los
                                  siguientes requisitos:
                              </b>
                              </span>
                              <ul className="text-left">
                                <li>Debe de seleccionar un equipo.</li>
                                <li>
                                  El nombre del jugador debe contener entre 4 y 25
                                  caracteres.
                              </li>
                              </ul>
                            </Alert>
                          </div>
                        </div>
                      )}
                      {alertRightPlayer && (
                        <div className="row justify-content-center mt-4">
                          <div className="col text-center">
                            <Alert variant="success" className="p-2">
                              <img
                                src="/images/other/send.png"
                                width="35"
                                alt=""
                                className="mr-3"
                              />
                              <span>
                                <b> Jugador añadido correctamente</b>
                              </span>
                            </Alert>
                          </div>
                        </div>
                      )}
                      <div className="row mt-4 mb-2">
                        <div className="col text-center">
                          <Button
                            variant="warning"
                            className="pt-1 pb-1 pl-4 pr-4 font-weight-bold"
                            onClick={sendPlayer}
                          >
                            Enviar
                        </Button>
                        </div>
                      </div>
                    </WrapperFormAddTeam>
                  </div>
                </Wrapper>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      }
      <Modal show={showEditPlayer} onHide={handleCloseEditPlayer}>
        <EditPlayerModal
          handleCloseEditPlayer={handleCloseEditPlayer}
          toggleSetTeamPlayers={toggleSetTeamPlayers}
        />
      </Modal>
      <Modal show={showDeletePlayer} onHide={() => null}>
        <DeletePlayerModal
          handleCloseDeletePlayer={toggleEditPlayer}
          toggleSetTeamPlayers={toggleSetTeamPlayers}
        />
      </Modal>
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  leagueTeams: state.leagueTeams,
  DeleteLeagueId: state.TournamentId,
  teamPlayers: state.teamPlayers
});

const mapDispatchToProps = {
  DeleteLeagueId: action.deleteLeagueById,
  setLeagueTeams: action.setLeagueTeams,
  setTeamPlayers: action.setTeamPlayers,
  setLeagueId: action.setLeagueId,
  setTeamId: action.setTeamId,
  setPlayerId: action.setPlayerId,
  newPlayer: action.newPlayer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueDetailsPlayersTennis);

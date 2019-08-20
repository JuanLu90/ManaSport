//React´s Components
import React, { useEffect, useState } from "react";
//Components made by Juanlu
import EditPlayerModal from "./editPlayerModal";
//React Bootstrap
import {
  Table,
  Tab,
  Nav,
  Card,
  CardDeck,
  ListGroupItem,
  ListGroup,
  Modal
} from "react-bootstrap";
//Interfaces
import { ITeam, IPlayer } from "../../interfaces";
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
const borderCard = {
  border: '1px solid rgb(35, 41, 128)'
};
const WrapperListTeams = styled.div`
  background: #232980;
  height: 30px;
  &:hover {
    background-color: #50559A;
    color: white;
  }
  cursor: pointer;
`;
const WrapperCardBody = styled.div`
  background: rgba(35,41,128, 0.5);
`;
const SpanNameTeam = styled.span`
  font-size: 0.9em;
`;
const ListgroupCard = styled.span`
  font-size: 0.7em;
`;
const TdMatchdayBig = styled.td`
  width: 20%;
`;
const TdMatchdaySmall = styled.td`
  width: 10%;
`;
const DivDegraded = styled.div`
  background: linear-gradient(50deg, rgba(255,193,7,0.9), rgba(255,193,7,0.5), rgba(43,47,56,0.7), rgba(43,47,56,0.4));
`;
const ImgBadge = styled.img`
  height: 40px;
`;
const ImgBadgeCard = styled.img`
  height: 80px;
`;
// *********************


//Global Props
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
}

const LeagueDetailsPlayers: React.FC<IProps & IPropsGlobal> = props => { //Function Component
  const [valueTeamId, setValueTeamId] = useState(-1); //Hook the team ID to show the team players


  const [showEditPlayer, setEditPlayer] = useState(false); //Hook for edit player modal
  const handleCloseEditPlayer = () => setEditPlayer(false); // Close edit player modal
  const handleShowEditPlayer = () => setEditPlayer(true); // Show edit player modal

  //This function send the selected team ID to Redux and open the edit team modal
  function funcionEditPlayer(DeleteLeagueId: any): any {
    handleShowEditPlayer();
    props.setPlayerId(DeleteLeagueId);
  }

 

  useEffect(() => { //Fetch team players to redux every time the team ID changes
    fetch(
      "http://localhost:8080/api/teams/teamPlayers/" +
      valueTeamId,
      {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
          // Authorization: "Bearer " + props.token
        }
      }
    ).then(response => {
      if (response.ok) {
        response.json().then(players => props.setTeamPlayers(players));
      }
    });
  }, [valueTeamId]);

  const currentTeam = props.leagueTeams.find(
    u => u.TeamId === valueTeamId
  );


  return (
    <> {/* '<> ... </>' used to send an only one container */}
      <Wrapper className="container-fluid text-dark">
        <div className="row mt-1 ">
          <div className="col p-3 m-1 text-center bg-leagueList">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Nav
                variant="pills"
                className="flex-fill text-right justify-content-end mb-3">
                <Nav.Item style={{ width: "2rem" }}>
                  <Nav.Link
                    eventKey="first"
                    className="pt-0 pl-0 pr-0 pb-1 bg-light border border-dark text-center">
                    <img src="/images/other/normal.png" width="20" alt="" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item style={{ width: "2rem" }}>
                  <Nav.Link
                    eventKey="second"
                    className="pt-0 pl-0 pr-0 pb-1 bg-light border border-dark text-center">
                    <img src="/images/other/cards.png" width="20" alt="" />
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div className="row justify-content-center pl-3 pr-3">
                    <DivDegraded className="col-10 p-2 h2 font-weight-bold text-left">
                      Jugadores
                    </DivDegraded>
                  </div>
                  <div className="row justify-content-center mb-4">
                    <div className="col-2 pl-2 pr-0">
                      {props.leagueTeams.map(l => (
                        <Card style={borderCard} className="mb-1 ml-1 mr-1" onClick={() => setValueTeamId(l.TeamId)} key={l.TeamId}>
                          <WrapperListTeams className="pl-3 pr-3">
                            <tr>
                              <td> <Card.Img src={l.badge} style={{ width: "1rem", marginRight: "7px" }} /></td>
                              <td className="text-light">
                                <SpanNameTeam>{l.name === null ? "-" : l.name}</SpanNameTeam>
                              </td>
                            </tr>
                          </WrapperListTeams>
                        </Card>
                      ))}
                    </div>
                    <div className="col-8 justify-content-center">
                      <div className="row bg-secondary p-2">
                        <div className="col">
                          { currentTeam ? (
                              <div className="col text-center text-light h3 p-0 m-0">
                                <ImgBadge src={currentTeam.badge} alt=""/>
                                <span className="ml-3 align-middle">{currentTeam.name}</span> 
                              </div>
                            ) : "Selecciona un equipo"}
                        </div>
                          
                      </div>
                      <div className="row border border-secondary">
                        <Table responsive striped hover variant="dark" className="m-0">
                          <thead>
                            <tr>
                              <th> </th>
                              <th> NOMBRE </th>
                              <th> APELLIDOS </th>
                              <th> EDAD </th>
                              <th> POSICIÓN</th>
                              <th> GOLES </th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                            {props.teamPlayers.map(p => (
                              <tr key={p.PlayerId}>
                                <TdMatchdaySmall className="p-0 align-middle">
                                  <img src={p.image} width="24" />
                                </TdMatchdaySmall>
                                <TdMatchdayBig className="p-2">
                                  {p.name === null ? "-" : p.name}
                                </TdMatchdayBig>
                                <TdMatchdayBig className="p-2">
                                  {p.surname === null ? "-" : p.surname}
                                </TdMatchdayBig>
                                <TdMatchdaySmall className="p-2">
                                  {p.age === null ? "-" : p.age}
                                </TdMatchdaySmall>
                                <TdMatchdayBig className="p-2">
                                  {p.position === null ? "-" : p.position}
                                </TdMatchdayBig>
                                <TdMatchdaySmall className="p-2">
                                  {p.goals === null ? "-" : p.goals}
                                </TdMatchdaySmall>
                                <TdMatchdaySmall className="p-2">
                                  <img
                                    src="/images/other/edit.png"
                                    width="15"
                                    alt=""
                                    onClick={() => funcionEditPlayer(p.PlayerId)}
                                  />
                                </TdMatchdaySmall>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                <div className="row justify-content-center">
                    {props.leagueTeams.map(l => (
                      <CardDeck
                        key={l.TeamId}
                        className="m-1"
                        style={{ width: "18rem" }}
                      >
                        <Card style={borderCard} className="bg-transparent">
                          <WrapperCardBody>
                            <Card.Body>
                              <ImgBadgeCard src={l.badge} />
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
          </div>
        </div>
      </Wrapper>
      <Modal size="lg" show={showEditPlayer} onHide={handleCloseEditPlayer}>
        <EditPlayerModal handleCloseEditPlayer={handleCloseEditPlayer} />
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
  setPlayerId: action.setPlayerId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueDetailsPlayers);

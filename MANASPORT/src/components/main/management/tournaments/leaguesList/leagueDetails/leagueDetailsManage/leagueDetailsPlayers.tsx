import React, { useEffect, useState } from "react";
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
import { ITeam, IPlayer } from "../../../../../../../interfaces";
import * as action from "../../../../../../../action";
import { connect } from "react-redux";
import { IGlobalState } from "../../../../../../../reducers/reducers";
import EditPlayerModal from "../../../players/editPlayerModal/editPlayerModal";
import styled from "styled-components";

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

const LeagueDetailsPlayers: React.FC<IProps & IPropsGlobal> = props => {

  const [valueTeamId, setValueTeamId] = useState(1);

  useEffect(() => {
    //FETCH LEAGUE´S TEAMS TO REDUX
    // const decoded: any = jwt.decode(token);
    // const UserId: number = decoded.UserId;
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
        response.json().then(result => props.setTeamPlayers(result));
      }
    });
  }, [valueTeamId]);

  const [showEditPlayer, setEditPlayer] = useState(false);
  const handleCloseEditPlayer = () => setEditPlayer(false);
  const handleShowEditPlayer = () => setEditPlayer(true);

  function funcionEditPlayer(DeleteLeagueId: any): any {
    handleShowEditPlayer();
    props.setPlayerId(DeleteLeagueId);
    console.log(DeleteLeagueId)
  }


  // ****** Styles *******
  const WrapperTeams = styled.div`
    box-shadow: 2px 2px 2px 2px #888888;
  `
  const borderCard = {
    border: '1px solid rgb(35, 41, 128)'
  };
  //     background: #D63A3A
  const WrapperCardBody = styled.div`
    background: #232980;
    height: 30px;
    &:hover {
      background-color: #50559A;
      color: white;
    }
  `
  const SpanNameTeam = styled.span`
    font-size: 0.9em;
  `
  const ListgroupCard = styled.span`
  font-size: 0.6em;
  `
  // *********************

  return (
    <>
      <div className="container-fluid text-dark">
        <div className="row">JUGADORES</div>
        <div className="row mt-1 ">
          <div className="col p-3 m-1 text-center bg-leagueList">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Nav
                variant="pills"
                className="flex-fill text-right justify-content-end mb-3">
                <Nav.Item style={{ width: "2rem" }}>
                  <Nav.Link
                    eventKey="first"
                    className="pt-0 pl-0 pr-0 pb-1 bg-light text-center">
                    <img src="/images/other/normal.png" width="20" alt="" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item style={{ width: "2rem" }}>
                  <Nav.Link
                    eventKey="second"
                    className="pt-0 pl-0 pr-0 pb-1 bg-light text-center">
                    <img src="/images/other/cards.png" width="20" alt="" />
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div className="row justify-content-center">
                    <div className="row w-75 justify-content-center mb-4">
                      {props.leagueTeams.map(l => (
                        <Card style={borderCard} className="m-1" onClick={() => setValueTeamId(l.TeamId)} key={l.TeamId}>
                          <WrapperCardBody className="pl-2 pr-2">
                            <tr>
                              <td> <Card.Img src={l.badge} style={{ width: "1rem", marginRight: "7px" }} /></td>
                              <td className="text-light">
                                <SpanNameTeam>{l.name === null ? "-" : l.name}</SpanNameTeam>
                              </td>
                            </tr>
                          </WrapperCardBody>
                        </Card>
                      ))}
                    </div>
                    <WrapperTeams className="row w-100">
                      <Table responsive striped hover>
                        <thead className="style-tablehead-leagueList">
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
                              <td className="p-0 align-middle">
                                <img src={p.image} width="24" />
                              </td>
                              <td className="p-2">
                                {p.name === null ? "-" : p.name}
                              </td>
                              <td className="p-2">
                                {p.surname === null ? "-" : p.surname}
                              </td>
                              <td className="p-2">
                                {p.age === null ? "-" : p.age}
                              </td>
                              <td className="p-2">
                                {p.position === null ? "-" : p.position}
                              </td>
                              <td className="p-2">
                                {p.goals === null ? "-" : p.goals}
                              </td>
                              <td className="p-2">
                                <img
                                  src="/images/other/edit.png"
                                  width="15"
                                  alt=""
                                  onClick={() => funcionEditPlayer(p.PlayerId)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </WrapperTeams>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div className="row justify-content-center">
                    {props.leagueTeams.map(l => (
                      <CardDeck
                        key={l.TeamId}
                        className="m-1"
                        style={{ width: "18rem" }}>
                        <Card style={borderCard}>
                          <WrapperCardBody>
                            <Card.Body>
                              <Card.Img src={l.badge} style={{ width: "4rem" }} />
                              <Card.Title className="text-light">
                                {l.name === null ? "-" : l.name}
                              </Card.Title>
                            </Card.Body>
                          </WrapperCardBody>
                          <ListgroupCard>
                            <ListGroup className="list-group-flush text-left">
                              <ListGroupItem className="p-2" variant="secondary">
                                <b>Localidad: </b>
                                {l.locality === null ? "-" : l.locality}
                              </ListGroupItem>
                              <ListGroupItem className="p-2">
                                <b>Entrenador: </b>
                                {l.coach === null ? "-" : l.coach}
                              </ListGroupItem>
                              <ListGroupItem className="p-2" variant="secondary">
                                <b>2º Entrenador: </b>
                                {l.coach2 === null ? "-" : l.coach2}
                              </ListGroupItem>
                              <ListGroupItem className="p-2">
                                <b>Email: </b>
                                {l.contactEmail === null ? "-" : l.contactEmail}
                              </ListGroupItem>
                              <ListGroupItem className="p-2" variant="secondary">
                                <b>Teléfono: </b>
                                {l.contactPhone === null ? "-" : l.contactPhone}
                              </ListGroupItem>
                            </ListGroup>
                          </ListgroupCard>
                          <Card.Footer>
                            <small className="text-muted">
                              Last updated 3 mins ago
                            </small>
                          </Card.Footer>
                        </Card>
                      </CardDeck>
                    ))}
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </div>
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

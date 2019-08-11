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
import { ITeam } from "../../../../../../../interfaces";
import * as action from "../../../../../../../action";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import { IGlobalState } from "../../../../../../../reducers/reducers";
import EditTeamModal from "../../../teams/editTeamModal/editTeamModal";
import styled from "styled-components";

interface IProps { }

interface IPropsGlobal {
  leagueTeams: ITeam[];
  setLeagueTeams: (leagueTeams: ITeam[]) => void;
  setTeamId: (TeamId: number) => void;
  setLeagueId: (DeleteLeagueId: number) => void;
  DeleteLeagueId: number;
}

const LeagueDetailsManage: React.FC<IProps & IPropsGlobal> = props => {
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

  const currentTeam = props.leagueTeams.find(
    u => u.TeamId === props.DeleteLeagueId
  );
  //Evita que 'league' sea undefined
  //   if (!currentTeam) {
  //     return null;
  //   }


  // ****** Styles *******
  const WrapperTeams = styled.div`
    box-shadow: 2px 2px 2px 2px #888888;
  `
  const borderCard = {
    border: '1px solid rgb(35, 41, 128)'
  };

  const WrapperCardBody = styled.div`
    background: #232980;
  `
  const ListgroupCard = styled.thead`
    font-size: 0.8em;
  `

  // *********************

  return (
    <>
      <div className="container-fluid text-dark">
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
                          <th> LOCALIDAD </th>
                          <th> ENTRENADOR </th>
                          <th>2º ENTRENADOR</th>
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
      </div>
      <Modal size="lg" show={showEditTeam} onHide={handleCloseEditTeam}>
        <EditTeamModal handleCloseEditTeam={handleCloseEditTeam} />
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
  setTeamId: action.setTeamId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueDetailsManage);

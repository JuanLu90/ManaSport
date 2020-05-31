// DEPENDENCES
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { tournamentsByUserAction, teamsTournamentAction, newTeamAction, deleteTeamAction } from "../../../redux/actions/tournamentActions";
import QualificationTournament from './QualificationTournament';
import ResultsTournament from './ResultsTournament';
import styled from "styled-components";
import { IGlobalState } from '../../../redux/reducers/reducers';
import { createBrowserHistory } from "history";
import {
  Table,
  Tab,
  Nav,
  Button
} from "react-bootstrap";
import DeleteTeamModal from '../../Generic/Modals/DeleteTeamModal';
import CreateTeamModal from '../../Generic/Modals/CreateTeamModal';
import { getUserLocalStorage } from '../../../utils/localStorageUtil';

const RowInfoTournament = styled.div`
  font-size: 0.8rem;
`;

// ****** Styles *******
const WrapperCardBody = styled.div`
  background: rgba(35, 41, 128, 0.5);
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
const SpanFieldRequired = styled.span`
  font-size: 0.8em;
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

interface IProps {
  tournamentsByUserAction: any;
  teamsTournamentAction: any;
  deleteTeamAction: any;
  newTeamAction: any;
  tournaments: any;
  qualification: any;
  teams: any;
  matches: any;
  matchUpdated: any;
}

const TournamentInfo: React.FC<IProps> = ({
  tournamentsByUserAction,
  teamsTournamentAction,
  deleteTeamAction,
  newTeamAction,
  tournaments,
  teams,
  qualification,
  matches,
  matchUpdated
}) => {

  const history = createBrowserHistory({});
  const path: any = history.location.pathname;
  let tournamentId = Number(path.split(["/"]).slice(-1)[0]);

  const initialFilters = {
    UserId: getUserLocalStorage().id,
    name: '',
    sport: '',
    isStarted: ''
  };

  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showDeleteTeamModal, setShowDeleteTeamModal] = useState(false);
  const [infoDeleteTeam, setInfoDeleteTeam] = useState({});

  useEffect(() => {
    tournamentsByUserAction(initialFilters);
    teamsTournamentAction(tournamentId);
  }, []);

  const currentTournament = tournaments.filter((tournament: any) => tournaments.length > 0 && tournament.Id === tournamentId);

  const sendInfoDeleteTeam = (teamId: any, teamName: any) => {
    setInfoDeleteTeam({ id: teamId, name: teamName })
    setShowDeleteTeamModal(true);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col m-3 text-center text-white h3">{currentTournament[0] && currentTournament[0].name}</div>
        </div>
        {currentTournament[0] && currentTournament[0].isStarted ?
          <RowInfoTournament className="row">
            <div className="col-5">
              <QualificationTournament
                tournamentId={tournamentId}
                qualification={qualification}
                matchUpdated={matchUpdated}
              />
            </div>
            <div className="col-7">
              <ResultsTournament
                tournamentId={tournamentId}
                matches={matches}
                matchUpdated={matchUpdated}
              />
            </div>
          </RowInfoTournament>
          :
          <div>
            <div className="text-white">
              Antes de nada debes crear los equipos que van a formar parte de la competición.
            </div>
            <div className="container text-dark">
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
                        <DivDegraded className="col p-2 h2 font-weight-bold text-left">
                          Equipos
                        </DivDegraded>
                      </div>
                      <Tab.Pane eventKey="first">
                        <div className="row justify-content-center">
                          <div className="col">
                            <Table
                              responsive
                              striped
                              hover
                              variant="dark"
                              className="border border-secondary"
                            >
                              <thead>
                                <tr>
                                  <th />
                                  <th>
                                    NOMBRE
                                    <img
                                      src="/images/other/sort.png"
                                      className="ml-2 mb-1"
                                      width="15"
                                      style={{ cursor: "pointer" }}
                                      // onClick={() => toggleSortByName()}
                                      alt=""
                                    />
                                  </th>
                                  <th> PROVINCIA </th>
                                  <th> ENTRENADOR </th>
                                  <th>2º ENTRENADOR</th>
                                  <th>Nº JUGADORES</th>
                                  <th>EMAIL</th>
                                  <th>TELÉFONO</th>
                                </tr>
                              </thead>
                              <tbody>
                                {teams.map((team: any, index: any) => (
                                  <tr key={index}>
                                    <td className="p-0 align-middle">
                                      {team.badge === null ? (
                                        <ImgBadge src="/images/badges-teams/default-badge.png" />
                                      ) : (
                                          <ImgBadge src={team.badge} />
                                        )}
                                    </td>
                                    <td className="p-2 align-middle">
                                      {!team.name ? "-" : team.name}
                                    </td>
                                    <td className="p-2 align-middle">
                                      {!team.locality ? "-" : team.locality}
                                    </td>
                                    <td className="p-2 align-middle">
                                      {!team.coach ? "-" : team.coach}
                                    </td>
                                    <td className="p-2 align-middle">
                                      {!team.coach2 ? "-" : team.coach2}
                                    </td>
                                    <td className="p-2 align-middle">
                                      {!team.NPlayers ? "-" : team.NPlayers}
                                    </td>
                                    <td className="p-2 align-middle">
                                      {!team.contactEmail ? "-" : team.contactEmail}
                                    </td>
                                    <td className="p-2 align-middle">
                                      {!team.contactPhone ? "-" : team.contactPhone}
                                    </td>
                                    <td className="p-2 align-middle">
                                      <img
                                        src="/images/other/edit.png"
                                        width="15"
                                        alt=""
                                        // onClick={() => funcionEditTeam(l.TeamId)}
                                        style={{ cursor: "pointer" }}
                                      />
                                    </td>
                                    <td className="p-1">
                                      <Button
                                        variant="danger"
                                        className="pt-0 pb-0 pl-3 pr-3"
                                        size="sm"
                                        onClick={() => sendInfoDeleteTeam(team.Id, team.name)}
                                      >
                                        Eliminar
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                        <Button
                          variant="warning"
                          onClick={() => setShowCreateTeamModal(true)}
                          className="font-weight-bold text-dark pl-3 pr-3 btn-sm"
                        >
                          <img
                            src="/images/other/plus.png"
                            className="mr-2 align-middle"
                            width="17"
                            alt=""
                          />
                          <span className="align-middle">NEW TEAM</span>
                        </Button>
                      </Tab.Pane>
                      {/* <Tab.Pane eventKey="second">
                  <div
                    className="row mx-auto pl-2 pr-2"
                    style={{ width: "86%" }}
                  >
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
                </Tab.Pane> */}
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      {showCreateTeamModal &&
        <CreateTeamModal
          showModal={showCreateTeamModal}
          setShowModal={setShowCreateTeamModal}
          newTeamAction={newTeamAction}
        />
      }
      {showDeleteTeamModal &&
        <DeleteTeamModal
          showModal={showDeleteTeamModal}
          setShowModal={setShowDeleteTeamModal}
          infoDeleteTeam={infoDeleteTeam}
          deleteTeamAction={deleteTeamAction}
        />
      }
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => {
  const { tournamentReducer } = state;
  return {
    tournaments: tournamentReducer.tournaments,
    teams: tournamentReducer.teams,
    qualification: tournamentReducer.qualification,
    matches: tournamentReducer.matches,
    matchUpdated: tournamentReducer.matchUpdated
  }
}

const mapDispatchToProps = {
  tournamentsByUserAction,
  teamsTournamentAction,
  newTeamAction,
  deleteTeamAction
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentInfo);

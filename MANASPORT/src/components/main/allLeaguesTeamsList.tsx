//React´s Components
import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
//React Bootstrap
import {
  Table,
  Tab,
  Nav,
  Card,
  CardDeck,
  ListGroupItem,
  ListGroup
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
const DivDegraded = styled.div`
background: linear-gradient(50deg, rgba(255,193,7,0.9), rgba(255,193,7,0.5), rgba(43,47,56,0.7), rgba(43,47,56,0.4));
`;
// *********************


//Global Props
interface IProps { }
interface IPropsGlobal {
  leagueTeams: ITeam[];
  setLeagueTeams: (leagueTeams: ITeam[]) => void;
}

const AllLeaguesDetailsTeams: React.FC<IProps & IPropsGlobal> = props => { //Function Component
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


  return (
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
                            </tr>
                          ))}
                        </Tbody>
                      </Table>
                    </div>
                  </div>
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
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  leagueTeams: state.leagueTeams,
  DeleteLeagueId: state.TournamentId
});

const mapDispatchToProps = {
  setLeagueTeams: action.setLeagueTeams,
  setLeagueId: action.setLeagueId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllLeaguesDetailsTeams);

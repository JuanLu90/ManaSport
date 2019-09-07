import React from "react";
import { Tab, Nav } from "react-bootstrap";
import LeagueDetailsGeneral from "./leagueDetailsGeneral";
import LeagueDetailsTeams from "./leagueTeamsList";
import LeagueDetailsPlayers from "./leaguePlayersList";
import { ITournament } from "../../interfaces";
import { createBrowserHistory } from "history";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import styled from "styled-components";



const SpanNameLeague = styled.span`
  margin-top: -20px;
  font-size: 2em;
`
const Span = styled.span`
  font-family: "Source Sans Pro", sans-serif;
`




interface IProps {
  leagues: ITournament[];
}

const LeagueDetails: React.FC<IProps> = props => {

  const history = createBrowserHistory({});
  const path: any = history.location.pathname;
  let pathTournamentId = path.split(["/"]).slice(-1)[0];

  const currentLeague = props.leagues.find(
    u => u.TournamentId === +pathTournamentId
  );
  const token = localStorage.getItem("token"); //Token - Get the token stored from local storage

  let Wrapper = styled.div``
  if (!token) {
    Wrapper = styled.div`
    margin-top: 80px;
  `;
  }

  return (
    <Wrapper>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Nav variant="tabs" className="flex-fill justify-content-between">
          <Nav.Item>
            <Nav.Link eventKey="first" className="pt-0 pb-0 bg-secondary border border-dark">
              <Span className="text-light">General</Span>
            </Nav.Link>
          </Nav.Item>
          <SpanNameLeague className="text-light">{currentLeague ? currentLeague.name : null}</SpanNameLeague>
          <div>
            <Nav.Item>
              <Nav.Link eventKey="second" className="pt-0 pb-1 d-inline bg-secondary border border-dark">
                <Span className="text-light">Equipos</Span>
              </Nav.Link>
              <Nav.Link eventKey="third" className="pt-0 pb-1 d-inline bg-secondary border border-dark">
                <Span className="text-light">Jugadores</Span>
              </Nav.Link>
            </Nav.Item>
          </div>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="first">
            <LeagueDetailsGeneral />
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <LeagueDetailsTeams />
          </Tab.Pane>
          <Tab.Pane eventKey="third">
            <LeagueDetailsPlayers />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Wrapper>
  );
};


const mapStateToProps = (state: IGlobalState) => ({
  leagues: state.leagues
});


export default connect(mapStateToProps)(LeagueDetails);

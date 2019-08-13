import React from "react";
import { Tab, Nav, DropdownButton, Dropdown } from "react-bootstrap";
import LeagueDetailsGeneral from "./leagueDetailsGeneral/leagueDetailsGeneral";
import LeagueDetailsTeams from "./leagueDetailsManage/leagueDetailsTeams";
import LeagueDetailsPlayers from "./leagueDetailsManage/leagueDetailsPlayers";

const LeagueDetails: React.FC = () => {

  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Nav variant="tabs" className="flex-fill">
          <Nav.Item>
            <Nav.Link eventKey="first" className="pt-0 pb-0">
              General
                </Nav.Link>
          </Nav.Item>
          <DropdownButton
            size="sm"
            title="Administrar"
            id="dropdown-item-button"
            className="p-0 m-0 btn btn-light">
            <Nav.Item>
              <Nav.Link eventKey="second" className="pt-0 pb-0">
                Equipos
                  </Nav.Link>
            </Nav.Item>
            <Dropdown.Divider />
            <Nav.Item>
              <Nav.Link eventKey="third" className="pt-0 pb-0">
                Jugadores
              </Nav.Link>
            </Nav.Item>
          </DropdownButton>
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
    </>
  );
};





export default LeagueDetails;
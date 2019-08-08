import React from "react";
import LeaguesList from "./leaguesList/leagueList";
import PlayoffsList from "./playoffsList/playoffsList";
import { Tab, Nav } from "react-bootstrap";

const Tournaments: React.FC = () => {



  return (
    <div className="col-11 main-userprofile">
        <div className="row mt-3">
          <div className="col">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Nav variant="tabs" className="flex-fill">
                <Nav.Item>
                  <Nav.Link eventKey="first" className="pt-0 pb-0">
                    Liga
                </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" className="pt-0 pb-0">
                    Eliminatoria
                </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <LeaguesList />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <PlayoffsList />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
    </div>
  );
};

export default Tournaments;

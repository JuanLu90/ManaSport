import React from "react";
import "./management.css";
import SidebarUserProfile from "./sidebar";
import Tournaments from "./tournaments/tournaments";
import { Switch, Route } from "react-router-dom";
import EditUserProfile from "./userProfile/editUserProfile/editUserProfile";
import UserProfile from "./userProfile/userProfile";
import LeagueDetails from "./tournaments/leaguesList/leagueDetails/leagueDetails";
import styled from "styled-components";

const Management: React.FC = () => {

  const Wrapper = styled('div')({
    background: '#F3F3F4',
    height: '120vh !important'
  });

  const Sidebar = styled('div')({
    background: '#b5d0f0',
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col userprofile-header">

        </div>
      </div>
      <div className="row overflow-auto">
        <Sidebar className="col-1">
          <SidebarUserProfile />
        </Sidebar>
        <Wrapper className="col-11">
          <Switch>
            <Route path="/management" exact component={Tournaments} />
            <Route path="/management/user" exact component={UserProfile} />
            <Route path="/management/user/edit" exact component={EditUserProfile} />
            <Route path="/management/leagueDetails" component={LeagueDetails} />
          </Switch>
        </Wrapper>


      </div>
    </div>


  );
};

export default Management;

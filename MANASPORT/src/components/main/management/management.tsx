import React from "react";
import SidebarUserProfile from "./sidebar";
import { Switch, Route } from "react-router-dom";
import EditUserProfile from "./userProfile/editUserProfile/editUserProfile";
import UserProfile from "./userProfile/userProfile";
import LeagueDetails from "./leaguesList/leagueDetails/leagueDetails";
import styled from "styled-components";
import leagueList from "./leaguesList/leagueList";

const Management: React.FC = () => {


  //******** STYLES *********

  const Tophead = styled('div')({
    marginTop: '55px',
    height: '140px'
  })

  const Wrapper = styled('div')({
    background: '#F3F3F4'
    // height: '120vh !important'
  });

  const Sidebar = styled('div')({
    background: '#b5d0f0',
  });

  //*************************

  return (
    <div className="container-fluid">
      <div className="row">
        <Tophead className="col" />
      </div>
      <div className="row overflow-auto">
        <Sidebar className="col-1">
          <SidebarUserProfile />
        </Sidebar>
        <Wrapper className="col-11">
          <Switch>
            <Route path="/management" exact component={leagueList} />
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

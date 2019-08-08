import React from "react";
import "./management.css";
import SidebarUserProfile from "./sidebar/sidebar";
import Tournaments from "./tournaments/tournaments";
import { Switch, Route } from "react-router-dom";
import EditUserProfile from "./userProfile/editUserProfile/editUserProfile";
import UserProfile from "./userProfile/userProfile";
import LeagueDetails from "./tournaments/leaguesList/leagueDetails/leagueDetails";

const Management: React.FC = () => {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col userprofile-header">
 
        </div>
      </div>
      <div className="row sidebar-userprofile overflow-auto">
        <SidebarUserProfile />
        <Switch>
          <Route path="/management" exact component={Tournaments} />
          <Route path="/management/user" exact component={UserProfile} />
          <Route path="/management/user/edit" exact component={EditUserProfile} />
          <Route path="/management/leagueDetails" component={LeagueDetails} />
        </Switch>
      </div>
    </div>


  );
};

export default Management;

//React´s Components
import React from "react";
import { Switch, Route } from "react-router-dom";

//Components made by Juanlu
import EditUserProfile from "./userEditProfile";
import UserProfile from "./userProfile";
import LeagueDetails from "./leagueDetails";
import leagueList from "./leagueList";

//Styled Components - CSSINJS
import styled from "styled-components";



//******** STYLES *********
const Wrapper = styled('div')({
  background: '#F3F3F4',
  marginTop: '70px'
});

const Sidebar = styled('div')({
  background: '#b5d0f0'
});
//*************************



//----------------------------------------------------



const Management: React.FC = () => { //Function Component
  return (
    <div className="container-fluid">
      <div className="row overflow-auto">
        <Wrapper className="col">
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

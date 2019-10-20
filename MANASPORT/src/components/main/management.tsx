//React´s Components
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
//Components made by Juanlu
import EditUserProfile from "./userEditProfile";
import UserProfile from "./userProfile";
import LeagueDetails from "./leagueDetails";
import LeagueDetailsTennis from "./leagueDetailsTennis";
import leagueList from "./leagueList";
//Interfaces
import { IUser } from "../../interfaces";
//Redux
import * as action from "../../action";
import { connect } from "react-redux";
//Styled Components - CSSINJS
import styled from "styled-components";
import { IGlobalState } from "../../reducers/reducers";
import jwt from "jsonwebtoken";

//******** STYLES - STYLED-COMPONENTS - CCSSINJS *********

let Wrapper = styled.div`
  background-image: url("/images/fondo4.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center top;
  padding-top: 100px;
  min-height: 72.3vh;
`;

//----------------------------------------------------

//Global Props
interface IProps {
  users: IUser[];
}
interface IPropsGlobal {
  setUsers: (users: IUser[]) => void;
}

const Management: React.FC<IProps & IPropsGlobal> = props => {
  //Function Component
  const token: any = localStorage.getItem("token"); //Token - Get the token stored from local storage
  const decoded: any = jwt.decode(token);

  useEffect(() => {
    //Fetch users to redux every time token changes
    fetch("http://localhost:8080/api/users/", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
        // Authorization: "Bearer " + props.token
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(users => props.setUsers(users));
      }
    });
  }, [token]);

  return (
    <Wrapper className="container-fluid">
      <div className="row">
        <div className="col">
          <Switch>
            <Route path="/management" exact component={leagueList} />
            <Route path="/management/user" exact component={UserProfile} />
            <Route
              path="/management/user/edit"
              exact
              component={EditUserProfile}
            />
            <Route path="/management/leagueDetails" component={LeagueDetails} />
            <Route path="/management/leagueDetailsTennis" component={LeagueDetailsTennis} />
          </Switch>
        </div>
      </div>
    </Wrapper>
  );
};



const mapStateToProps = (state: IGlobalState) => ({
  users: state.users
});
const mapDispatchToProps = {
  setUsers: action.setUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Management);

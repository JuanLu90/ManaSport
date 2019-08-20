//React´s Components
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
//Components made by Juanlu
import EditUserProfile from "./userEditProfile";
import UserProfile from "./userProfile";
import LeagueDetails from "./leagueDetails";
import leagueList from "./leagueList";
//Interfaces
import { IUser } from "../../interfaces";
//Redux
import * as action from "../../action";
import { connect } from "react-redux";
//Styled Components - CSSINJS
import styled from "styled-components";
import { createBrowserHistory } from "history";





//*************************

const history = createBrowserHistory({});
const path = history.location.pathname;
//******** STYLES *********
let Wrapper: any = styled('div')({});

if (path === '/management') {
  Wrapper = styled.div`
  background-image: url('/images/fondo4.png');
    background: #20242A;
    padding: 190px;
  `
} else {
  Wrapper = styled.div`
  background-image: url('/images/fondo4.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  padding-top: 100px;
`
}

//background-color: #20242A;

//----------------------------------------------------

//Global Props
interface IProps { }
interface IPropsGlobal {
  setUsers: (users: IUser[]) => void;
}

const Management: React.FC<IProps & IPropsGlobal> = props => { //Function Component

    

  const token = localStorage.getItem("token");   //Token - Get the token stored from local storage

  //Hook to update the profile list when it changes
  const [profileUpdated, setProfileUpdated] = React.useState(false);
  const updatedProfile = () => { //Set true to activate the 'useEffect'
    setProfileUpdated(true);
  };


  useEffect(() => { //Fetch users to redux every time the token changes
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
  }, [token, profileUpdated]);




  return (
    <Wrapper className="container-fluid">
      <div className="row">
        <div className="col">
          <Switch>
            <Route path="/management" exact component={leagueList} />
            <Route path="/management/user" exact component={UserProfile} />
            <Route path="/management/user/edit" exact component={EditUserProfile} />
            <Route path="/management/leagueDetails" component={LeagueDetails} />
          </Switch>
        </div>
      </div>
    </Wrapper>
  );
};


const mapDispatchToProps = {
  setUsers: action.setUsers
};

export default connect(
  null,
  mapDispatchToProps
)(Management);

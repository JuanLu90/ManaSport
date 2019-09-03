//React´s Components
import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//Components made by Juanlu
import Header from "./components/header/header";
import Footer from "./components/footer";
import management from "./components/main/management";
//Redux
import { connect } from "react-redux";
import { IGlobalState } from "./reducers/reducers";
import * as action from "./action";
//Interfaces
import { ITournament } from "./interfaces";
//JsonWebToken
import jwt from "jsonwebtoken";
//Css
import "./reset.css";
import "./App.css";
import mainApp from "./components/main/mainApp";
import AllLeagueList from "./components/main/allLeaguesList";
import AllLeaguesDetails from "./components/main/allLeaguesDetails";
import styled from "styled-components";

//******** STYLES - STYLED-COMPONENTS - CCSSINJS *********

let Wrapper = styled.div`
  background-image: url("/images/fondo4.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center top;
`;

//----------------------------------------------------

//Global Props
interface IProps {}
interface IPropsGlobal {
  setAllLeagues: (allleagues: ITournament[]) => void;
  allleagues: ITournament[];
}

const App: React.FC<IProps & IPropsGlobal> = props => {
  //Function Component
  const token = localStorage.getItem("token"); //Token - Get the token stored from local storage

  useEffect(() => {
    //Fetch all leagues to redux
    fetch("http://localhost:8080/api/tournaments", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
        // Authorization: "Bearer " + props.token
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(allleagues => props.setAllLeagues(allleagues));
      }
    });
  }, []); //When a new League is add, Redux will be update.

  return (
    <BrowserRouter>
      <Wrapper className="bg-dark">
        <Header /> {/* Header Component */}
        <main>
          {/* Index */}
          {!token && (
            <Switch>
              <Route path="/" exact component={mainApp} />
              <Route path="/leagues" exact component={AllLeagueList} />
              <Route
                path="/leagues/allleaguesDetails"
                component={AllLeaguesDetails}
              />
            </Switch>
          )}
          {token && (
            <Switch>
              <Route path="/management" component={management} />
              <Redirect to="/management" />
            </Switch>
          )}
        </main>
        <Footer /> {/* Footer Component */}
      </Wrapper>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  allleagues: state.allleagues
});

const mapDispatchToProps = {
  setAllLeagues: action.setAllLeagues
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

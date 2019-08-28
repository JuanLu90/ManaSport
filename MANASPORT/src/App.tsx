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
import AllleagueList from "./components/main/allLeaguesList";


//----------------------------------------------------



//Global Props
interface IProps { }
interface IPropsGlobal {
  setLeagues: (leagues: ITournament[]) => void;
  leagues: ITournament[];
  setAllLeagues: (allleagues: ITournament[]) => void;
  allleagues: ITournament[];
}


const App: React.FC<IProps & IPropsGlobal> = props => { //Function Component
  const token = localStorage.getItem("token");   //Token - Get the token stored from local storage

  useEffect(() => { //Fetch leagues of the current user to redux
    if (token) { // We need that token exits to decode it but React will fall down
      const decoded: any = jwt.decode(token); //Decode token to get the UserId
      const UserId: number = decoded.UserId; //Get the UserId
      fetch(
        "http://localhost:8080/api/users/tournamentsList/leagues/" + UserId,
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json"
            // Authorization: "Bearer " + props.token
          }
        }
      ).then(response => {
        if (response.ok) {
          response.json().then(leagues => props.setLeagues(leagues));
        }
      });
    }
  }, [token, props.leagues.length]); //When a new League is add, Redux will be update.


  useEffect(() => { //Fetch leagues of the current user to redux
    fetch(
      "http://localhost:8080/api/tournaments",
      {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
          // Authorization: "Bearer " + props.token
        }
      }
    ).then(response => {
      if (response.ok) {
        response.json().then(allleagues => props.setAllLeagues(allleagues));
      }
    });

  }, []); //When a new League is add, Redux will be update.


  return (
    <BrowserRouter>
      <div className="bg-dark">
        <Header /> {/* Header Component */}
        <main> {/* Index */}
          {!token && (
            <Switch>
              <Route path="/" exact component={mainApp} />
              <Route path="/leagues" exact component={AllleagueList} />
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
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  leagues: state.leagues,
  allleagues: state.allleagues
});

const mapDispatchToProps = {
  setUsers: action.setUsers,
  setLeagues: action.setLeagues,
  setAllLeagues: action.setAllLeagues
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

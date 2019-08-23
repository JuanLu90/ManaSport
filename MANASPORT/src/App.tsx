//React´s Components
import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//Components made by Juanlu
import Header from "./components/header/header";
import Footer from "./components/footer";
import MainApp from "./components/main/mainApp";
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


//----------------------------------------------------



//Global Props
interface IProps { }
interface IPropsGlobal {
  setLeagues: (leagues: ITournament[]) => void;
  leagues: ITournament[];
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

  return (
    <BrowserRouter>
      <Header /> {/* Header Component */}
      <main>
        {!token && <MainApp />} {/* Index */}
        {token && (
          <Switch>
            <Route path="/management" component={management} />
            <Redirect to="/management" />
          </Switch>
        )}
      </main>
      <Footer /> {/* Footer Component */}
    </BrowserRouter>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  leagues: state.leagues
});

const mapDispatchToProps = {
  setUsers: action.setUsers,
  setLeagues: action.setLeagues
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

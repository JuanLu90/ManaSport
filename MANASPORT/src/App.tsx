import React, { useEffect } from "react";
import Header from "./components/header/header";
import "./reset.css";
import "./App.css";
import Footer from "./components/footer/footer";
import MainApp from "./components/main/mainApp/mainApp";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { IGlobalState } from "./reducers/reducers";
import { connect } from "react-redux";
import UserProfile from "./components/main/management/management";
import * as action from "./action";
import { IUser, ITournament } from "./interfaces";
import jwt from "jsonwebtoken";

interface IProps {}

interface IPropsGlobal {
  setUsers: (users: IUser[]) => void;
  setLeagues: (leagues: ITournament[]) => void;
  setPlayoffs: (playoffs: ITournament[]) => void;
  leagues: ITournament[];
}

const App: React.FC<IProps & IPropsGlobal> = props => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    //FETCH USERS TO REDUX
    fetch("http://localhost:8080/api/users/", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
        // Authorization: "Bearer " + props.token
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(result => props.setUsers(result));
      }
    });

    //FETCH LEAGUES TO REDUX
    if (token) {
      const decoded: any = jwt.decode(token);
      const UserId: number = decoded.UserId;
      //FETCH PLAYOFFS TO REDUX
      fetch(
        "http://localhost:8080/api/users/tournamentsList/playoffs/" + UserId,
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json"
            // Authorization: "Bearer " + props.token
          }
        }
      ).then(response => {
        if (response.ok) {
          response.json().then(result => props.setPlayoffs(result));
        }
      });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const decoded: any = jwt.decode(token);
      const UserId: number = decoded.UserId;
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
          response.json().then(result => props.setLeagues(result));
        }
      });
    }
  }, [token, props.leagues.length]);

  return (
    <BrowserRouter>
      <Header />
      {!token && <MainApp />}

      {token && (
        <Switch>
          <Route path="/management" component={UserProfile} />
          <Redirect to="/management" />
        </Switch>
      )}
      <Footer />
    </BrowserRouter>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  leagues: state.leagues
});

const mapDispatchToProps = {
  setUsers: action.setUsers,
  setLeagues: action.setLeagues,
  setPlayoffs: action.setPlayoffs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import mainApp from "./components/main/mainApp";
import tennis from "./components/main/tennis";
import Header from "./components/header/header";
import Footer from "./components/footer";
//Styled Components
import styled from "styled-components";
//******** STYLES - STYLED-COMPONENTS - CCSSINJS *********

let Wrapper = styled.div`
  background-image: url("/images/fondo4.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center top;
`;
interface IProps { }
interface IProsGLobal { }

const App: React.FC<IProps & IProsGLobal> = () => {
  return (
    <BrowserRouter>
      <Wrapper className="bg-dark">
        <Header /> {/* Header Component */}
        <main>
          {/* Index */}
          {/* {!token && ( */}
          <Switch>
            <Route path="/" exact component={mainApp} />
            <Redirect to="/" />
            {/* <Route path="/leagues" exact component={leagueList} /> */}
            {/* <Route
              path="/leagues/allleaguesDetails"
              component={AllLeaguesDetails}
            /> */}
            {/* <Route
              path="/management/leagueDetails"
              component={leagueDetails}
            /> */}

          </Switch>
          {/* )} */}
          {/* {token && (
          <Switch>
            <Route path="/management" component={management} />
            <Redirect to="/management" />
          </Switch>
        )} */}
        </main>
        <Footer /> {/* Footer Component */}
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

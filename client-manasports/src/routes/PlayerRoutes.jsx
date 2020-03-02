// DEPENDENCES
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// COMPONENTS
import PlayerLayout from "../components/Layout";

// PUBLIC ROUTES
import Main from "../components/Main";
// import LoginPage from "../components/LoginPage/Login";
// import RegisterPage from "../components/RegisterPage/Register";

const PlayerRoutes = () => {

    return (
        <PlayerLayout>
            <Switch>
                {/* PUBLIC ROUTES */}
                {/* <Route exact path="/Login" component={LoginPage} />
                <Route exact path="/Register" component={RegisterPage} /> */}
                <Route exact path="/" component={Main} />
                <Redirect to="/" />
            </Switch>
        </PlayerLayout>
    );
};

export default PlayerRoutes;

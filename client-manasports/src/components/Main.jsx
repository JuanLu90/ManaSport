// DEPENDENCES
import React from "react";
import { connect } from 'react-redux';
import { registerAction } from "../redux/actions/action";

const Main = props => {

  const { registerAction } = props;

    const user = {
        name: "aaaaaa",
        username: "bbbbbbb",
        email: "cccccc@hotmail.es",
        password: "mypassword"
    };

    return (
        <div>
            <div>MAIN</div>
            <div><button onClick={() => registerAction(user)}>REGISTER</button></div>
        </div>
    );
};

const mapDispatchToProps = {
  registerAction
};

export default connect(null, mapDispatchToProps)(Main);

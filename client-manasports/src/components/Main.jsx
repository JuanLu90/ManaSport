// DEPENDENCES
import React from "react";
import styled from 'styled-components';

const Main = () => {

    const Wrapper = styled.div`
    background-image: url("/images/main-tennis.jpg"); 
    min-height: 100vh;
    `;

    return (
        <Wrapper className="mainBody">
            <div>MAIN</div>
        </Wrapper>
    );
};

export default Main;

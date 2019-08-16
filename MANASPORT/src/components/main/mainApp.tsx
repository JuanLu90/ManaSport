//React´s Components
import React from "react";
//Styled Components - CSSINJS
import styled from "styled-components";




// ********* Styles - Styled Components - CSSINJS **********

const BackgroundImage = styled.div`
  background-image: url("/images/fondo2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
`
const WrapperContainer = styled.div`
  font-size: 3em;
  padding-top: 160px !important;
  opacity: 0.96;
  background: rgba(0, 0, 0, 0.4);
`
const WrapperRow = styled.div`
  font-family: "Russo One", sans-serif;
  margin: auto;
`
const FontSpan = styled.span`
  font-family: "Anton", sans-serif;
`

//*************************

const MainApp: React.FC = () => { // Function Component
  return (
    <BackgroundImage>
      <WrapperContainer className="container-fluid text-light text-center p-5">
        <WrapperRow className="row">
          <div className="col p-5 mediaquery-1">
            <FontSpan>
              Gestiona de manera facil y cómoda tus ligas y torneos de fútbol
              </FontSpan>
          </div>
        </WrapperRow>
        <WrapperRow className="row w-75 p-3">
          <div className="col text-warning h2 p-3 mediaquery-2">
            <FontSpan>
              Con ManaSport podrás organizar tus ligas y torneos de fútbol al
              más alto nivel.
              </FontSpan>
          </div>
        </WrapperRow>
      </WrapperContainer>
      {/* <div className="flotantes">
        <img src="images/other/arrow-top.svg" className="arrow-top" id="arrow-top" />
      </div> */}
    </BackgroundImage>
  );
};

export default MainApp;

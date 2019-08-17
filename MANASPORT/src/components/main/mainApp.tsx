//React´s Components
import React from "react";
//Styled Components - CSSINJS
import styled from "styled-components";




// ********* Styles - Styled Components - CSSINJS **********

const BackgroundImage = styled.div`
  background-image: url("/images/fondo5.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
`
const WrapperContainer = styled.div`
  font-size: 3em;
  padding-top: 160px !important;
  opacity: 0.96;
  height: 100vh;
`
const WrapperContainer2 = styled.div`
  font-size: 3em;
  padding-top: 160px !important;
  opacity: 0.96;
  height: 100vh;
  background: linear-gradient(360deg, rgba(150,150,150,0.1), rgba(150,150,150,0.1), rgba(24,27,33,0.2), rgba(24,27,33,0.6));
`
const WrapperRow = styled.div`
  font-family: "Russo One", sans-serif;
  margin: auto;
`
const FontSpan1 = styled.span`
  font-family: 'PT Serif', serif;
  font-weight: bolder;
  text-transform: uppercase;
  color: #f1f2f6;
  font-size: 0.7em;
`
const FontSpan = styled.span`
  font-family: 'PT Serif', serif;
  font-weight: bolder;
  text-transform: uppercase;
  color: #f1f2f6;
  font-size: 0.4em;
`
//*************************

const MainApp: React.FC = () => { // Function Component
  return (
    <>
      <BackgroundImage>
        <WrapperContainer className="container-fluid text-center p-5">
          <WrapperRow className="row">
            <div className="col-5">
              <FontSpan1>
                Gestiona de manera fácil y cómoda tus ligas de fútbol
              </FontSpan1>
            </div>
          </WrapperRow>
          <WrapperRow className="row justify-content-end p-3">
            <div className="col-4 text-warning">
              <FontSpan className="text-warning">
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
      <BackgroundImage>
        <WrapperContainer2 className="container-fluid text-center p-5">
          <WrapperRow className="row">
            <div className="col-5">
              <FontSpan1>
                Gestiona de manera fácil y cómoda tus ligas de fútbol
              </FontSpan1>
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
        </WrapperContainer2>
        {/* <div className="flotantes">
        <img src="images/other/arrow-top.svg" className="arrow-top" id="arrow-top" />
      </div> */}
      </BackgroundImage>
    </>
  );
};

export default MainApp;

//React´s Components
import React, { useState } from "react";
//Styled Components - CSSINJS
import styled from "styled-components";
import { Modal } from "react-bootstrap";



// ********* Styles - Styled Components - CSSINJS **********

const BackgroundImage = styled.div`
  background-image: url("/images/fondo2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
`
const WrapperContainer = styled.div`
  font-size: 3em;
  opacity: 0.96;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
`
const Row1 = styled.div`
  font-family: "Russo One", sans-serif;
  position: absolute;
  top: 150px;
`
const Row2 = styled.div`
  font-family: "Russo One", sans-serif;
  position: absolute;
  top: 420px;
`
const Row3 = styled.div`
  position: absolute;
  bottom: 50px;
  font-size: 0.6em;
`
const FontSpan1 = styled.span`
  font-family: 'PT Serif', serif;
  font-weight: bolder;
  text-transform: uppercase;
  color: #f1f2f6;
  font-size: 0.7em;
`
const Span = styled.span`
  font-family: 'PT Serif', serif;
  color: #f1f2f6;
  font-size: 0.7em;
`
const FontSpan = styled.span`
  font-family: 'PT Serif', serif;
  font-weight: bolder;
  color: #f1f2f6;
  font-size: 0.5em;
`
//*************************

const MainApp: React.FC = () => { // Function Component
  const [modalVideo, setModalVideo] = useState(false);
  const handleCloseModalVideo = () => setModalVideo(false);
  const handleShowModalVideo = () => setModalVideo(true);
  return (
    <>
      <BackgroundImage>
        <WrapperContainer className="container-fluid d-flex flex-column">
          <Row1 className="row w-75 text-center align-self-center">
            <div className="col">
              <FontSpan1>
                Gestiona de manera fácil y cómoda tus ligas de fútbol
              </FontSpan1>
              <br />
              <FontSpan className="text-warning">
                Organiza tus ligas de fútbol al más alto nivel.
              </FontSpan>
            </div>
          </Row1>
          <Row2 className="row align-self-center">
            <div className="col">
              <button className="btn btn-warning pt-3 pb-3 pl-5 pr-5" onClick={handleShowModalVideo}>Cómo funciona</button>
            </div>
          </Row2>
          <Row3 className="row text-light text-center align-self-center w-50">
            <div className="col"> <img src="/images/other/cup.png" width="50" alt="" /> <br /> LIGAS <br /> <Span>Texto de prueba, Texto de prueba, Texto de prueba</Span> </div>
            <div className="col"> <img src="/images/other/shield.png" width="50" alt="" /> <br /> EQUIPOS <br /> <Span>Texto de prueba, Texto de prueba, Texto de prueba</Span></div>
            <div className="col"> <img src="/images/other/players.png" width="50" alt="" /> <br /> JUGADORES <br /> <Span>Texto de prueba, Texto de prueba ,Texto de prueba</Span></div>
          </Row3>
        </WrapperContainer>
      </BackgroundImage>
      <BackgroundImage>
        {/* <WrapperContainer2 className="container-fluid text-center p-5">
          <Row1 className="row">
            <div className="col-5">
              <FontSpan1>
                Gestiona de manera fácil y cómoda tus ligas de fútbol
              </FontSpan1>
            </div>
          </Row1>
          <Row1 className="row w-75 p-3">
            <div className="col text-warning h2 p-3 mediaquery-2">
              <FontSpan>
                Con ManaSport podrás organizar tus ligas y torneos de fútbol al
                más alto nivel.
              </FontSpan>
            </div>
          </Row1>
        </WrapperContainer2> */}
        {/* <div className="flotantes">
        <img src="images/other/arrow-top.svg" className="arrow-top" id="arrow-top" />
      </div> */}
      </BackgroundImage>
      <Modal show={modalVideo} onHide={handleCloseModalVideo} size="xl">
        <div className="modal-dialog-centered" role="document">
          <div className="modal-content bg-light text-dark">
            <div className="modal-body pt-0">
              <button
                type="button"
                className="close"
                onClick={handleCloseModalVideo}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe title="Embeds Page" className="embed-responsive-item" src="/videos/video1.mp4" width="800px" />
              </div>
            </div>
          </div>
        </div>

      </Modal>
    </>
  );
};

export default MainApp;

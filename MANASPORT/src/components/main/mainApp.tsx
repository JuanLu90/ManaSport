//React´s Components
import React, { useState } from "react";
//Styled Components - CSSINJS
import styled from "styled-components";
import { Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

// ********* Styles - Styled Components - CSSINJS **********

const BackgroundImage = styled.div`
  background-image: url("/images/fondo2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  background-attachment: fixed;
`

const Wrapper = styled.div`
  font-family: "Source Sans Pro", sans-serif;
`
const WrapperContainer = styled.div`
  font-size: 3em;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`
const WrapperContainer2 = styled.div`
  background-color: rgba(241, 242, 246, 1);
  height: 50vh;
`
const WrapperContainer3 = styled.div`
background-color: rgba(241, 242, 246, 1);

  height: 50vh;
`
const BackgroundImage2 = styled.div`
  background-image: url("/images/fondo7.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  background-attachment: fixed;
`
const Row1 = styled.div`
  position: absolute;
  top: 150px;
`
const Row2 = styled.div`
  position: absolute;
  top: 420px;
`
const Row3 = styled.div`
  position: absolute;
  height: 25%;
  bottom: 0px;
  font-size: 0.6em;
  }
`
const ColDevices = styled.div`
  border-top: 4px solid rgba(255, 193, 7, 0.2);
  border-bottom: 4px solid rgba(255, 193, 7, 0.2);
  transition: 0.5s;
  &:hover{
    border-top: 4px solid rgba(255, 193, 7, 1);
    border-bottom: 4px solid rgba(255, 193, 7, 1);
  }
`
const FontSpan1 = styled.span`
  font-weight: bolder;
  text-transform: uppercase;
  color: #f1f2f6;
  font-size: 0.7em;
  line-height: 80% !important;
  @media (max-width: 1230px) {
    font-size: 0.5em;
  }
  @media (max-width: 900px) {
    font-size: 0.45em;
  }
  @media (max-width: 365px) {
    font-size: 0.4em;

  }
`
const Span = styled.span`
  color: #f1f2f6;
  font-size: 0.62em;
`
const FontSpan = styled.span`
  font-weight: bolder;
  color: #f1f2f6;
  font-size: 0.5em;
  @media (max-width: 1230px) {
    font-size: 0.4em;
  }
  @media (max-width: 900px) {
    font-size: 0.3.5em;
  }
  @media (max-width: 365px) {
    font-size: 0.3em;
  }
`
const Col = styled.div`
  line-height: 0.7em;
`
const VerticalHr = styled.hr`
  border:         none;
  border-left:    2px solid #dfe4ea;
  height:         390px;
  width:          3px;
  margin: 0 5%;
`
const MiniHr = styled.hr({
  border: 'none',
  display: 'block',
  height: "4px",
  margin: "18px auto",
  width: "24px",
  overflow: "visible",
  position: "relative"
});



//*************************

const MainApp: React.FC = () => { // Function Component
  const [modalVideo, setModalVideo] = useState(false);
  const handleCloseModalVideo = () => setModalVideo(false);
  const handleShowModalVideo = () => setModalVideo(true);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };


  return (
    <Wrapper>
         

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
          <Row2 className="row w-50 justify-content-center align-self-center">
            <div className="col text-center">
              <button
                className="btn btn-warning pt-2 pb-2 pl-3 pr-3 m-3 text-uppercase font-weight-bold"
                onClick={handleShowModalVideo}
              >
                Cómo funciona
              </button>
              <Link to={'/leagues'} className="border-0">
                <button
                  className="btn btn-dark text-warning pt-2 pb-2 pl-3 pr-3 m-3 text-uppercase font-weight-bold"
                >
                  Info Ligas
              </button>
              </Link>
            </div>
          </Row2>
          <Row3 className="row text-light text-center justify-content-center w-100">
            <Col className="col-md-2 m-3">
              <div className="row">
                <div className="col">
                  <img src="/images/other/cup.png" width="50" className="m-2" alt="" />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <span>LIGAS</span>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <Span>Crea tus ligas y administralas de manera fácil e intuitiva</Span>
                </div>
              </div>
            </Col>
            <Col className="col-md-2 m-3">
              <div className="row">
                <div className="col">
                  <img src="/images/other/shield.png" width="50" className="m-2" alt="" />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <span>EQUIPOS</span>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <Span>Gestiona horarios, resultados y clasificaciones de tus equipos</Span>
                </div>
              </div>
            </Col>
            <Col className="col-sm-2 m-3">
              <div className="row">
                <div className="col">
                  <img src="/images/other/players.png" width="50" className="m-2" alt="" />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <span>JUGADORES</span>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <Span>Lleva el control de las estadísticas de cada uno de los jugadores</Span>
                </div>
              </div>
            </Col>
          </Row3>
        </WrapperContainer>
      </BackgroundImage>
      {/* <WrapperContainer2 className="container-fluid d-flex align-items-center p-2">
        <div className="row w-100 justify-content-center p-3 m-auto">
          <div className="col-4 d-flex align-items-center justify-content-center">
            <img src="/images/mockup.png" className="align-self-center" width="85%" alt="" />
          </div>
          <VerticalHr />
          <div className="col-5">
            <div className="row pt-4 pl-4 pr-4">
              <div className="col h4 text-uppercase font-weight-bold">
                <p>
                  Optimizado para todos los dispositivos.
                </p>
              </div>
            </div>
            <div className="row p-3 font-weight-bold">
              <ColDevices className="col pt-4 pb-4 text-center rounded">
                <img src="/images/other/computer.png" className="mb-3" width="80" alt="" />
                <span className="d-block">Ordenadores</span>
              </ColDevices>
              <ColDevices className="col pt-4 pb-4 text-center rounded">
                <img src="/images/other/laptop.png" className="mb-3" width="80" alt="" />
                <span className="d-block"> Portátiles </span>
              </ColDevices>
              <ColDevices className="col pt-4 pb-4 text-center rounded">
                <img src="/images/other/tablet.png" className="mb-3" width="80" alt="" />
                <span className="d-block">Tablets</span>
              </ColDevices>
              <ColDevices className="col pt-4 pb-4 text-center rounded">
                <img src="/images/other/smartphone.png" className="mb-3" width="80" alt="" />
                <span className="d-block">Smartphones</span>
              </ColDevices>
            </div>
            <div className="row pt-4 pb-4 pl-4 pr-4">
              <div className="col h4 text-uppercase font-weight-bold">
                <p>Gestiona tus ligas donde y cuando quieras</p>
              </div>
            </div>
          </div>
        </div>
      </WrapperContainer2> */}
      {/* <BackgroundImage2> */}
        <WrapperContainer3 className="container-fluid pt-5">
          <MiniHr className="bg-warning" />
          <div className="row w-50 m-auto pt-4">
            <div className="col font-weight-bold text-uppercase text-center text-dark mb-5 h4">Para todo tipo de usuarios</div>
          </div>
          <div className="row w-75 m-auto text-center justify-content-center pt-3">
            <div className={index === 0 ? "col-2 bg-dark text-light font-weight-bold text-uppercase p-2 m-1 rounded " : "col-2 bg-light border border-secondary text-secondary font-weight-bold text-uppercase p-2 m-1 rounded"} onClick={() => setIndex(0)} style={{ cursor: 'pointer' }}>Amigos</div>
            <div className={index === 1 ? "col-2 bg-dark text-light font-weight-bold text-uppercase p-2 m-1 rounded" : "col-2 bg-light border border-secondary text-secondary font-weight-bold text-uppercase p-2 m-1 rounded"} onClick={() => setIndex(1)} style={{ cursor: 'pointer' }}>Aficionados</div>
            <div className={index === 2 ? "col-2 bg-dark text-light font-weight-bold text-uppercase p-2 m-1 rounded" : "col-2 bg-light border border-secondary text-secondary font-weight-bold text-uppercase p-2 m-1 rounded"} onClick={() => setIndex(2)} style={{ cursor: 'pointer' }}>Profesionales</div>
          </div>
          <div className="row justify-content-center text-dark mt-5">
            <div className="col-9">
              <Carousel indicators={false} activeIndex={index} onSelect={handleSelect} interval={3000}>
                <Carousel.Item>
                  <div className="row justify-content-center font-weight-bold h3">Para amigos </div>
                  <div className="row justify-content-center h5"><p>Compite con tus amigos y gestionad vuestra liga de una manera rápida, facil e intuitiva.</p> </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="row justify-content-center font-weight-bold h3">Para aficionados </div>
                  <div className="row justify-content-center h5"><p>Crea una liga en la que competir con tus amigos ocasionalmente, y gestionala como lo haria un profesional.</p> </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="row justify-content-center font-weight-bold h3">Para profesionales </div>
                  <div className="row justify-content-center h5"><p>Crea tantas ligas sean necesarias, sin restricciones de número de equipos y jugadores.</p> </div>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </WrapperContainer3>
      {/* </BackgroundImage2> */}
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
                <iframe title="Embeds Page" className="embed-responsive-item" src="/videos/mivideo.mp4" width="800px" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Wrapper>
  );
};

export default (MainApp);

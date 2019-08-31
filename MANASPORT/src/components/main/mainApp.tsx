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
const WrapperContainer = styled.div`
  font-family: "Russo One", sans-serif;
  font-size: 3em;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`
const WrapperContainer2 = styled.div`
font-family: "Source Sans Pro", sans-serif;
height: 70vh;
background-color: rgba(241, 242, 246,1);
`
const WrapperContainer3 = styled.div`
  height: 60vh;
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
const Hr = styled.hr`
  height: 4px;
  margin-left: 8%;
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
  font-size: 0.62em;
`
const FontSpan = styled.span`
  font-family: 'PT Serif', serif;
  font-weight: bolder;
  color: #f1f2f6;
  font-size: 0.5em;
`
const Col = styled.div`
  line-height: 0.7em;
`
const Span2 = styled.span`
font-size: 2.3em;
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
                  Ligas Activas
              </button>
              </Link>
            </div>
          </Row2>
          <Row3 className="row text-light text-center justify-content-center w-100">
            <Col className="col-2 m-3">
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
                  <Span>Crea tús ligas y administralas de manera fácil e intuitiva</Span>
                </div>
              </div>
            </Col>
            <Col className="col-2 m-3">
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
                  <Span>Gestiona horarios, resultados y clasificaciónes de tus equipos</Span>
                </div>
              </div>
            </Col>
            <Col className="col-2 m-3">
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
                  <Span>Lleva el control de las estádisticas de cada uno de los jugadores</Span>
                </div>
              </div>
            </Col>
          </Row3>
        </WrapperContainer>
      </BackgroundImage>
      <WrapperContainer2 className="container-fluid d-flex align-items-center">
        <div className="row w-100 justify-content-center">
          <div className="col d-flex align-items-center justify-content-center">
            <img src="/images/mockup.png" className="align-self-center" width="80%" alt="" />
          </div>
          <div className="col">
            <div className="row mt-3 ml-5 mr-5 mb-5">
              <div className="col">
                <Span2>RESPONSIVE</Span2>
              </div>
            </div>
            <div className="row m-5">
              <div className="col h5">
                <p>
                  Optimizado para todo tipo de dispositivos.
                </p>
              </div>
            </div>
            <Hr className="bg-warning w-25 rounded" />
            <div className="row m-5 font-weight-bold">
              <div className="col text-center">
                <img src="/images/other/computer.png" className="mb-3" width="80" alt="" />
                <span className="d-block">Ordenadores</span>
              </div>
              <div className="col text-center">
                <img src="/images/other/laptop.png" className="mb-3" width="80" alt="" />
                <span className="d-block"> Portátiles </span>
              </div>
              <div className="col text-center">
                <img src="/images/other/tablet.png" className="mb-3" width="80" alt="" />
                <span className="d-block">Tablets</span>
              </div>
              <div className="col text-center">
                <img src="/images/other/smartphone.png" className="mb-3" width="80" alt="" />
                <span className="d-block">Smartphones</span>
              </div>
            </div>
            <div className="row m-5">
              <div className="col h5">
                <p>Gestiona tu liga donde y cuando quieras</p>
              </div>
            </div>
          </div>
        </div>
      </WrapperContainer2>
      <WrapperContainer3 className="container-fluid bg-dark p-5">
        <div className="row justify-content-center">
          <div className="col-6">
            <Carousel indicators={false}>
              <Carousel.Item className="text-light">
                <div className="row justify-content-center"><img src="/images/other/players.png" alt="" /></div>
                <div className="row justify-content-center"><h3>First slide label</h3> </div>
                <div className="row justify-content-center"><p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> </div>
              </Carousel.Item>
              <Carousel.Item className="text-light">
                <div className="row justify-content-center"><img src="/images/other/players.png" alt="" /></div>
                <div className="row justify-content-center"><h3>First slide label</h3> </div>
                <div className="row justify-content-center"><p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> </div>
              </Carousel.Item>
              <Carousel.Item className="text-light">
                <div className="row justify-content-center"><img src="/images/other/players.png" alt="" /></div>
                <div className="row justify-content-center"><h3>First slide label</h3> </div>
                <div className="row justify-content-center"><p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </WrapperContainer3>
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
    </>
  );
};

export default (MainApp);

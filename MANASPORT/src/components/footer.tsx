import React from "react";
import styled from "styled-components";

const Footer: React.FC = () => {


  //******** STYLES *********
  const Wrapper = styled.span`
    font-family: "Noto Serif", serif;
  `
  const Copyright = styled.div`
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-align: center;
    padding-bottom: 15px;
  `
  const Disclaimer = styled.div`
    margin: auto;
    text-align: justify;
    font-family: "Noto Serif", serif;
    font-size: 0.75em;
    color: #9d9d9d;
  `
  const TitlesFooter = styled.span`
    font-size: 16px;
    font-weight: bolder;
    text-transform: uppercase;
  `
  //*************************


  return (
    <Wrapper className="container-fluid text-light bg-dark pt-4">
      <div className="row justify-content-center">
        <div className="col-2 info-footer mt-3">
          <img src="/images/logotipo.png" width="230" alt="logo" />
          <ul>
            <li>info@manasport.com</li>
            <li>+34 627 11 23 91</li>
          </ul>
        </div>
        <div className="col-2 info-footer">
          <TitlesFooter>Compañia</TitlesFooter>
          <ul className="list-group list-unstyled text-secondary">
            <li>Sobre nosotros</li>
            <li>Equipo</li>
            <li>Promotores</li>
            <li>Trabaja con nosotros</li>
          </ul>
        </div>
        <div className="col-2 info-footer">
          <TitlesFooter>Empezar</TitlesFooter>
          <ul className="list-group list-unstyled text-secondary">
            <li>Participa</li>
            <li>Conócenos</li>
            <li>Centro de ayuda</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="col-2 info-footer">
          <TitlesFooter>Información</TitlesFooter>
          <ul className="list-group list-unstyled text-secondary">
            <li>Información sobre competicion</li>
            <li>Términos y Condiciones</li>
            <li>Política de privacidad</li>
            <li>Política de cookies</li>
          </ul>
        </div>
        <div className="col-2 info-footer">
          <TitlesFooter>RRSS</TitlesFooter>
          <div className="rrss_footer">
            <a href="/#">
              <img src="/images/rrss/facebook2.png" width="26px" alt="facebook" />
            </a>
            <a href="/#">
              <img src="/images/rrss/twitter2.png" width="26px" alt="twitter" />
            </a>
            <a href="/#">
              <img src="/images/rrss/instagram2.png" width="26px" alt="instagram" />
            </a>
            <a href="/#">
              <img src="/images/rrss/linkedin2.png" width="26px" alt="linkedin" />
            </a>
          </div>
        </div>
      </div>
      <Disclaimer>
        <hr className="bg-warning" />
        <Copyright>
          <span>MANASPORT 2019 © - Todos los derechos reservados</span> <br />
          <span>Aviso legal - Política de cookies</span> <br />
          <span>info@manasport.com</span> <br />
        </Copyright>
      </Disclaimer>
    </Wrapper>
  );
};

export default Footer;

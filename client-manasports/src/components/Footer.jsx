import React from "react";
import styled from "styled-components";

const Footer = () => {


  //******** STYLES *********
  const Wrapper = styled.div`
    font-family: "Source Sans Pro", sans-serif;
    z-index: 1000;
  `
  const TitlesFooter = styled.span`
    font-size: 16px;
    font-weight: bolder;
    text-transform: uppercase;
  `
  const Li = styled.li`
  cursor: pointer;
    &:hover{
      color: white;
    }
  `
  const ImgRRSS = styled.img`
  cursor: pointer;
    &:hover{
      filter: opacity(75%)
    }
  `
  //*************************


  return (
    <Wrapper className="container-fluid text-light bg-dark pt-4">
      <div className="row justify-content-center">
        <div className="col-2 info-footer mt-3">
          <img src="/images/logotipo.png" width="230" alt="logo" />
          <ul className="list-unstyled">
            <li>info@manasport.com</li>
            <li>+34 627 11 23 91</li>
          </ul>
        </div>
        <div className="col-2 info-footer">
          <TitlesFooter>Compañia</TitlesFooter>
          <ul className="list-group list-unstyled text-secondary mt-2">
            <Li>Sobre nosotros</Li>
            <Li>Equipo</Li>
            <Li>Promotores</Li>
            <Li>Trabaja con nosotros</Li>
          </ul>
        </div>
        <div className="col-2 info-footer">
          <TitlesFooter>Empezar</TitlesFooter>
          <ul className="list-group list-unstyled text-secondary mt-2">
            <Li>Participa</Li>
            <Li>Conócenos</Li>
            <Li>Centro de ayuda</Li>
            <Li>Blog</Li>
          </ul>
        </div>
        <div className="col-2 info-footer">
          <TitlesFooter>Información</TitlesFooter>
          <ul className="list-group list-unstyled text-secondary mt-2">
            <Li>Información sobre competicion</Li>
            <Li>Términos y Condiciones</Li>
            <Li>Política de privacidad</Li>
            <Li>Política de cookies</Li>
          </ul>
        </div>
        <div className="col-2 info-footer">
          <TitlesFooter>REDES SOCIALES</TitlesFooter>
          <div className="rrss_footer mt-2">
              <ImgRRSS src="/images/rrss/facebook.png" width="22px" className="mt-1 mr-2" alt="facebook" />
              <ImgRRSS src="/images/rrss/twitter.png" width="22px" className="mt-1 mr-2" alt="twitter" />
              <ImgRRSS src="/images/rrss/instagram.png" width="22px" className="mt-1" alt="instagram" />
          </div>
        </div>
      </div>
      <hr className="bg-secondary" />
      <div className="row text-light">
        <div className="col-10 text-left ml-5 mb-3">
          <span>MANASPORT 2019 © - Todos los derechos reservados</span> <br />
        </div>
      </div>
    </Wrapper>
  );
};

export default Footer;

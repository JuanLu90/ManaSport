import React from "react";
import "./footer.css";
import styled from "styled-components";

const Footer: React.FC = () => {


  //******** STYLES *********
  const Footer = styled.div`
    background: rgba(36, 36, 36, 0.99);
  `
  const FooterFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  `
  const BorderRight = styled.span`
      border-color: #c4c3c3 !important;
  `

  // const Wrapper = styled('div')({
  //   background: '#ffffff',
  //   height: '120vh !important'
  // });

  //*************************


  return (
    <Footer className="text-light">
      <FooterFlex className="container-fluid">
        <div className="info-footer" id="logo_footer">
          <img src="/images/logotipo.png" alt="logo"/>
          <ul>
            <li>ejemplo@manasport.com</li>
            <li>+34 627 11 23 91</li>
          </ul>
        </div>
        <div className="info-footer">
          <h4>Compañia</h4>
          <ul>
            <li>Sobre nosotros</li>
            <li>Equipo</li>
            <li>Promotores</li>
            <li>Trabaja con nosotros</li>
          </ul>
        </div>
        <div className="info-footer">
          <h4>Empezar</h4>
          <ul>
            <li>Participa</li>
            <li>Conócenos</li>
            <li>Centro de ayuda</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="info-footer">
          <h4>Información</h4>
          <ul>
            <li>Información sobre competicion</li>
            <li>Términos y Condiciones</li>
            <li>Política de privacidad</li>
            <li>Política de cookies</li>
          </ul>
        </div>
        <div className="info-footer">
          <h4>RRSS</h4>
          <div className="rrss_footer">
            <a href="/#">
              <img src="/images/rrss/facebook2.png" alt="facebook" />
            </a>
            <a href="/#">
              <img src="/images/rrss/twitter2.png" alt="twitter" />
            </a>
            <a href="/#">
              <img src="/images/rrss/instagram2.png" alt="instagram" />
            </a>
            <a href="/#">
              <img src="/images/rrss/linkedin2.png" alt="linkedin" />
            </a>
          </div>
        </div>
      </FooterFlex>
      <div className="disclaimer">
        <hr />
        <div className="copyright">
          <span>MANASPORT 2019 © - Todos los derechos reservados</span> <br />
          <span>Aviso legal - Política de cookies</span> <br />
          <span>info@manasport.com</span> <br />
        </div>
      </div>
    </Footer>
  );
};

export default Footer;

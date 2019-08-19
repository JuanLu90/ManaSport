import React from "react";
import "./footer.css";
import styled from "styled-components";

const Footer: React.FC = () => {


  //******** STYLES *********
  const BorderRight = styled.span`
      border-color: #c4c3c3 !important;
  `

  // const Wrapper = styled('div')({
  //   background: '#ffffff',
  //   height: '120vh !important'
  // });

  //*************************


  return (
    <div className="container-fluid text-light bg-dark pt-4">
      <div className="row justify-content-center">
        <div className="col-2 info-footer" id="logo_footer">
          <img src="/images/logotipo.png" alt="logo" />
          <ul>
            <li>info@manasport.com</li>
            <li>+34 627 11 23 91</li>
          </ul>
        </div>
        <div className="col-2 info-footer">
          <h4>Compañia</h4>
          <ul className="p-0 text-secondary">
            <li>Sobre nosotros</li>
            <li>Equipo</li>
            <li>Promotores</li>
            <li>Trabaja con nosotros</li>
          </ul>
        </div>
        <div className="col-2 info-footer">
          <h4>Empezar</h4>
          <ul className="p-0 text-secondary">
            <li>Participa</li>
            <li>Conócenos</li>
            <li>Centro de ayuda</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="col-2 info-footer">
          <h4>Información</h4>
          <ul className="p-0 text-secondary">
            <li>Información sobre competicion</li>
            <li>Términos y Condiciones</li>
            <li>Política de privacidad</li>
            <li>Política de cookies</li>
          </ul>
        </div>
        <div className="col-2 info-footer">
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
      </div>
      <div className="disclaimer">
        <hr className="bg-warning" />
        <div className="copyright">
          <span>MANASPORT 2019 © - Todos los derechos reservados</span> <br />
          <span>Aviso legal - Política de cookies</span> <br />
          <span>info@manasport.com</span> <br />
        </div>
      </div>
    </div>
    // <div className="footer footer-public">
    //   <div className="container-fluid">
    //     <div className="footer-column">
    //       <a className="brand-image -fadedblue -small" href="https://challonge.com/es"></a>
    //       <p>
    //         <a href="https://www.splitmedialabs.com" target="_blank">
    //           © 2019 Bettercast Limited
    //         </a>
    //       </p>
    //       <div className="dropup">
    //         <a className="user" data-toggle="dropdown" href="#">
    //           <div className="flag flag-es"></div>
    //         </a>
    //         <ul className="dropdown-menu">
    //           <li>
    //             <a data-turbolinks="false" href="/es/user_session/switch_locale?return=%2Far&amp;to=ar"><div className="flag flag-ar"></div>
    //               العَرَبِيَّة
    //             </a>
    //           </li>
    //           <li>
    //             <a data-turbolinks="false" href="/es/user_session/switch_locale?return=%2Fde&amp;to=de"><div className="flag flag-de"></div>
    //               Deutsch
    //             </a>
    //             </li>
    //           <li>
    //             <a data-turbolinks="false" href="/es/user_session/switch_locale?return=%2F&amp;to=en"><div className="flag flag-en"></div>
    //               English
    //             </a>
    //           </li>
    //           <li>
    //             <a data-turbolinks="false" href="/es/user_session/switch_locale?return=%2Fpl&amp;to=pl"><div className="flag flag-pl"></div>
    //               Polski
    //             </a></li>
    //           <li className="divider" role="separator"></li>
    //           <li><a data-turbolinks="false" href="/es/translate">Ayuda a traducir</a></li>
    //         </ul>
    //       </div>
    //     </div>
    //     <div className="footer-column">
    //       <h5 className="title">Explorar</h5>
    //       <ul className="navlist">
    //         <li className="item">
    //           <a href="https://challonge.com/es/search/tournaments">Buscar torneos</a>
    //         </li>
    //         <li className="item">
    //           <a href="https://challonge.com/es/tournament/bracket_generator">Generador de llaves</a>
    //         </li>
    //         <li className="item">
    //           <a href="https://challonge.com/es/changelog">Cambios</a>
    //         </li>
    //         <li className="item">
    //           <a href="https://challonge.com/es/about">Acerca de</a>
    //         </li>
    //       </ul>
    //     </div>
    //     <div className="footer-column">
    //       <h5 className="title">Recursos</h5>
    //       <ul className="navlist">
    //         <li className="item">
    //           <a href="https://api.challonge.com/es/v1">API</a>
    //         </li>
    //         <li className="item">
    //           <a href="https://challonge.com/es/terms_of_service">Términos</a>
    //         </li>
    //         <li className="item">
    //           <a href="https://challonge.com/es/privacy_policy">Privacidad</a>
    //         </li>
    //       </ul>
    //     </div>
    //     <div className="footer-column">
    //       <h5 className="title">Redes Sociales</h5>
    //       <div className="footer--social-icons">
    //         <a target="_blank" href="http://www.facebook.com/challonge"><i className="fa fa-facebook"></i>
    //         </a><a target="_blank" href="http://twitter.com/challonge"><i className="fa fa-twitter"></i>
    //         </a><a target="_blank" href="https://www.youtube.com/channel/UCBWbLXxW9SGShL4rMab-tPQ"><i className="fa fa-youtube"></i>
    //         </a></div>
    //       <ul className="navlist">
    //         <li className="item">
    //           <a href="https://challonge.com/es/contact">Contactar</a>
    //         </li>
    //         <li className="item">
    //           <a href="https://challonge.com/es/advertise">Advertise</a>
    //         </li>
    //         <li className="item">
    //           <a target="_blank" href="https://foo.challonge.com">Blog</a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Footer;

import React from "react";
import "./teamList.css"
import { createBrowserHistory } from "history";
import styled from "styled-components";



const TeamList2: React.FC = () => {
//   const Wrapper = styled('div')({
//     background: '#d1d8e0'
//   });
  
  return (
    <div className="col-10 main-userprofile h-100 text-light">
      <div className="container-fluid mt-3 bg-editUserProfile border border-light">
        <div className="row ">
          <div className="col text-dark border-right border-dark">
            <div className="row text-center m-3">
              <div className="col mb-4">
                <span className="h2"> Vestuario</span>
              </div>
            </div>
            <div className="row m-4">
              <div className="col-3 text-right">
                <span className="fontstyle-editUserProfile">
                  Nombre de equipo:
                  </span>
              </div>
            </div>
            <div className="row m-4">
              <div className="col-3 text-right">
                <span className="fontstyle-editUserProfile">Nombre:</span>
              </div>
            </div>
            <div className="row m-4">
              <div className="col-3 text-right">
                <span className="fontstyle-editUserProfile">Localidad:</span>
              </div>
            </div>
            <div className="row m-4">
              <div className="col-3 text-right">
                <span className="fontstyle-editUserProfile">Número de jugadores:</span>
              </div>
            </div>
          </div>
          <div className="col-3 text-center align-self-center">
            <div className="row">
              <div className="col">
                <img
                  src="/images/profile/no-profile.png"
                  width="110"
                  alt=""
                />
              </div>
            </div>
            <div className="row text-dark mt-4">
              <div className="col">Actualizar avatar</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <button className="m-2">Enviar</button>
        </div>
      </div>
    </div>
  );
}


export default TeamList2;
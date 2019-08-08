import React from "react";
import Newsletter from "./newsletter/newsletter";

const MainApp: React.FC = () => {
  return (
    <main>
      <div className="opacity-main">
        <div className="container-fluid text-light text-center p-5 index-contain">
          <div className="row title">
            <div className="col p-5 mediaquery-1">
              <span className="font-anton">
                Gestiona de manera facil y cómoda tus ligas y torneos de fútbol
              </span>
            </div>
          </div>
          <div className="row w-75 p-3">
            <div className="col text-warning h2 p-3 mediaquery-2">
              <span className="font-anton">
                Con ManaSport podrás organizar tus ligas y torneos de fútbol al
                más alto nivel.
              </span>
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
      {/* <div className="flotantes">
        <img src="images/other/arrow-top.svg" className="arrow-top" id="arrow-top" />
      </div> */}
    </main>
  );
};

export default MainApp;

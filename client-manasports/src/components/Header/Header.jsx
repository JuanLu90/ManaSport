// DEPENDENCES
import React, { useState } from "react";
import ModalLogin from "./LoginModal";
import ModalRegister from "./RegisterModal";

const Header = () => {

    const [openModalLogin, setOpenModalLogin] = useState(false);
    const [openModalRegister, setOpenModalRegister] = useState(false);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">HEADER</div>
                    <div className="col">
                        <button className="btn btn-info"  onClick={() => setOpenModalLogin(!openModalLogin)}>Login</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-success" onClick={() => setOpenModalRegister(!openModalRegister)}>REGISTER</button>
                    </div>
                </div>
            </div>

            <ModalRegister
                show={openModalRegister}
                onHide={() => setOpenModalRegister(false)}
            />
             <ModalLogin
                show={openModalLogin}
                onHide={() => setOpenModalLogin(false)}
            />
        </>
    );
};

export default Header;
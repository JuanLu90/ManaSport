// DEPENDENCES
import React, { useState } from "react";
import ModalRegister from "./registerModal";

const Header = () => {

    const [openModalRegister, setOpenModalRegister] = useState(false);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">HEADER</div>
                    <div className="col">
                        <button className="btn btn-info">Login</button>
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
        </>
    );
};

export default Header;
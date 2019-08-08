import React from "react";
import './newsletter.css'


const Newsletter: React.FC = () => {
    return (
        <div className="container-fluid newsletter">
            <h1>SUSCRÍBETE A NUESTRA NEWSLETTER</h1>
            <h3>Entérate de todas las novedades, próximos proyectos...  ¿te lo vas a perder?</h3>
            <form id="form_newsletter" method="post">
                <input id="emailForm" name="emailForm" type="text" placeholder="Tu email" />
                <input type="submit" value="Enviar" />
            </form>
        </div>

    );
}



export default Newsletter;
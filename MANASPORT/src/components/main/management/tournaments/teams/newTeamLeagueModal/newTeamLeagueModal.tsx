import React from "react";
import { InputGroup, Form } from "react-bootstrap";
import { ITournament } from "../../../../../../interfaces";
import { IGlobalState } from "../../../../../../reducers/reducers";
import { connect } from "react-redux";

interface IProps {
    leagues: ITournament[];
    handleCloseShowNewTeamLeague: () => void;
}

interface IPropsGlobal {
    DeleteLeagueId: number;
}

const NewTeamLeagueModal: React.FC<IProps & IPropsGlobal> = props => {

    const currentLeague = props.leagues.find(
        u => u.TournamentId === props.DeleteLeagueId
      );
      //Evita que 'league' sea undefined
      if (!currentLeague) {
        return null;
      }


    return (
        <div className="modal-dialog-centered" role="document">
            <div className="modal-content bg-light text-dark">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalCenterTitle">
                        Añadir nuevo equipo: <b>{currentLeague.name}</b>
                    </h5>
                    <button
                        type="button"
                        className="close"
                        onClick={props.handleCloseShowNewTeamLeague}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col">
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-sm">
                                        Nombre del equipo*
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <input
                                    type="text"
                                    className="form-control form-control-sm mt-0"
                                />
                            </InputGroup>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-sm">
                                        Categoría*
                                        </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" >
                                    <option>Futbol 11</option>
                                    <option>Futbol 7</option>
                                    <option>Futbol Sala</option>
                                    <option>Futbol(otros)</option>
                                </Form.Control>
                            </InputGroup>
                        </div>
                        <div className="col">
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-sm">
                                        Provincia*
                                        </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" >
                                    <option value='alava'>Álava</option>
                                    <option value='albacete'>Albacete</option>
                                    <option value='alicante' >Alicante/Alacant</option>
                                    <option value='almeria'>Almería</option>
                                    <option value='asturias'>Asturias</option>
                                    <option value='avila'>Ávila</option>
                                    <option value='badajoz'>Badajoz</option>
                                    <option value='barcelona'>Barcelona</option>
                                    <option value='burgos'>Burgos</option>
                                    <option value='caceres'>Cáceres</option>
                                    <option value='cadiz'>Cádiz</option>
                                    <option value='cantabria'>Cantabria</option>
                                    <option value='castellon'>Castellón/Castelló</option>
                                    <option value='ceuta'>Ceuta</option>
                                    <option value='ciudadreal'>Ciudad Real</option>
                                    <option value='cordoba'>Córdoba</option>
                                    <option value='cuenca'>Cuenca</option>
                                    <option value='girona'>Girona</option>
                                    <option value='laspalmas'>Las Palmas</option>
                                    <option value='granada'>Granada</option>
                                    <option value='guadalajara'>Guadalajara</option>
                                    <option value='guipuzcoa'>Guipúzcoa</option>
                                    <option value='huelva'>Huelva</option>
                                    <option value='huesca'>Huesca</option>
                                    <option value='illesbalears'>Illes Balears</option>
                                    <option value='jaen'>Jaén</option>
                                    <option value='acoruña'>A Coruña</option>
                                    <option value='larioja'>La Rioja</option>
                                    <option value='leon'>León</option>
                                    <option value='lleida'>Lleida</option>
                                    <option value='lugo'>Lugo</option>
                                    <option value='madrid'>Madrid</option>
                                    <option value='malaga'>Málaga</option>
                                    <option value='melilla'>Melilla</option>
                                    <option value='murcia'>Murcia</option>
                                    <option value='navarra'>Navarra</option>
                                    <option value='ourense'>Ourense</option>
                                    <option value='palencia'>Palencia</option>
                                    <option value='pontevedra'>Pontevedra</option>
                                    <option value='salamanca'>Salamanca</option>
                                    <option value='segovia'>Segovia</option>
                                    <option value='sevilla'>Sevilla</option>
                                    <option value='soria'>Soria</option>
                                    <option value='tarragona'>Tarragona</option>
                                    <option value='santacruztenerife'>Santa Cruz de Tenerife</option>
                                    <option value='teruel'>Teruel</option>
                                    <option value='toledo'>Toledo</option>
                                    <option value='valencia'>Valencia/Valéncia</option>
                                    <option value='valladolid'>Valladolid</option>
                                    <option value='vizcaya'>Vizcaya</option>
                                    <option value='zamora'>Zamora</option>
                                    <option value='zaragoza'>Zaragoza</option>
                                </Form.Control>
                            </InputGroup>
                        </div>
                    </div>
                </div>
                <div className="modal-footer no-border">
                    <div className="col text-right">
                        <button onClick={props.handleCloseShowNewTeamLeague}>Cancelar</button>
                    </div>
                    <div className="col">
                        <button>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: IGlobalState) => ({
    leagues: state.leagues,
    DeleteLeagueId: state.TournamentId
})




export default connect(mapStateToProps)(NewTeamLeagueModal);
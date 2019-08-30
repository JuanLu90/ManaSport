//React´s Components
import React, { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
//React Bootstrap
import { Form, Accordion, Card } from "react-bootstrap";
//Redux
import { IGlobalState } from "../../reducers/reducers";
import * as action from "../../action";
import { connect } from "react-redux";
//Interfaces
import { ITournament, ITeam } from "../../interfaces";
import styled from "styled-components";
//Jquery
import $ from 'jquery';


// STYLES ----- STYLED COMPONENTS ----- CSSINJS
const Wrapper = styled.div`
  font-family: "Source Sans Pro", sans-serif;
  z-index: 9999;
`
const Wrapper2 = styled.div`
  background-color: #2B2F38;
`
const FontLocality = styled.div`
  font-size: 1em;
`
const ImgBadge = styled("img")({
  height: "100px"
});
const ImgCursorPointer = styled("img")({
  cursor: "pointer",
  height: "40px"
});

//----------------------------------------------------


//Global Props
interface IProps {
  leagues: ITournament[];
  leagueTeams: ITeam[];
  handleCloseEditTeam: () => void;
  toggleSetTeams: () => void;
  putTeamById: (TeamId: number, team: ITeam) => void;
}
interface IPropsGlobal {
  DeleteLeagueId: number;
}

const EditTeamModal: React.FC<IProps & IPropsGlobal> = props => {
  //Hooks update Team
  const [inputTeamName, setInputTeamName] = React.useState("");
  const [inputTeamLocality, setInputTeamLocality] = React.useState("");
  const [inputTeamCoach, setInputTeamCoach] = React.useState("");
  const [inputTeamCoach2, setInputTeamCoach2] = React.useState("");
  const [inputTeamEmail, setInputTeamEmail] = React.useState("");
  const [inputTeamPhone, setInputTeamPhone] = React.useState("");
  const [inputTeamBadge, setInputTeamBadge] = React.useState("");

  //Onchanges input teams
  const updateTeamName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTeamName(event.currentTarget.value);
  };
  const updateTeamLocality = (event: any) => {
    setInputTeamLocality(event.currentTarget.value);
  };
  const updateTeamCoach = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTeamCoach(event.currentTarget.value);
  };
  const updateTeamCoach2 = (event: any) => {
    setInputTeamCoach2(event.currentTarget.value);
  };
  const updateTeamEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTeamEmail(event.currentTarget.value);
  };
  const updateTeamPhone = (event: any) => {
    setInputTeamPhone(event.currentTarget.value);
  };
  const updateTeamBadge = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTeamBadge(event.currentTarget.value);
  };


  $('.position-image img').click(function () {
    let alt = $(this).attr("alt");
    let currentImg = $(this);
    let othersImgs = $("img");

    for (let i = 1; i < 16; i++) {
      switch (alt) {
        case `${i}`:
          currentImg.css({ "box-shadow": " 0 0 10pt 2pt #ffc107"});
          othersImgs.not($(this)).css("box-shadow", "none");
          break;
        default:
          console.log("petaso");
      }
    }
  })


  
  const BadgesImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
    return <div className="col m-2">
     <ImgCursorPointer
       src={`/images/badges-teams/badge${i}.png`}
       onClick={() => setInputTeamBadge(`/images/badges-teams/badge${i}.png`) }
       alt={i.toString()}
       key={i}
     />
   </div>
  })

  // Hook to get fetch error
  const [fetchError, setFetchError] = useState("");

  const currentTeam = props.leagueTeams.find( //Avoid that 'team' will be undefined
    u => u.TeamId === props.DeleteLeagueId
  );

  const history = createBrowserHistory({ forceRefresh: true });
  const path: any = history.location.pathname;
  let pathTournamentId = path.split(["/"]).slice(-1)[0]; //Get the TournamentID from the path

  useEffect(() => { //Fetch current team every time it changes
    if (currentTeam) {
      setInputTeamName(currentTeam.name);
      setInputTeamLocality(currentTeam.locality);
      setInputTeamCoach(currentTeam.coach);
      setInputTeamCoach2(currentTeam.coach2);
      setInputTeamEmail(currentTeam.contactEmail);
      setInputTeamPhone(currentTeam.contactPhone);
      setInputTeamBadge(currentTeam.badge);
    }
  }, [currentTeam]);

  if (!currentTeam) {
    return null;
  }
  const editCurrentTeam = () => {
    //Avoid that 'team' will be undefined

    fetch("http://localhost:8080/api/teams/editTeam/" + currentTeam.TeamId, { //Fetch the current team updated
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
        // Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        TeamId: currentTeam.TeamId,
        name: inputTeamName,
        locality: inputTeamLocality,
        coach: inputTeamCoach,
        coach2: inputTeamCoach2,
        contactEmail: inputTeamEmail,
        contactPhone: inputTeamPhone,
        badge: inputTeamBadge
      })
    })
      .then(response => {
        if (response.ok) {
          const u: any = {
            TeamId: currentTeam.TeamId,
            name: inputTeamName,
            locality: inputTeamLocality,
            coach: inputTeamCoach,
            coach2: inputTeamCoach2,
            contactEmail: inputTeamEmail,
            contactPhone: inputTeamPhone,
            badge: inputTeamBadge
          };
          response.json().then(u => {
            props.putTeamById(currentTeam.TeamId, u);
            props.handleCloseEditTeam();
            props.toggleSetTeams();
          });
        } else {
          response.json().then(({ e }) => {
            if (e === 1048) {
              setFetchError("El nombre del equipo no puede estar vacío");
            }
          });
        }
      })
      .catch(err => {
        console.log("Error, " + err);
      });
  };

  return (
    <Wrapper className="modal-dialog-centered" role="document">
      <Wrapper2 className="modal-content text-light border border-secondary">
        <div className="modal-header bg-warning text-dark">
          <h5 className="modal-title" id="exampleModalCenterTitle">
            Está editando: <b>{currentTeam.name}</b>
          </h5>
          <button
            type="button"
            className="close"
            onClick={props.handleCloseEditTeam}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col">
              <input
                type="text"
                value={inputTeamBadge}
                onChange={updateTeamBadge}
                className="w-50"
                id="position"
                hidden
              />
            </div>
          </div>
          <div className="row">
            <div className="col text-center align-self-center">
              <Accordion defaultActiveKey="0">
                <div className="row m-3">
                  <div className="col">

                    {inputTeamBadge === null ? <ImgBadge src="/images/badges-teams/default-badge.png" /> : <ImgBadge src={inputTeamBadge} alt="" />}
                  </div>
                </div>
                <Card className="border-0">
                  <Accordion.Collapse eventKey="1">
                    <Card.Body className="p-0 border-0" style={{ backgroundColor: '#2B2F38' }}>
                      <div className="row justify-content-between position-image">
                        {BadgesImages}
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Accordion.Toggle as={"a"} variant="link" eventKey="1" className="align-self-center">
                  <div className="row m-3 align-self-end">
                    <div className="col align-self-end">
                      <button className="pt-0 pb-0 btn btn-outline-light">Elegir escudo</button>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Accordion>
            </div>
            <div className="col-8">
              <div className="row">
                <div className="col">
                  Nombre del equipo
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control form-control-sm mt-0"
                    value={inputTeamName}
                    onChange={updateTeamName}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Localidad
                </div>
              </div>
              <div className="row mb-2">
                <div className="col h1">
                  <Form.Control as="select" size="sm" onChange={updateTeamLocality} theme={FontLocality} className="pt-0 pb-0">
                    <option value="Álava">Álava</option>
                    <option value="Albacete">Albacete</option>
                    <option value="Alicante">Alicante</option>
                    <option value="Almeria">Almería</option>
                    <option value="Asturias">Asturias</option>
                    <option value="Ávila">Ávila</option>
                    <option value="Badajoz">Badajoz</option>
                    <option value="Barcelona">Barcelona</option>
                    <option value="Burgos">Burgos</option>
                    <option value="Cáceres">Cáceres</option>
                    <option value="Cádiz">Cádiz</option>
                    <option value="Cantabria">Cantabria</option>
                    <option value="Castellón">Castellón</option>
                    <option value="Ceuta">Ceuta</option>
                    <option value="Ciudad Real">Ciudad Real</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Cuenca">Cuenca</option>
                    <option value="Girona">Girona</option>
                    <option value="Las Palmas">Las Palmas</option>
                    <option value="Granada">Granada</option>
                    <option value="Guadalajara">Guadalajara</option>
                    <option value="Guipúzcoa">Guipúzcoa</option>
                    <option value="Huelva">Huelva</option>
                    <option value="Huesca">Huesca</option>
                    <option value="illesbalIlles Balearsears">Illes Balears</option>
                    <option value="Jaén">Jaén</option>
                    <option value="A Coruña">A Coruña</option>
                    <option value="La Rioja">La Rioja</option>
                    <option value="León">León</option>
                    <option value="Lleida">Lleida</option>
                    <option value="lugo">Lugo</option>
                    <option value="Madrid">Madrid</option>
                    <option value="Málaga">Málaga</option>
                    <option value="Melilla">Melilla</option>
                    <option value="Murcia">Murcia</option>
                    <option value="Navarra">Navarra</option>
                    <option value="Ourense">Ourense</option>
                    <option value="Palencia">Palencia</option>
                    <option value="Pontevedra">Pontevedra</option>
                    <option value="Salamanca">Salamanca</option>
                    <option value="Segovia">Segovia</option>
                    <option value="Sevilla">Sevilla</option>
                    <option value="Soria">Soria</option>
                    <option value="Tarragona">Tarragona</option>
                    <option value="Santa Cruz de Tenerife">
                      Santa Cruz de Tenerife
                      </option>
                    <option value="Teruel">Teruel</option>
                    <option value="Toledo">Toledo</option>
                    <option value="Valencia">Valencia</option>
                    <option value="Valladolid">Valladolid</option>
                    <option value="vizcVizcayaaya">Vizcaya</option>
                    <option value="Zamora">Zamora</option>
                    <option value="Zaragoza">Zaragoza</option>
                  </Form.Control>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Entrenador
                  </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control form-control-sm mt-0"
                    value={inputTeamCoach}
                    onChange={updateTeamCoach}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  2º Entrenador
                  </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control form-control-sm mt-0"
                    value={inputTeamCoach2}
                    onChange={updateTeamCoach2}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Email
                  </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control form-control-sm mt-0"
                    value={inputTeamEmail}
                    onChange={updateTeamEmail}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Teléfono
                  </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control form-control-sm mt-0"
                    value={inputTeamPhone}
                    onChange={updateTeamPhone}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="col text-right">
            <button className="btn btn-light font-weight-bold" onClick={props.handleCloseEditTeam}>Cancelar</button>
          </div>
          <div className="col">
            <button className="btn btn-warning font-weight-bold" onClick={editCurrentTeam}>Guardar</button>
          </div>
          {fetchError &&
            <div className="col">
              <div className="bg-danger">{fetchError}</div>
            </div>
          }
        </div>
      </Wrapper2>
    </Wrapper>
  );
};

const mapStateToProps = (state: IGlobalState) => ({ //Send Props to redux
  leagueTeams: state.leagueTeams,
  leagues: state.leagues,
  DeleteLeagueId: state.TournamentId,
  putTeamById: action.putTeamById
});

export default connect(mapStateToProps)(EditTeamModal);

import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { Button, InputGroup, Form, Table, Modal, Alert } from "react-bootstrap";
import { getUserLocalStorage } from '../../utils/localStorageUtils';
import { tournamentsByUserAction } from "../../redux/actions/tournamentActions";

// ********* Styles - Styled Components - CSSINJS **********
const TableHead = styled.thead`
  font-family: "Roboto", sans-serif;
`;
const Title = styled.span`
  font-size: 2.3em;
  font-family: "Source Sans Pro", sans-serif;
  color: #bdbdbd;
  text-transform: uppercase;
`;


const Management = ({ tournaments, tournamentsByUserAction }) => {

    useEffect(() => {
        tournamentsByUserAction(getUserLocalStorage().id);
    }, []);

    return (
        // <div className="container-fluid" style={token ? { marginBottom: '100px', fontFamily: "'Source Sans Pro', sans-serif" } : { margin: '120px 0', fontFamily: "'Source Sans Pro', sans-serif" }}>
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-10">
                    <Title>Tus ligas:</Title>
                </div>
            </div>
            <div className="row mt-1 justify-content-center">
                <div className="col-10 p-3 text-center">
                    <Table
                        responsive="md"
                        variant="dark"
                        striped
                        hover
                        className=" border border-secondary"
                    >
                        <TableHead>
                            <tr>
                                <th />
                                <th>
                                    NOMBRE
                                    <img
                                        src="/images/other/sort.png"
                                        className="ml-2 mb-1"
                                        width="15"
                                        // onClick={() => toggleSortByName()}
                                        alt=""
                                    />
                                </th>
                                {/* {token && <th>Administrador</th>} */}
                                <th>DEPORTE</th>
                                <th>MODALIDAD</th>
                                {/* <th>Nº EQUIPOS</th> */}
                                <th>FECHA CREACIÓN</th>
                                {/* {!token && <>
                    <th />
                    <th />
                  </>
                  } */}
                            </tr>
                        </TableHead>
                        <tbody>
                            {tournaments.map((tournament, index) => (
                                <tr key={index}>
                                    <td className="p-1 align-middle">{tournament.Id}</td>
                                    <td className="text-warning p-0 align-middle"
                                    // onClick={() => (
                                    //     setTimeout(() => props.history.push("/management/leagueDetails/" + l.TournamentId), 1000)
                                    // )}
                                    >
                                        {tournament.name}
                                    </td>
                                    {/* {!token && <td className="p-1 align-middle">{l.NameAdmin}</td>} */}
                                    <td className="p-1 align-middle">{tournament.sport}</td>
                                    <td className="p-1 align-middle">{tournament.category}</td>
                                    {/* <td className="p-1 align-middle">
                                        <div className="row">
                                            <div className="col text-center">{l.NTeams}</div>
                                        </div>
                                    </td> */}
                                    <td className="p-1 align-middle">{tournament.createdate}</td>
                                    {/* {token &&  */}
                                    <>
                                        <td className="p-1 align-middle">
                                            <img
                                                src="/images/other/edit.png"
                                                width="15"
                                                alt=""
                                            // onClick={() => funcionEditLeague(l.TournamentId)}
                                            />
                                        </td>

                                        <td className="p-1 cursor-pointer  align-middle">
                                            <Button
                                                variant="danger"
                                                className="pt-0 pb-0 pl-3 pr-3"
                                                size="sm"
                                            // onClick={() => funcionDeleteLeague(l.TournamentId)}
                                            >
                                                Eliminar
                                            </Button>
                                        </td>
                                    </>
                                    {/* } */}

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            {/* {token &&  */}
            <>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <InputGroup size="sm">
                            <InputGroup.Prepend>
                                <InputGroup.Text
                                    id="inputGroup-sizing-sm"
                                    className="bg-secondary border border-secondary text-light"
                                >
                                    Nombre de la liga*
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <input
                                type="text"
                                className="form-control form-control-sm bg-dark border border-secondary text-light"
                            // value={inputLeagueName}
                            // onChange={updateLeagueName}
                            // autoFocus
                            />
                        </InputGroup>
                    </div>
                    <div className="col-2">
                        <InputGroup size="sm">
                            <InputGroup.Prepend>
                                <InputGroup.Text
                                    id="inputGroup-sizing-sm"
                                    className="bg-secondary border border-secondary text-light"
                                >
                                    Deporte*
                            </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                as="select"
                                // onChange={updateLeagueSport}
                                className="bg-dark border border-secondary text-light"
                            >
                                <option>Fútbol</option>
                            </Form.Control>
                        </InputGroup>
                    </div>
                    <div className="col-2">
                        <InputGroup size="sm">
                            <InputGroup.Prepend>
                                <InputGroup.Text
                                    id="inputGroup-sizing-sm"
                                    className="bg-secondary border border-secondary text-light"
                                >
                                    Categoría*
                        </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                as="select"
                                // onChange={updateLeagueCategory}
                                className="bg-dark border border-secondary text-light"
                            >
                                <option>Fútbol 11</option>
                                <option>Fútbol 7</option>
                                <option>Fútbol Sala</option>
                                <option>Fútbol(otros)</option>
                            </Form.Control>
                        </InputGroup>
                    </div>
                    <div className="col-2 text-center align-self-center">
                        <Button
                            variant="warning"
                            // onClick={sendLeague}
                            className="font-weight-bold text-dark pl-3 pr-3 btn-sm"
                        >
                            <img
                                src="/images/other/plus.png"
                                className="mr-2 align-middle"
                                width="17"
                                alt=""
                            />
                            <span className="align-middle">CREAR LIGA</span>
                        </Button>
                    </div>
                </div>
            </>
            {/* } */}
        </div>
    )
}

const mapStateToProps = state => {
    const { tournamentReducer } = state;
    return {
        tournaments: tournamentReducer.tournaments
    }
};

const mapDispatchToProps = {
    tournamentsByUserAction
};


export default connect(mapStateToProps, mapDispatchToProps)(Management);

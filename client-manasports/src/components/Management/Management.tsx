import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { Button, InputGroup, Form, Table } from "react-bootstrap";
import { getUserLocalStorage } from '../../utils/localStorageUtil';
import { tournamentsByUserAction, newTournamentAction, deleteTournamentAction } from "../../redux/actions/tournamentActions";
import { IGlobalState } from "../../redux/reducers/reducers";
import { useHistory } from "react-router-dom";
import DeleteTournamentModal from '../Generic/Modals/DeleteTournamentModal';
import { sportsObject } from '../../utils/sportsUtil';

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

interface IProps {
    tournaments: any;
    tournamentsByUserAction: any;
    newTournamentAction: any;
    deleteTournamentAction: any;
}

const Management: React.FC<IProps> = ({ tournaments, tournamentsByUserAction, newTournamentAction, deleteTournamentAction }) => {

    const initialState = {
        name: '',
        sport: sportsObject[0].sport,
        category: sportsObject[0].category[0],
        createdate: new Date().toLocaleDateString(),
        UserId: getUserLocalStorage().id
    }

    let history = useHistory();

    const [newTournament, setNewTournament] = useState(initialState);
    const [showDeleteTournamentModal, setShowDeleteTournamentModal] = useState(false);
    const [infoDeleteTournament, setInfoDeleteTournament] = useState({});

    const onChange = (e: any) => {
        let { name, value } = e.target;
        setNewTournament(prevState => ({ ...prevState, [name]: value }))
    }

    const sendInfoNewTournament = () => {
        newTournamentAction(newTournament);
        tournamentsByUserAction(getUserLocalStorage().id);
    }

    const sendInfoDeleteTournament = (tournamentId: any, tournamentName: any) => {
        setInfoDeleteTournament({ id: tournamentId, name: tournamentName })
        setShowDeleteTournamentModal(true);
    }

    let sportSelected = sportsObject.filter(sportList => sportList.sport === newTournament.sport);

    useEffect(() => {
        console.log(sportSelected[0].category[0])
        setNewTournament(prevState => ({ ...prevState, category: sportSelected[0].category[0] }))
    }, [newTournament.sport])

    useEffect(() => {
        tournamentsByUserAction(getUserLocalStorage().id);
    }, []);

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-10">
                        <Title>Your tournaments: </Title>
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
                                        NAME
                                    <img
                                            src="/images/other/sort.png"
                                            className="ml-2 mb-1"
                                            width="15"
                                            // onClick={() => toggleSortByName()}
                                            alt=""
                                        />
                                    </th>
                                    {/* {token && <th>Administrador</th>} */}
                                    <th>SPORT</th>
                                    <th>CATEGORY</th>
                                    {/* <th>Nº EQUIPOS</th> */}
                                    <th>CREATE DATE</th>
                                    {/* {!token && <>
                    <th />
                    <th />
                  </>
                  } */}
                                </tr>
                            </TableHead>
                            <tbody>
                                {tournaments.map((tournament: any, index: any) => (
                                    <tr key={index}>
                                        <td className="p-1 align-middle">{tournament.Id}</td>
                                        <td className="text-warning p-0 align-middle" onClick={() => history.push(`/management/TournamentInfo/${getUserLocalStorage().id}/${tournament.Id}`)} >
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
                                                    onClick={() => sendInfoDeleteTournament(tournament.Id, tournament.name)}
                                                >
                                                    Delete
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
                                        Tournament´s name*
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control form-control-sm bg-dark border border-secondary text-light"
                                    value={newTournament.name}
                                    onChange={onChange}
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
                                        Sport*
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    as="select"
                                    name="sport"
                                    onChange={onChange}
                                    className="bg-dark border border-secondary text-light"
                                >
                                    {sportsObject.map((sportList, i) =>
                                        <option key={i}>{sportList.sport} </option>
                                    )};
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
                                        Category*
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    as="select"
                                    name="category"
                                    onChange={onChange}
                                    className="bg-dark border border-secondary text-light"
                                >
                                    {sportSelected[0].category.map((categoryList, i) =>
                                        <option key={i}>{categoryList} </option>
                                    )}
                                </Form.Control>
                            </InputGroup>
                        </div>
                        <div className="col-2 text-center align-self-center">
                            <Button
                                variant="warning"
                                onClick={sendInfoNewTournament}
                                className="font-weight-bold text-dark pl-3 pr-3 btn-sm"
                            >
                                <img
                                    src="/images/other/plus.png"
                                    className="mr-2 align-middle"
                                    width="17"
                                    alt=""
                                />
                                <span className="align-middle">CREATE TOURNAMENT</span>
                            </Button>
                        </div>
                    </div>
                </>
                {/* } */}
            </div>
            {showDeleteTournamentModal &&
                <DeleteTournamentModal
                    showModal={showDeleteTournamentModal}
                    setShowModal={setShowDeleteTournamentModal}
                    infoDeleteTournament={infoDeleteTournament}
                    deleteTournamentAction={deleteTournamentAction}
                />
            }
        </>
    )
}

const mapStateToProps = (state: IGlobalState) => {
    const { tournamentReducer } = state;
    return {
        tournaments: tournamentReducer.tournaments
    }
};

const mapDispatchToProps = {
    tournamentsByUserAction,
    deleteTournamentAction,
    newTournamentAction
};


export default connect(mapStateToProps, mapDispatchToProps)(Management);

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { Button, Table } from "react-bootstrap";
import { getUserLocalStorage } from '../../utils/localStorageUtil';
import { tournamentsByUserAction, newTournamentAction, deleteTournamentAction } from "../../redux/actions/tournamentActions";
import { IGlobalState } from "../../redux/reducers/reducers";
import { useHistory } from "react-router-dom";
import CreateTournamentModal from '../Generic/Modals/CreateTournamentModal';
import DeleteTournamentModal from '../Generic/Modals/DeleteTournamentModal';

// ********* Styles - Styled Components - CSSINJS **********
const Title = styled.span`
  font-size: 2.3em;
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

    let history = useHistory();

    const [showCreateTournamentModal, setShowCreateTournamentModal] = useState(false);
    const [showDeleteTournamentModal, setShowDeleteTournamentModal] = useState(false);
    const [infoDeleteTournament, setInfoDeleteTournament] = useState({});

    const sendInfoDeleteTournament = (tournamentId: any, tournamentName: any) => {
        setInfoDeleteTournament({ id: tournamentId, name: tournamentName })
        setShowDeleteTournamentModal(true);
    }

    useEffect(() => {
        tournamentsByUserAction(getUserLocalStorage().id);
    }, []);

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col">
                        <Title>Your tournaments: </Title>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8 text-white align-self-center">FILTROS FILTROS FILTROS</div>
                    <div className="col-4 text-right align-self-center">
                        <Button
                            variant="warning"
                            onClick={() => setShowCreateTournamentModal(true)}
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
                <div className="row mt-1 justify-content-center">
                    <div className="col p-3 text-center">
                        <Table
                            responsive="md"
                            variant="dark"
                            striped
                            hover
                            className="border border-secondary"
                        >
                            <thead>
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
                                    <th>SPORT</th>
                                    <th>CATEGORY</th>
                                    <th>CREATE DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tournaments.map((tournament: any, index: any) => (
                                    <tr key={index}>
                                        <td className="p-1 align-middle">{tournament.Id}</td>
                                        <td className="text-warning p-0 align-middle" onClick={() => history.push(`/management/TournamentInfo/${getUserLocalStorage().id}/${tournament.Id}`)} >
                                            {tournament.name}
                                        </td>
                                        <td className="p-1 align-middle">{tournament.sport}</td>
                                        <td className="p-1 align-middle">{tournament.category}</td>
                                        <td className="p-1 align-middle">{tournament.createdate}</td>
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
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            {showDeleteTournamentModal &&
                <DeleteTournamentModal
                    showModal={showDeleteTournamentModal}
                    setShowModal={setShowDeleteTournamentModal}
                    infoDeleteTournament={infoDeleteTournament}
                    deleteTournamentAction={deleteTournamentAction}
                />
            }
            {showCreateTournamentModal &&
                <CreateTournamentModal
                    showModal={showCreateTournamentModal}
                    setShowModal={setShowCreateTournamentModal}
                    newTournamentAction={newTournamentAction}
                    tournamentsByUserAction={tournamentsByUserAction}
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

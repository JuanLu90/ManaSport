import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { Table } from "react-bootstrap";
import { getUserLocalStorage } from '../../utils/localStorageUtil';
import { tournamentsByUserAction, newTournamentAction, deleteTournamentAction } from "../../redux/actions/tournamentActions";
import { IGlobalState } from "../../redux/reducers/reducers";
import { useHistory } from "react-router-dom";
import CreateTournamentModal from '../Generic/Modals/CreateTournamentModal';
import DeleteTournamentModal from '../Generic/Modals/DeleteTournamentModal';

// ********* Styles - Styled Components - CSSINJS **********

const Button = styled.button`
    height: 35px;

    &:focus {
        box-shadow: none;
    }
`;

const SpanFormat = styled.span`
    font-size: 0.75rem;
    color: lightgrey;
`;

const SpanCreateDate = styled.span`
    font-size: 0.75rem;
    color: lightgrey;
    background: #20242A;
    height: fit-content;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
`;

const SpanCategoryt = styled.span`
    font-size: 0.85rem;
`;

const ITrash = styled.i`
    cursor: pointer;

    &:hover {
        color: #DC7982 !important;
        transition: 0.2s;
    }
`;
const SearchInput = styled.input`
    width: 100%;
    height: 30px;
    color: #D9D9DC;
    background-color: #2D2F37;
    border: 1px solid gray;
    border-radius: 3px;
    padding-left: 5px;
    margin-bottom: 5px;
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
                <div className="row justify-content-center py-5">
                    <div className="col d-flex justify-content-between align-items-center">
                        <span className="h1 text-secondary m-0">YOUR TOURNAMENTS: </span>
                        <Button
                            onClick={() => setShowCreateTournamentModal(true)}
                            className="btn btn-warning btn-sm d-flex align-items-center font-weight-bold text-dark px-2"
                        >
                            <i className="fas fa-lg fa-plus-circle mr-2"></i>
                            <span className="align-middle">CREATE TOURNAMENT</span>
                        </Button>
                    </div>
                </div>
                <div className="row text-white">
                    <div className="col-3 bg-dark mr-2">
                        FILTERS FILTERS
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col p-0">
                                <SearchInput type="text" placeholder="Search by name..." name="" id="" />
                            </div>
                        </div>
                        {tournaments.map((tournament: any, index: any) => (
                            <div className="row bg-dark py-3 border-bottom border-secondary" key={index}>
                                <div className="col-1 d-flex justify-content-center align-items-center">
                                    <i className="far fa-lg fa-futbol"></i>
                                </div>
                                <div className="col-5">
                                    <div className="row">
                                        <div className="col">
                                            <span
                                                className="text-warning"
                                                onClick={() => history.push(`/management/TournamentInfo/${getUserLocalStorage().id}/${tournament.Id}`)}
                                                title="Name"
                                            >
                                                {tournament.name}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <SpanFormat title="Format">{tournament.format}</SpanFormat>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 d-flex align-items-center">
                                    <SpanCategoryt title="Category">{tournament.category}</SpanCategoryt>
                                </div>
                                <div className="col-3 d-flex justify-content-end">
                                    <SpanCreateDate title="Create Date">{tournament.createdate}</SpanCreateDate>
                                </div>
                                <div className="col-1 d-flex justify-content-center align-items-center">
                                    <ITrash
                                        className="fas fa-trash text-secondary"
                                        onClick={() => sendInfoDeleteTournament(tournament.Id, tournament.name)}
                                        title="Delete Tournament"
                                    />
                                </div>
                            </div>
                        ))}
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

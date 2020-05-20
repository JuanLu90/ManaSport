import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { getUserLocalStorage } from '../../utils/localStorageUtil';
import { tournamentsByUserAction, newTournamentAction, deleteTournamentAction } from "../../redux/actions/tournamentActions";
import { IGlobalState } from "../../redux/reducers/reducers";
import { useHistory } from "react-router-dom";
import CreateTournamentModal from '../Generic/Modals/CreateTournamentModal';
import DeleteTournamentModal from '../Generic/Modals/DeleteTournamentModal';
import { sportsObject, competitionFormatsList, ageGroupsList, KnockoutRoundsList } from '../../utils/competitionUtil';

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

const DivTournament = styled.div`
    &:hover {
        background-color: #434D5F !important;
        cursor: pointer;
    }
`;

const ColFilters = styled.div`
    height: 300px;
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

const Select = styled.select`
  width: 100%;
  height: 30px;
  color: #D9D9DC;
  background-color: #2D2F37;
  border: 1px solid gray;
  border-radius: 3px;
  padding-left: 5px;
  margin-left: 10px;

  &:focus {
    outline: 0;
  }

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

interface IProps {
    tournaments: any;
    tournamentsByUserAction: any;
    newTournamentAction: any;
    deleteTournamentAction: any;
}

const Management: React.FC<IProps> = ({ tournaments, tournamentsByUserAction, newTournamentAction, deleteTournamentAction }) => {

    const initialFilters = {
        UserId: getUserLocalStorage().id,
        sport: '',
    }

    const [filtersTournaments, setFiltersTournaments] = useState(initialFilters);

    let history = useHistory();

    const [showCreateTournamentModal, setShowCreateTournamentModal] = useState(false);
    const [showDeleteTournamentModal, setShowDeleteTournamentModal] = useState(false);
    const [infoDeleteTournament, setInfoDeleteTournament] = useState({});

    const sendInfoDeleteTournament = (tournamentId: any, tournamentName: any) => {
        setInfoDeleteTournament({ id: tournamentId, name: tournamentName })
        setShowDeleteTournamentModal(true);
    }

    useEffect(() => {
        tournamentsByUserAction(filtersTournaments);
    }, [filtersTournaments]);

    const onChange = (e: any) => {
        let { name, value, type } = e.target;
        if (type === "checkbox") value = e.target.checked
        setFiltersTournaments(prevState => ({ ...prevState, [name]: value }))
      }

    const goToTournament = (id: number) => {
        return history.push(`/management/TournamentInfo/${getUserLocalStorage().id}/${id}`);
    }

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
                    <ColFilters className="col-3 bg-dark mr-2">
                        <Select name="sport" onChange={onChange}>
                        <option value=""> - Select a sport - </option>
                            {sportsObject.map((sportList, i) =>
                                <option key={i}>{sportList.sport} </option>
                            )};
                        </Select>
                    </ColFilters>
                    <div className="col">
                        <div className="row">
                            <div className="col p-0">
                                <SearchInput type="text" placeholder="Search by name..." name="" id="" />
                            </div>
                        </div>
                        {tournaments.map((tournament: any, index: any) => (
                            <DivTournament className="row py-3 bg-dark border-bottom border-secondary" key={index}>
                                <div className="col-1 d-flex justify-content-center align-items-center" onClick={() => goToTournament(tournament.Id)}>
                                    <img
                                        src={`/images/other/${tournament.sport === "Football" ? 'football.png' : 'tennis.png'}`}
                                        width="25"
                                        alt={tournament.sport === "Football" ? "Football Image" : "Tennis Image"}
                                        title={tournament.sport === "Football" ? "Football" : "Tennis"}
                                    />
                                </div>
                                <div className="col-5" onClick={() => goToTournament(tournament.Id)}>
                                    <div className="row">
                                        <div className="col">
                                            <span className="text-warning" title="Name">
                                                {tournament.name}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <SpanFormat title="Format">{tournament.category}</SpanFormat>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 d-flex align-items-center" onClick={() => goToTournament(tournament.Id)}>
                                    <SpanCategoryt title="Category">{tournament.format}</SpanCategoryt>
                                </div>
                                <div className="col-3 d-flex justify-content-end" onClick={() => goToTournament(tournament.Id)}>
                                    <SpanCreateDate title="Create Date">{tournament.createdate}</SpanCreateDate>
                                </div>
                                <div className="col-1 d-flex justify-content-center align-items-center">
                                    <ITrash
                                        className="fas fa-trash text-secondary"
                                        onClick={() => sendInfoDeleteTournament(tournament.Id, tournament.name)}
                                        title="Delete Tournament"
                                    />
                                </div>
                            </DivTournament>
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

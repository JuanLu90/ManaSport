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
    position: relative;

    &:hover {
        background-color: #434D5F !important;
        cursor: pointer;
    }
`;

const SpanGreenIsStarted = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    border-top: .5em solid #2db343;
    border-right: .5em solid transparent;
    border-bottom-width: .8em;
    border-left-width: .8em;
`;

const SpanRedIsStarted = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    border-top: .5em solid #f30000;
    border-right: .5em solid transparent;
    border-bottom-width: .8em;
    border-left-width: .8em;
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

const CheckBoxWrapper = styled.div`
  position: relative;
  display: inline;
`;

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 20px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 20px;
  &:checked + ${CheckBoxLabel} {
    background: #2db343;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 14px;
      height: 14px;
      margin-left: 25px;
      transition: 0.2s;
    }
  }
`;

const DivFiltersSelected = styled.div`
    position: absolute;
    width: 100%;
    height:60px;
    bottom: 0;
    left: 0;
    padding: 10px 0;
    background: #434D5F;

    span {
        margin: 0 10px;
        padding: 3px 5px;
        font-size: 0.85rem;
        background-color: #2D333D;
        border-radius: 5px;
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
        name: '',
        sport: '',
        isStarted: ''
    }

    const [filtersTournaments, setFiltersTournaments] = useState(initialFilters);
    console.log(filtersTournaments)
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
                        <div className="row my-3">
                            <div className="col">
                                <Select name="sport" onChange={onChange}>
                                    <option value=""> - Select a sport - </option>
                                    {sportsObject.map((sportList, i) =>
                                        <option key={i}>{sportList.sport} </option>
                                    )};
                                </Select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col d-flex justify-content-between">
                                <span>Already started: </span>
                                <CheckBoxWrapper>
                                    <CheckBox id="checkbox" name="isStarted" type="checkbox" onChange={onChange} />
                                    <CheckBoxLabel htmlFor="checkbox" />
                                </CheckBoxWrapper>
                            </div>
                        </div>
                        <DivFiltersSelected>
                            {filtersTournaments.sport && <span>{filtersTournaments.sport}</span>}
                            {filtersTournaments.isStarted && <span>Started</span>}
                        </DivFiltersSelected>
                    </ColFilters>
                    <div className="col">
                        <div className="row">
                            <div className="col p-0">
                                <SearchInput
                                    type="text"
                                    name="name"
                                    placeholder="Search by name..."
                                    value={filtersTournaments.name} onChange={onChange}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        {tournaments.length === 0 ?
                            <div className="text-center">
                                <span>There are no tournaments</span>
                            </div>
                            :
                            tournaments.map((tournament: any, index: any) => (
                                <DivTournament className="row py-3 bg-dark border-bottom border-secondary" key={index}>
                                    {tournament.isStarted ? <SpanGreenIsStarted /> : <SpanRedIsStarted />}
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

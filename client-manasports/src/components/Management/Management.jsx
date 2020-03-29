// DEPENDENCES
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { tournamentsByUserAction, qualificationTournamentAction, matchesTournamentAction } from "../../redux/actions/tournamentActions";
import QualificationTournament from './TournamentInfo/QualificationTournament';
import ResultsTournament from './TournamentInfo/ResultsTournament';
import styled from "styled-components";
import { Dropdown, } from "react-bootstrap";

const RowInfoTournament = styled.div`
  font-size: 0.8rem;
`;

const Management = ({
  tournamentsByUserAction,
  qualificationTournamentAction,
  matchesTournamentAction,
  tournaments,
  qualification,
  matches,
  user
}) => {

  const [tournamentSelected, setTournamentSelected] = useState({});

  useEffect(() => {
    tournamentsByUserAction(user.id);
  }, [user]);

  useEffect(() => {
    if (tournamentSelected.Id) {
      qualificationTournamentAction(tournamentSelected.Id);
      matchesTournamentAction(tournamentSelected.Id, 1);
    }
  }, [tournamentSelected]);


  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Select a tournament
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {tournaments.map((tour, index) =>
                <Dropdown.Item key={index} onClick={(() => setTournamentSelected(tour))}>{tour.name}</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <RowInfoTournament className="row">
        <div className="col-5">
          {tournamentSelected.Id && <QualificationTournament qualification={qualification} />}
        </div>
        <div className="col-7">
          {tournamentSelected.Id && <ResultsTournament matches={matches} />}
        </div>
      </RowInfoTournament>
    </div>
  );
};

const mapStateToProps = state => {
  const { userReducer, tournamentReducer } = state;
  return {
    user: userReducer.user,
    tournaments: tournamentReducer.tournaments,
    qualification: tournamentReducer.qualification,
    matches: tournamentReducer.matches
  }
}

const mapDispatchToProps = {
  tournamentsByUserAction,
  qualificationTournamentAction,
  matchesTournamentAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Management);

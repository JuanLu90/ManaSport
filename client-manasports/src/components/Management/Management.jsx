// DEPENDENCES
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { tournamentsByUserAction, qualificationTournamentAction } from "../../redux/actions/tournamentActions";
import QualificationTournament from './TournamentInfo/QualificationTournament';
import ResultsTournament from './TournamentInfo/ResultsTournament';
import styled from "styled-components";
import { Dropdown, } from "react-bootstrap";
import { getUserLocalStorage } from '../../utils/localStorageUtils';

const RowInfoTournament = styled.div`
  font-size: 0.8rem;
`;

const Management = ({
  tournamentsByUserAction,
  qualificationTournamentAction,
  tournaments,
  qualification,
  matches,
  matchUpdated
}) => {

  const [tournamentSelected, setTournamentSelected] = useState({});

    let matchtToUpdated = matches.filter(match => matchUpdated && match.Id === matchUpdated.Id);

  useEffect(() => {
    tournamentsByUserAction(getUserLocalStorage().id);
  }, []);


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
          {tournamentSelected.Id &&
            <QualificationTournament
              matchtToUpdated={matchtToUpdated}
              tournamentSelected={tournamentSelected}
              qualification={qualification}
            />
          }
        </div>
        <div className="col-7">
          {tournamentSelected.Id &&
            <ResultsTournament
              tournamentSelected={tournamentSelected}
              matches={matches}
            />
          }
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
    matches: tournamentReducer.matches,
    matchUpdated: tournamentReducer.matchUpdated
  }
}

const mapDispatchToProps = {
  tournamentsByUserAction,
  qualificationTournamentAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Management);

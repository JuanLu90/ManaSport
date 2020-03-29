// DEPENDENCES
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { tournamentsByUserAction, qualificationTournamentAction, matchesTournamentAction } from "../../redux/actions/tournamentActions";
import TournamentInfo from '../Management/TournamentInfo';
import styled from "styled-components";

const RowTourList = styled.div`
background-color: #343a40;
color: white;
margin: 5px;
`

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
      MANAGEMENT
      <div className="row">
        <div className="col-3">
          {tournaments.map((tour, index) =>
            <RowTourList className="row" key={index}>
              <div className="col d-flex justify-content-between" onClick={(() => setTournamentSelected(tour))}>
                {tour.name}
              </div>
            </RowTourList>
          )}
        </div>
        <div className="col-9">
          {tournamentSelected.Id && <TournamentInfo qualification={qualification} matches={matches} />}
        </div>
      </div>
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

// DEPENDENCES
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { tournamentsByUserAction, qualificationTournamentAction } from "../../redux/actions/tournamentActions";
import TournamentInfo from '../Management/TournamentInfo';
import styled from "styled-components";

const RowTourList = styled.div`
background-color: #343a40;
color: white;
margin: 5px;
`
const TourInfo = styled.div`
background-color: #343a40;
color: white;
`

const Management = props => {

  const { tournamentsByUserAction, qualificationTournamentAction, tournaments, qualification, user } = props;

  const [tournamentSelected, setTournamentSelected] = useState({});

  useEffect(() => {
    tournamentsByUserAction(user.id);
  }, [user]);

  useEffect(() => {
    if(tournamentSelected.Id) qualificationTournamentAction(tournamentSelected.Id);
  }, [tournamentSelected]);

  return (
    <div className="container">
      MANAGEMENT
      <div className="row">
        <div className="col-4">
          {tournaments.map((tour, index) =>
            <RowTourList className="row" key={index}>
              <div className="col d-flex justify-content-between" onClick={(() => setTournamentSelected(tour))}>
                {tour.name}
              </div>
            </RowTourList>
          )}
        </div>
        <div className="col-8">
          <TourInfo>
            {tournamentSelected.Id && <TournamentInfo qualification={qualification} />}
          </TourInfo>
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
    qualification: tournamentReducer.qualification
  }
}

const mapDispatchToProps = {
  tournamentsByUserAction,
  qualificationTournamentAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Management);

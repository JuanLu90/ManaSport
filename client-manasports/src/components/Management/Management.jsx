// DEPENDENCES
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { tournamentsByUserAction } from "../../redux/actions/tournamentActions";
import styled from "styled-components";

const Management = props => {

  const ColTour = styled.div`
  background-color: #343a40;
  color: white;
  margin: 5px;
`

  const { tournamentsByUserAction, tournaments, user } = props;

  useEffect(() => {
    tournamentsByUserAction(user.id);
  }, [user]);




  return (
    <div className="container">
      MANAGEMENT
      <div className="row">
        <div className="col-5">
          {tournaments.map(tour =>
            <div className="row">
              <ColTour className="col">{tour.name}</ColTour>
            </div>
          )}
        </div>
        <div className="col-7">
          INFO
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { userReducer, tournamentReducer } = state;
  return {
    user: userReducer.user,
    tournaments: tournamentReducer.tournaments
  }
}

const mapDispatchToProps = {
  tournamentsByUserAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Management);

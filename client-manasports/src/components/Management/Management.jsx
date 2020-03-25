// DEPENDENCES
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { tournamentsByUserAction } from "../../redux/actions/tournamentActions";
import styled from "styled-components";

const Management = props => {

  const RowTourList = styled.div`
    background-color: #343a40;
    color: white;
    margin: 5px;
  `
  const TourInfo = styled.div`
    background-color: #343a40;
    color: white;
  `



  const { tournamentsByUserAction, tournaments, user } = props;

  const [tournamentSelected, setTournamentSelected] = useState({});

  useEffect(() => {
    tournamentsByUserAction(user.id);
  }, [user]);

  return (
    <div className="container">
      MANAGEMENT
      <div className="row">
        <div className="col-5">
          {tournaments.map((tour, index) =>
            <RowTourList className="row" key={index}>
              <div className="col d-flex justify-content-between">
                {tour.name}
                <button onClick={(() => setTournamentSelected(tour))}>SELECT</button>
              </div>
            </RowTourList>
          )}
        </div>
        <div className="col-7">
          <TourInfo>
            <span>  INFO TOURNAMENT</span>
            {tournamentSelected &&
              <div>
                <div> {tournamentSelected.name} </div>
                <div> {tournamentSelected.sport} </div>
                <div> {tournamentSelected.category} </div>
                <div> {tournamentSelected.createDate} </div>
              </div>
            }
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
    tournaments: tournamentReducer.tournaments
  }
}

const mapDispatchToProps = {
  tournamentsByUserAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Management);

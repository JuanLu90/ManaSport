// DEPENDENCES
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { tournamentsByUserAction } from "../../../redux/actions/tournamentActions";
import QualificationTournament from './QualificationTournament';
import ResultsTournament from './ResultsTournament';
import styled from "styled-components";
import { IGlobalState } from '../../../redux/reducers/reducers';
import { createBrowserHistory } from "history";

const RowInfoTournament = styled.div`
  font-size: 0.8rem;
`;

interface IProps {
  tournamentsByUserAction: any;
  tournaments: any;
  qualification: any;
  matches: any;
  matchUpdated: any;
}

const TournamentInfo: React.FC<IProps> = ({
  tournamentsByUserAction,
  tournaments,
  qualification,
  matches,
  matchUpdated
}) => {

  // let matchtToUpdated = matches.filter((match: any) => matchUpdated && match.Id === matchUpdated.Id);

  const history = createBrowserHistory({});
  const path: any = history.location.pathname;
  let tournamentId = Number(path.split(["/"]).slice(-1)[0]);
  let userId = path.split(["/"]).slice(-2)[0];

  useEffect(() => {
    tournamentsByUserAction(userId);
  }, []);

  const currentTournament = tournaments.filter((tournament: any) => tournaments.length > 0 && tournament.Id === tournamentId);

  return (
    <div className="container">
      <div className="row ">
        <div className="col m-3 text-center text-white h3">{currentTournament[0].name}</div>
      </div>
      {currentTournament[0] && currentTournament[0].isStarted ?
        <RowInfoTournament className="row">
          <div className="col-5">
            <QualificationTournament
              tournamentId={tournamentId}
              qualification={qualification}
              matchUpdated={matchUpdated}
            />
          </div>
          <div className="col-7">
            <ResultsTournament
              tournamentId={tournamentId}
              matches={matches}
              matchUpdated={matchUpdated}
            />
          </div>
        </RowInfoTournament>
        : 'Crea una liga'
      }
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => {
  const { tournamentReducer } = state;
  return {
    tournaments: tournamentReducer.tournaments,
    qualification: tournamentReducer.qualification,
    matches: tournamentReducer.matches,
    matchUpdated: tournamentReducer.matchUpdated
  }
}

const mapDispatchToProps = {
  tournamentsByUserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentInfo);

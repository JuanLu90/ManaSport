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
  qualification: any;
  matches: any;
  matchUpdated: any;
}

const TournamentInfo: React.FC<IProps> = ({
  tournamentsByUserAction,
  qualification,
  matches,
  matchUpdated
}) => {

  // let matchtToUpdated = matches.filter((match: any) => matchUpdated && match.Id === matchUpdated.Id);

  const history = createBrowserHistory({});
  const path: any = history.location.pathname;
  let tournamentId = path.split(["/"]).slice(-1)[0];
  let userId = path.split(["/"]).slice(-2)[0];

  useEffect(() => {
    tournamentsByUserAction(userId);
  }, []);

  return (
    <div className="container">
      <RowInfoTournament className="row">
        <div className="col-5">
          {tournamentId &&
            <QualificationTournament
              tournamentId={tournamentId}
              qualification={qualification}
              matchUpdated={matchUpdated}
            />
          }
        </div>
        <div className="col-7">
          {tournamentId &&
            <ResultsTournament
              tournamentId={tournamentId}
              matches={matches}
              matchUpdated={matchUpdated}
            />
          }
        </div>
      </RowInfoTournament>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => {
  const { tournamentReducer } = state;
  return {
    qualification: tournamentReducer.qualification,
    matches: tournamentReducer.matches,
    matchUpdated: tournamentReducer.matchUpdated
  }
}

const mapDispatchToProps = {
  tournamentsByUserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentInfo);

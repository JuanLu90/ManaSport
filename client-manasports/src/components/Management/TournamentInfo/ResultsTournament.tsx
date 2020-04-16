import React, { useEffect, useState, useCallback } from "react";
import { connect } from 'react-redux';
import { matchesTournamentAction } from "../../../redux/actions/tournamentActions";


import { Table } from "react-bootstrap";
import styled from "styled-components";
import ResultMatches from './ResultMatches';

const TableHead = styled.thead`
  font-family: "Roboto", sans-serif;
  color: #5e5e5e;
`;

const Tbody = styled.tbody`
  font-family: "Source Sans Pro", sans-serif;
`;

const SpanMatchday = styled.span`
  font-size: 0.87em;
`;

const DivCursor = styled.div`
  cursor: pointer;
`;

const TrMatchday = styled.th`
color: white;
font-weight: 300;
text-align: center;
  &:hover {
    filter: opacity(50%);
  }
`;

interface IProps {
  tournamentId: any;
  matches: any;
  matchesTournamentAction: any;
  matchUpdated: any;
}

const ResultsTournament: React.FC<IProps> = ({ tournamentId, matches, matchesTournamentAction, matchUpdated }) => {

  const [count, setCount] = useState(1);
  const matchdayAdd = () => {
    //Set +1 to matchday
    setCount(count + 1);
  };
  const matchdaySub = () => {
    //set -1 to matchday
    setCount(count > 1 ? count - 1 : count); // matchday cant be less than 1
  };
  const [matchResult, setMatchResult] = useState(false);
  const updatedResults = useCallback(() => setMatchResult(s => !s), []);

  useEffect(() => {
    matchesTournamentAction(tournamentId, count);
  }, [tournamentId, count, matchUpdated]);

  return (
    <Table
      responsive
      striped
      hover
      variant="dark"
      className="border border-secondary"
    >
      <TableHead>
        <tr>
          <TrMatchday>
            {count !== 1 && (
              <DivCursor onClick={matchdaySub}>
                <img
                  src="/images/other/arrow-left.png"
                  width="17"
                />
                <SpanMatchday>jornada {count - 1}</SpanMatchday>
              </DivCursor>
            )}
          </TrMatchday>
          <th />
          <th className="text-light text-center h5">JORNADA {count}</th>
          <th />
          <TrMatchday>
            <DivCursor onClick={matchdayAdd}>
              <SpanMatchday>jornada {count + 1}</SpanMatchday>
              <img src="/images/other/arrow-right.png" width="17" />
            </DivCursor>
          </TrMatchday>
        </tr>
      </TableHead>
      <Tbody>
        {matches.map((match: any, index: any) => (
          <ResultMatches
            key={index}
            match={match}
          />
        ))}
      </Tbody>
    </Table>
  )
}

const mapDispatchToProps = {
  matchesTournamentAction
};

export default connect(null, mapDispatchToProps)(ResultsTournament);

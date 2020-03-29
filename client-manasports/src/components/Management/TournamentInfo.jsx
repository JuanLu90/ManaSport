// DEPENDENCES
import React, { useState, useCallback } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import ResultMatches from '../Management/ResultMatches';

const WrapperTable = styled.div`
  background-color: #343a40;
  font-size: 0.8rem;
`;

const TableHead = styled.thead`
  font-family: "Roboto", sans-serif;
  font-size: 0.85rem;
  color: #5e5e5e;
`;
const ImgBadge = styled.img`
  height: 25px;
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
  &:hover {
    filter: opacity(50%);
  }
`;

const TournamentInfo = ({ qualification, matches }) => {

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


  return (
    <div className="row">
      <div className="col-6">
        <WrapperTable>
          <Table
            striped
            variant="dark"
            className="border border-secondary"
          >
            <TableHead>
              <tr>
                <th />
                <th />
                <th />
                <th className="p-2 text-center text-light">PTS</th>
                <th className="p-2 text-center text-light font-weight-light"> PJ</th>
                <th className="p-2 text-center text-light font-weight-light">PG</th>
                <th className="p-2 text-center text-light font-weight-light">PE</th>
                <th className="p-2 text-center text-light font-weight-light">PP</th>
              </tr>
            </TableHead>
            <Tbody>
              {qualification.map((team, index) => (
                <tr key={index}>
                  {index === 0 ? (
                    <td className="p-1 text-center bg-success rounded-right">
                      {1}
                    </td>
                  ) : (
                      <td className="p-1 text-center">{index + 1}</td>
                    )}
                  <td className="p-1 text-center">
                    {team.badge === null ? (
                      <ImgBadge
                        src="/images/badges-teams/default-badge.png"
                        alt=""
                      />
                    ) : (
                        <ImgBadge src={team.badge} alt="" />
                      )}
                  </td>
                  <td className="p-1 d-flex align-items-center">{team.TEAM}</td>
                  <td className="p-1 text-center">
                    <b>{team.PTS}</b>
                  </td>
                  <td className="p-1 text-center">{team.PJ}</td>
                  <td className="p-1 text-center">{team.PG}</td>
                  <td className="p-1 text-center">{team.PE}</td>
                  <td className="p-1 text-center">{team.PP}</td>
                </tr>
              ))}
            </Tbody>
          </Table>
        </WrapperTable>
      </div>
      <div className="col-6">
        <Table
          responsive
          striped
          hover
          variant="dark"
          className="border border-secondary"
        >
          <TableHead>
            <tr>
              <TrMatchday className="text-white font-weight-light">
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
              <th className="text-light h5">JORNADA {count}</th>
              <th />
              <TrMatchday className="text-white font-weight-light">
                <DivCursor onClick={matchdayAdd}>
                  <SpanMatchday>jornada {count + 1}</SpanMatchday>{" "}
                  <img src="/images/other/arrow-right.png" width="17" />
                </DivCursor>
              </TrMatchday>
            </tr>
          </TableHead>
          <Tbody>
            {matches.map((match, index) => (
              <ResultMatches
                key={index}
                match={match}
                updatedResults={updatedResults}
              />
            ))}
          </Tbody>
        </Table>
      </div>
    </div>

  );
};

export default TournamentInfo;

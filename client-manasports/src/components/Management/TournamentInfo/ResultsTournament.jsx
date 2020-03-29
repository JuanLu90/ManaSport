import React, { useState, useCallback } from "react";

import { Table } from "react-bootstrap";
import styled from "styled-components";
import ResultMatches from '../ResultMatches';

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
  &:hover {
    filter: opacity(50%);
  }
`;

const ResultsTournament = ({matches}) => {

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
    )
}

export default ResultsTournament;
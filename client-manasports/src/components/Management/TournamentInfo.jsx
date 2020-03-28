// DEPENDENCES
import React from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

const TableHead = styled.thead`
  font-family: "Roboto", sans-serif;
  color: #5e5e5e;
`;
const ImgBadge = styled.img`
  height: 28px;
`;

const Tbody = styled.tbody`
  font-family: "Source Sans Pro", sans-serif;
`;

const TournamentInfo = ({qualification}) => {

    return (
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
            <th className="p-2 text-center text-light font-weight-light">
              PJ
            </th>
            <th className="p-2 text-center text-light font-weight-light">
              PG
            </th>
            <th className="p-2 text-center text-light font-weight-light">
              PE
            </th>
            <th className="p-2 text-center text-light font-weight-light">
              PP
            </th>
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
              <td className="p-1">{team.TEAM}</td>
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
    );
};

export default TournamentInfo;

import React, { useEffect } from "react";
import styled from "styled-components";
import { Table } from "react-bootstrap";
import { qualificationTournamentAction } from "../../../redux/actions/tournamentActions";
import { connect } from 'react-redux';

const WrapperTable = styled.div`
  background-color: #343a40;
`;

const ImgBadge = styled.img`
  height: 25px;
`;

const Tbody = styled.tbody`
  font-family: "Source Sans Pro", sans-serif;
`;

interface IProps {
    tournamentId: any;
    qualification: any;
    qualificationTournamentAction: any;
    matchUpdated: any;
}

const QualificationTournament: React.FC<IProps> = ({ tournamentId, qualification, qualificationTournamentAction, matchUpdated }) => {
    
    useEffect(() => {
        qualificationTournamentAction(tournamentId);
    }, [tournamentId, matchUpdated]);

    return (
        <WrapperTable>
            <Table
                striped
                variant="dark"
                className="border border-secondary"
            >
                <thead>
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
                </thead>
                <Tbody>
                    {qualification.map((team: any, index: any) => (
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
    )
}



const mapDispatchToProps = {
    qualificationTournamentAction
};

export default connect(null, mapDispatchToProps)(QualificationTournament);



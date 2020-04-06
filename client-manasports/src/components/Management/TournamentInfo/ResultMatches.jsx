import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { matchTournamentEditAction } from "../../../redux/actions/tournamentActions";
import { useEffect } from "react";


const ImgBadge = styled.img`
  height: 28px;
`;
const TdMatchdayTeam = styled.td`
  width: 20%;
`;
const TdMatchdayBadge = styled.td`
  width: 5%;
`;
const TdMatchdayResult = styled.td`
width: 50%;
`;
const ImgArrow = styled.img`
  cursor: pointer;
  height: 16px;
`;

const ResultMatches = ({ match, matchTournamentEditAction }) => {

  const initialState = {
    Id: match.Id,
    date: match.date,
    localteam_score: match.localteam_score,
    awayteam_score: match.awayteam_score
  };

  const [infoMatch, setInfoMatch] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = useCallback(() => setEditMode(s => !s), []);


  const sendInfoMatchEdit = () => {
    matchTournamentEditAction(infoMatch);
    toggleEditMode();
  };

  const onChangeMatch = e => {
    const { name, value } = e.target;
    setInfoMatch(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    setInfoMatch(initialState);
  }, [match])

  const deleteResult = () => {
    matchTournamentEditAction({ ...infoMatch, localteam_score: null, awayteam_score: null });
  }
  // const token = localStorage.getItem("token"); //Token - Get the token stored from local storage


  return (
    <tr>
      <TdMatchdayTeam className="p-1 border-0 text-right align-middle">{match.localTeam} </TdMatchdayTeam>
      <TdMatchdayBadge className="p-1 border-0 align-middle">
        {match.localbadge === null ? <ImgBadge src="/images/badges-teams/default-badge.png" /> : <ImgBadge src={match.localbadge} alt="" />}
      </TdMatchdayBadge>
      <TdMatchdayResult className="p-1 border-0 d-flex justify-content-around m-auto">
        {!editMode && (
          <>
            {/* {token && */}
            <img
              src="/images/other/cancel.png"
              className="mr-3 align-self-center"
              alt=""
              title="Eliminar resultado"
              onClick={() => deleteResult()}
              style={{ width: '17px', height: '17px', cursor: 'pointer' }}
            />
            {/* } */}
            <div>
              {match.localteam_score === null &&
                match.awayteam_score === null
                ? match.date
                : <>
                  <div className="text-center">{match.localteam_score + "-" + match.awayteam_score}</div>
                  <div style={{ fontSize: '0.85em', color: '#bdc3c7' }}>{match.date}</div>
                </>

              }
            </div>
            {/* {token && */}
            <img
              src="/images/other/edit.png"
              className="ml-3 align-self-center"
              alt=""
              title="Editar resultado"
              onClick={toggleEditMode}
              style={{ width: '17px', height: '17px', cursor: 'pointer' }}
            />
            {/* } */}

          </>
        )}
        {editMode && (
          <>
            <ImgArrow src="/images/other/back.png" className="mr-2 align-self-center" onClick={toggleEditMode} title="Atrás" />
            <input
              type="text"
              name="localteam_score"
              id=""
              className="text-center"
              style={{ width: '40px' }}
              value={infoMatch.localteam_score}
              onChange={onChangeMatch}
            />
            <input
              type="text"
              name="awayteam_score"
              className="text-center"
              style={{ width: '40px' }}
              value={infoMatch.awayteam_score}
              onChange={onChangeMatch}
            />
            <input
              type="text"
              name="date"
              className="text-center"
              style={{ width: '100px' }}
              value={infoMatch.date}
              onChange={onChangeMatch}
            />
            <ImgArrow src="/images/other/send.png" className="ml-2 align-self-center" onClick={() => sendInfoMatchEdit()} title="Enviar" />
          </>
        )}
      </TdMatchdayResult>
      <TdMatchdayBadge className="p-1 border-0 align-middle">
        {match.awaybadge === null ? <ImgBadge src="/images/badges-teams/default-badge.png" alt="" /> : <ImgBadge src={match.awaybadge} alt="" />}
      </TdMatchdayBadge>
      <TdMatchdayTeam className="p-1 text-left border-0 align-middle"> {match.awayTeam}</TdMatchdayTeam>
    </tr>
  );
};

const mapDispatchToProps = {
  matchTournamentEditAction
};

export default connect(null, mapDispatchToProps)(ResultMatches);

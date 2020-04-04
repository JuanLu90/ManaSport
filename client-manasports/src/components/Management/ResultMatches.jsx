import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { matchTournamentEditAction } from "../../redux/actions/tournamentActions";


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
  const [inputLocalScore, setInputLocalScore] = useState(match.localteam_score);
  const [inputAwayScore, setInputAwayScore] = useState(match.awayteam_score);
  const [inputDate, setInputDate] = useState(match.date);

  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = useCallback(() => setEditMode(s => !s), []);

  const updateLocalScore = useCallback(
    v => setInputLocalScore(v.target.value),
    []
  );
  const updateAwayScore = useCallback(
    v => setInputAwayScore(v.target.value),
    []
  );
  const updateDate = useCallback(
    v => setInputDate(v.target.value),
    []
  );

  let matchData = {
    Id: match.Id,
    date: inputDate,
    localteam_score: inputLocalScore === -1 ? null : +inputLocalScore,
    awayteam_score: inputAwayScore === -1 ? null : +inputAwayScore
  }


  const deleteResult = () => {
    // setInputLocalScore(-1)
    // setInputAwayScore(-1)
    // sendMatchResult()
    // toggleEditMode();
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
              name=""
              id=""
              className="text-center"
              style={{ width: '40px' }}
              value={inputLocalScore === -1 ? "" : inputLocalScore}
              onChange={updateLocalScore}
            />
            <input
              type="text"
              name=""
              id=""
              className="text-center"
              style={{ width: '40px' }}
              value={inputAwayScore === -1 ? "" : inputAwayScore}
              onChange={updateAwayScore}
            />
            <input
              type="text"
              name=""
              id=""
              className="text-center"
              style={{ width: '100px' }}
              value={inputDate}
              onChange={updateDate}
            />
            <ImgArrow src="/images/other/send.png" className="ml-2 align-self-center" onClick={() => matchTournamentEditAction(matchData)} title="Enviar" />
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

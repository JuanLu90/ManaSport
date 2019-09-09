import React from "react";
import { connect } from "react-redux";
import * as action from "../../action";
import { IGlobalState } from "../../reducers/reducers";
import styled from "styled-components";
import { IMatch } from "../../interfaces";

interface IProps {
  m: IMatch;
  putMatchById: (MatchId: number, match: IMatch) => void;
  updatedResults: (count: number) => void;
}

interface IPropsGLobal {
  setLeagueId: (DeleteLeagueId: number) => void;
}

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

const EditMatchResult: React.FC<IProps & IPropsGLobal> = props => {
  const [inputLocalScore, setInputLocalScore] = React.useState(
    props.m.localteam_score
  );
  const [inputAwayScore, setInputAwayScore] = React.useState(
    props.m.awayteam_score
  );
  const [inputDate, setInputDate] = React.useState(
    props.m.date
  );

  const [editMode, setEditMode] = React.useState(false);
  const toggleEditMode = React.useCallback(() => setEditMode(s => !s), []);

  const updateLocalScore = React.useCallback(
    v => setInputLocalScore(v.target.value),
    []
  );
  const updateAwayScore = React.useCallback(
    v => setInputAwayScore(v.target.value),
    []
  );
  const updateDate = React.useCallback(
    v => setInputDate(v.target.value),
    []
  );


  const deleteResult = () => {
    setInputLocalScore(-1)
    setInputAwayScore(-1)
    sendMatchResult()
    toggleEditMode();
  }
  const token = localStorage.getItem("token"); //Token - Get the token stored from local storage


  const sendMatchResult = () => {
    fetch("http://localhost:8080/api/tournaments/editMatch", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
        // Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        MatchId: props.m.MatchId,
        date: inputDate,
        localteam_score: inputLocalScore === -1 ? null : +inputLocalScore,
        awayteam_score: inputAwayScore === -1 ? null : +inputAwayScore
      })
    })
      .then(response => {
        if (response.ok) {
          const u: any = {
            MatchId: props.m.MatchId,
            date: inputDate,
            localteam_score: props.m.localteam_score,
            awayteam_score: props.m.awayteam_score
          };
          response.json().then(m => {
            props.putMatchById(props.m.MatchId, m);
            toggleEditMode();
            props.updatedResults(+1)
          });
        }
      })
      .catch(err => {
        console.log("Error, " + err);
      });
  };

  return (
    <tr>
      <TdMatchdayTeam className="p-1 border-0 text-right align-middle">{props.m.localTeam} </TdMatchdayTeam>
      <TdMatchdayBadge className="p-1 border-0 align-middle">
        {props.m.localbadge === null ? <ImgBadge src="/images/badges-teams/default-badge.png" /> : <ImgBadge src={props.m.localbadge} alt="" />}
      </TdMatchdayBadge>
      <TdMatchdayResult className="p-1 border-0 d-flex justify-content-around m-auto">
        {!editMode && (
          <>
            {token &&
              <img
                src="/images/other/cancel.png"
                className="mr-3 align-self-center"
                alt=""
                title="Eliminar resultado"
                onClick={() => deleteResult()}
                style={{ width: '17px', height: '17px', cursor: 'pointer' }}
              />
            }
            <div>
              {props.m.localteam_score === null &&
                props.m.awayteam_score === null
                ? props.m.date
                : <>
                  <div>{props.m.localteam_score + "-" + props.m.awayteam_score}</div>
                  <div style={{ fontSize: '0.75em', color: '#bdc3c7' }}>{props.m.date}</div>
                </>

              }
            </div>
            {token &&
              <img
                src="/images/other/edit.png"
                className="ml-3 align-self-center"
                alt=""
                title="Editar resultado"
                onClick={toggleEditMode}
                style={{ width: '17px', height: '17px', cursor: 'pointer' }}
              />
            }

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
            <ImgArrow src="/images/other/send.png" className="ml-2 align-self-center" onClick={sendMatchResult} title="Enviar" />
          </>
        )}
      </TdMatchdayResult>
      <TdMatchdayBadge className="p-1 border-0 align-middle">
        {props.m.awaybadge === null ? <ImgBadge src="/images/badges-teams/default-badge.png" alt="" /> : <ImgBadge src={props.m.awaybadge} alt="" />}
      </TdMatchdayBadge>
      <TdMatchdayTeam className="p-1 text-left border-0 align-middle"> {props.m.awayTeam}</TdMatchdayTeam>
    </tr>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  putMatchById: action.putMatchById,
  qualification: state.qualification
});

const mapDispatchToProps = {
  setLeagueId: action.setLeagueId
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMatchResult);

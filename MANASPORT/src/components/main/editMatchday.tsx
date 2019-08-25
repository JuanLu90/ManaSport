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
  width: 30%;
`;
const TdMatchdayBadge = styled.td`
  width: 10%;
`;
const TdMatchdayResult = styled.td`
width: 25%;
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
        localteam_score: +inputLocalScore,
        awayteam_score: +inputAwayScore
      })
    })
      .then(response => {
        if (response.ok) {
          const u: any = {
            MatchId: props.m.MatchId,
            localteam_score: props.m.localteam_score,
            awayteam_score: props.m.awayteam_score
          };
          response.json().then(m => {
            props.putMatchById(props.m.MatchId, m);
            toggleEditMode();
            props.updatedResults(+1)
            // props.history.push("/management");
          });
        }
      })
      .catch(err => {
        console.log("Error, " + err);
      });
  };

  return (
    <tr>
      <TdMatchdayTeam className="p-1 text-right">{props.m.localTeam} </TdMatchdayTeam>
      <TdMatchdayBadge className="p-1">
        <ImgBadge src={props.m.localbadge} alt="" />
      </TdMatchdayBadge>
      <TdMatchdayResult className="p-1">
        {!editMode && (
          <>
            <span>
              {props.m.localteam_score === null &&
                props.m.awayteam_score === null
                ? props.m.date
                : props.m.localteam_score + "-" + props.m.awayteam_score}
            </span>
            <img
              src="/images/other/edit.png"
              className="ml-3"
              width={13}
              alt=""
              title="Editar resultado"
              onClick={toggleEditMode}
            />
          </>
        )}
        {editMode && (
          <>
            <ImgArrow src="/images/other/cancel.png" className="mr-2 mb-1" onClick={toggleEditMode} title="Atrás" />
            <input
              type="text"
              name=""
              id=""
              className="w-25 text-center"
              value={inputLocalScore}
              onChange={updateLocalScore}
            />
            <input
              type="text"
              name=""
              id=""
              className="w-25 text-center"
              value={inputAwayScore}
              onChange={updateAwayScore}
            />
            <ImgArrow src="/images/other/send.png" className="ml-2 mb-1" onClick={sendMatchResult} title="Enviar" />
          </>
        )}
      </TdMatchdayResult>
      <TdMatchdayBadge className="p-1">
        <ImgBadge src={props.m.awaybadge} alt="" />
      </TdMatchdayBadge>
      <TdMatchdayTeam className="p-1 text-left"> {props.m.awayTeam}</TdMatchdayTeam>
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

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as action from "../../../../../../../action";
import { IGlobalState } from "../../../../../../../reducers/reducers";
import styled from "styled-components";
import { IMatch } from "../../../../../../../interfaces";

interface IProps {
  m: IMatch;
  putMatchById: (MatchId: number, match: IMatch) => void;
}

interface IPropsGLobal {}

const ImgBadge = styled.img`
  height: 28px;
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

  const save = () => {
    fetch("http://localhost:8080/api/tournaments/editMatch", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
        // Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        MatchId: props.m.MatchId,
        localteam_score: inputLocalScore,
        awayteam_score: inputAwayScore
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
            // props.history.push("/management");
          });
        }
      })
      .catch(err => {
        console.log("Error, " + err);
      });
  };

  return (
    <tr className="tbody-matchday">
      <td className="p-2 text-right team">{props.m.localTeam} </td>
      <td className="p-2 badge">
        <ImgBadge src={props.m.localbadge} alt="" />
      </td>
      <td className="p-2">
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
              onClick={toggleEditMode}
            />
          </>
        )}
        {editMode && (
          <>
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
            <button onClick={save}>Guardar</button>
          </>
        )}
      </td>
      <td className="p-2 badge">
        <ImgBadge src={props.m.awaybadge} alt="" />
      </td>
      <td className="p-2 text-left team"> {props.m.awayTeam}</td>
    </tr>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  putMatchById: action.putMatchById
});

export default connect(mapStateToProps)(EditMatchResult);

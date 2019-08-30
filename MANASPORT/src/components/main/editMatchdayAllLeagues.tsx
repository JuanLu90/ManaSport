import React from "react";
import { connect } from "react-redux";
import * as action from "../../action";
import { IGlobalState } from "../../reducers/reducers";
import styled from "styled-components";
import { IMatch } from "../../interfaces";

interface IProps {
  m: IMatch;
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


const EditMatchResult: React.FC<IProps & IPropsGLobal> = props => {

  return (
    <tr>
      <TdMatchdayTeam className="p-1 text-right">{props.m.localTeam} </TdMatchdayTeam>
      <TdMatchdayBadge className="p-1">
       {props.m.localbadge === null ? <ImgBadge src="/images/badges-teams/default-badge.png" alt="" /> : <ImgBadge src={props.m.localbadge} alt="" />} 
      </TdMatchdayBadge>
      <TdMatchdayResult className="p-1">
        <>
          <span>
            {props.m.localteam_score === null &&
              props.m.awayteam_score === null
              ? props.m.date
              : props.m.localteam_score + "-" + props.m.awayteam_score}
          </span>
        </>
      </TdMatchdayResult>
      <TdMatchdayBadge className="p-1">
      {props.m.awaybadge === null ? <ImgBadge src="/images/badges-teams/default-badge.png" alt="" /> : <ImgBadge src={props.m.awaybadge} alt="" />} 
      </TdMatchdayBadge>
      <TdMatchdayTeam className="p-1 text-left"> {props.m.awayTeam}</TdMatchdayTeam>
    </tr>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  qualification: state.qualification
});

const mapDispatchToProps = {
  setLeagueId: action.setLeagueId
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMatchResult);

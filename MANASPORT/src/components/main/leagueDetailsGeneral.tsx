//React´s Components
import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
//Components made by Juanlu
import EditMatchDay from "./editMatchday";
//React Bootstrap
import { Table } from "react-bootstrap";
//Interfaces
import { IMatch, ITeam, IQualification } from "../../interfaces";
//Redux
import * as action from "../../action";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
//Styled Components - CSSINJS
import styled from "styled-components";



// ********* Styles - Styled Components - CSSINJS **********
const TableHead = styled.thead`
  font-family: "Roboto", sans-serif;
  color: #5e5e5e;
`;
const SpanMatchday = styled.span`
  font-size: 0.87em;
`;
const ImgBadge = styled.img`
  height: 28px;
`;
const DivCursor = styled.div`
  cursor: pointer;
`;
const TrMatchday = styled.th`
  &:hover {
    filter: opacity(50%);
  }
`;
const Tbody = styled.tbody`
  font-family: "Source Sans Pro", sans-serif;
`;



//----------------------------------------------------



//Global Props
interface IProps { }
interface IpropsGlobal {
  leagueTeams: ITeam[];
  setMatchs: (matchs: IMatch[]) => void;
  matchs: IMatch[];
  setQualification: (qualification: IQualification[]) => void;
  qualification: IQualification[];
}

const LeagueDetailsGeneral: React.FC<IProps & IpropsGlobal> = props => { //Function Component
  //Hook to change the matchday´s number
  const [count, setCount] = React.useState(1);
  const matchdayAdd = () => { //Set +1 to matchday
    setCount(count + 1);
  };
  const matchdaySub = () => { //set -1 to matchday
    setCount(count > 1 ? count - 1 : count); // matchday cant be less than 1
  };

  //Hook to update the matchday list when a match is edited
  const [matchResult, setMatchResult] = React.useState(false);
  const updatedResults = React.useCallback(() => setMatchResult(s => !s), []);

  const history = createBrowserHistory({});
  const path: any = history.location.pathname;
  let pathTournamentId = path.split(["/"]).slice(-1)[0];


  useEffect(() => { //Fetch matchs to Redux
    fetch("http://localhost:8080/api/tournaments/matchs/" +
      pathTournamentId + "/" + count,
      {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        }
      }
    ).then(response => {
      if (response.ok) {
        response.json().then(matchs => props.setMatchs(matchs));
      }
    });
  }, [count, matchResult]); //When a hook value changes, the matchs on Redux are updated

  useEffect(() => { //Fetch qualification to Redux
    fetch("http://localhost:8080/api/tournaments/qualification/" + pathTournamentId,
      {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        }
      }
    ).then(response => {
      if (response.ok) {
        response.json().then(qualification => props.setQualification(qualification));
      }
    });
  }, [matchResult]); //When the value changes, the qualification is updated

  const createMatchs = () => { //Create the matchs of the seasson for a league
    fetch("http://localhost:8080/api/tournaments/createMatchs/" + pathTournamentId, {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
        // Authorization: "Bearer " + props.token
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(matchs => props.setMatchs(matchs));
      }
    });
  }



  return (
    <>
      <div className="container-fluid text-dark">
        <div className="row mt-1 ">
          <div className="col p-3 m-3 text-center">
            <div className="row pb-3">
              <div className="col text-center text-light h3">Resultados</div>
              <div className="col"><button onClick={createMatchs}>Crear Calendario</button></div>
            </div>
            <div className="row justify-content-center">
              <div className="col-10">
                <Table responsive striped hover variant="dark" className="border border-secondary">
                  <TableHead>
                    <tr>
                      <TrMatchday className="text-white font-weight-light">
                        {count !== 1 && (
                          <DivCursor onClick={matchdaySub}>
                            <img src="/images/other/arrow-left.png" width="17" /> <SpanMatchday>jornada {count - 1}</SpanMatchday>
                          </DivCursor>
                        )}
                      </TrMatchday>
                      <th />
                      <th className="text-light h5">JORNADA {count}</th>
                      <th />
                      <TrMatchday className="text-white font-weight-light">
                        <DivCursor onClick={matchdayAdd}>
                          <SpanMatchday  >jornada {count + 1}</SpanMatchday> <img src="/images/other/arrow-right.png" width="17" />
                        </DivCursor>
                      </TrMatchday>
                    </tr>
                  </TableHead>
                  <Tbody>
                    {props.matchs.map(m => (
                      <EditMatchDay key={m.MatchId} m={m} updatedResults={updatedResults} />
                    ))}
                  </Tbody>
                </Table>
              </div>
            </div>
          </div>
          <div className="col p-3 m-3">
            <div className="row pb-3">
              <div className="col text-center text-light h3">Clasificación</div>
            </div>
            <div className="row justify-content-center">
              <div className="col-10">
                <Table striped variant="dark" className="border border-secondary">
                  <TableHead>
                    <tr>
                      <th />
                      <th />
                      <th />
                      <th className="p-2 text-center text-light">PTS</th>
                      <th className="p-2 text-center text-light font-weight-light">PJ</th>
                      <th className="p-2 text-center text-light font-weight-light">PG</th>
                      <th className="p-2 text-center text-light font-weight-light">PE</th>
                      <th className="p-2 text-center text-light font-weight-light">PP</th>
                    </tr>
                  </TableHead>
                  <Tbody>
                    {props.qualification.map((q, i) => (
                      <tr key={q.ID}>
                        {i === 0 ?
                          <td className="p-1 text-center bg-success rounded-right">{1}</td> :
                          <td className="p-1 text-center">{i + 1}</td>
                        }
                        <td className="p-1 text-center"> {q.badge === null ? <ImgBadge src="/images/badges-teams/default-badge.png" alt="" /> : <ImgBadge src={q.badge} alt="" />}</td>
                        <td className="p-1">{q.TEAM}</td>
                        <td className="p-1 text-center"><b>{q.PTS}</b></td>
                        <td className="p-1 text-center">{q.PJ}</td>
                        <td className="p-1 text-center">{q.PG}</td>
                        <td className="p-1 text-center">{q.PE}</td>
                        <td className="p-1 text-center">{q.PP}</td>
                      </tr>
                    ))}
                  </Tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MapStateToProps = (state: IGlobalState) => ({
  matchs: state.matchs,
  leagueTeams: state.leagueTeams,
  qualification: state.qualification
});

const mapDispatchToProps = {
  setMatchs: action.setMatchs,
  setQualification: action.setQualification
};

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(LeagueDetailsGeneral);

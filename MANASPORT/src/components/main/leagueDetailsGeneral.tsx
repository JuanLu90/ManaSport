import React, { useEffect, useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { IMatch, ITeam, IQualification } from "../../interfaces";
import * as action from "../../action";
import { IGlobalState } from "../../reducers/reducers";
import EditMatchDay from "./editMatchday";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import styled from "styled-components";

interface IProps {}

interface IpropsGlobal {
  leagueTeams: ITeam[];
  setMatchs: (matchs: IMatch[]) => void;
  matchs: IMatch[];
  setQualification: (qualification: IQualification[]) => void;
  qualification: IQualification[];
}

const LeagueDetailsGeneral: React.FC<IProps & IpropsGlobal> = props => {
  // const [inputLeagueName, setInputLeagueName] = useState("");
  // const [inputLeagueSport, setInputLeagueSport] = useState("Futbol");
  // const [inputLeagueCategory, setInputLeagueCategory] = React.useState(
  //   "Futbol 11"
  // );

  const [count, setCount] = React.useState(1);
  const matchdayAdd = () => {
    setCount(count + 1);
  };
  const matchdaySub = () => {
    setCount(count > 1 ? count - 1 : count);
  };

  // const [showEditMatchday, setEditMatchday] = useState(false);
  // const handleCloseEditMatchday = () => setEditMatchday(false);
  // const handleShowEditMatchday = () => setEditMatchday(true);

  // function funcionEdittMatchday(DeleteLeagueId: any): any {
  //   handleShowEditMatchday();
  //   //   props.setMatchId(DeleteLeagueId);
  // }

  const history = createBrowserHistory({});
  const path: any = history.location.pathname;
  let pathTournamentId = path.split(["/"]).slice(-1)[0];

  useEffect(() => {
    //FETCH MATCHS INFO TO REDUX
    fetch(
      "http://localhost:8080/api/tournaments/matchs/" +
        pathTournamentId +
        "/" +
        count,
      {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        }
      }
    ).then(response => {
      if (response.ok) {
        response.json().then(result => props.setMatchs(result));
      }
    });
  }, [count]);

  useEffect(() => {
    //FETCH MATCHS INFO TO REDUX
    fetch(
      "http://localhost:8080/api/tournaments/qualification/" + pathTournamentId,
      {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        }
      }
    ).then(response => {
      if (response.ok) {
        response.json().then(result => props.setQualification(result));
      }
    });
  }, []);

  const createMatchs = () => {
    fetch("http://localhost:8080/api/tournaments/createMatchs/" + pathTournamentId, {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
        // Authorization: "Bearer " + props.token
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(result => props.setMatchs(result));
      }
    });
  }

  // ****** Styles *******
  const Wrapper = styled.div`
    box-shadow: 2px 2px 2px 2px #888888;
  `;
  const TableHead = styled.thead`
    font-family: "Roboto", sans-serif;
    color: #5e5e5e;
  `;
  // *********************

  return (
    <>
      <div className="container-fluid text-dark">
        <div className="row mt-1 ">
          <Wrapper className="col p-3 m-1 text-center">
            <div className="row pb-3">
              <div className="col text-center">CALENDARIO</div>
              <div className="col"><button onClick={createMatchs}>Crear Calendario</button></div>
            </div>
            <div className="row">
              <Table responsive striped hover>
                <TableHead>
                  <tr>
                    <th>
                      {count !== 1 && (
                        <button onClick={matchdaySub}>anterior</button>
                      )}
                    </th>
                    <th />
                    <th>JORNADA {count}</th>
                    <th />
                    <th>
                      <button onClick={matchdayAdd}>próxima</button>
                    </th>
                  </tr>
                  <tr>
                    <th />
                  </tr>
                </TableHead>
                <tbody>
                  {props.matchs.map(m => (
                    <EditMatchDay key={m.MatchId} m={m} />
                  ))}
                </tbody>
              </Table>
            </div>
          </Wrapper>
          <Wrapper className="col p-3 m-1">
            <div className="row pb-3">
              <div className="col text-center">CLASIFICACIÓN</div>
            </div>
            <div className="row">
              <Table responsive striped hover>
                <TableHead>
                  <tr>
                    <th />
                    <th />
                    <th>Equipo</th>
                    <th>PTS</th>
                    <th>PJ</th>
                    <th>PG</th>
                    <th>PE</th>
                    <th>PP</th>
                  </tr>
                </TableHead>
                <tbody>
                  {props.qualification.map((q, i) => (
                    <tr key={q.ID}>
                      <td className="p-2">{i + 1 + "º"}</td>
                      <td className="p-2"> <img src={q.badge} width="20" alt=""/></td>
                      <td className="p-2">{q.TEAM}</td>
                      <td className="p-2"><b>{q.PTS}</b></td>
                      <td className="p-2">PJ</td>
                      <td className="p-2">{q.PG}</td>
                      <td className="p-2">{q.PE}</td>
                      <td className="p-2">{q.PP}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Wrapper>
        </div>
        <div className="row justify-content-center mt-4 p-2 bg-leagueList">
          Estadísticas
        </div>
      </div>
      {/* <Modal size="lg" show={showEditMatchday} onHide={() => null}>
        <EditMatchdayModal handleCloseEditMatchday={handleCloseEditMatchday} />
      </Modal> */}
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

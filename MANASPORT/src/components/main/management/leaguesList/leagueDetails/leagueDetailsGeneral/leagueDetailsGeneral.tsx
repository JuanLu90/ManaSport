import React, { useEffect, useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { IMatch, ITeam } from "../../../../../../interfaces";
import * as action from "../../../../../../action";
import { IGlobalState } from "../../../../../../reducers/reducers";
import EditMatchdayModal from "./editMatchdayModal/editMatchdayModal";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import styled from "styled-components";

interface IProps {}

interface IpropsGlobal {
  leagueTeams: ITeam[];
  setMatchs: (matchs: IMatch[]) => void;
  matchs: IMatch[];
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

  const [showEditMatchday, setEditMatchday] = useState(false);
  const handleCloseEditMatchday = () => setEditMatchday(false);
  const handleShowEditMatchday = () => setEditMatchday(true);

  function funcionEdittMatchday(DeleteLeagueId: any): any {
    handleShowEditMatchday();
    //   props.setMatchId(DeleteLeagueId);
  }

  // for (let i = 0; i < props.matchs.length; i++) {
  //     let localteampoints = 0;
  //     let awayteampoints = 0;
  //     if (props.matchs[i].localteam_score > props.matchs[i].awayteam_score) {
  //         localteampoints = localteampoints + 3
  //     } else if (props.matchs[i].localteam_score < props.matchs[i].awayteam_score) {
  //         awayteampoints = awayteampoints + 3;
  //     } else {
  //         localteampoints = localteampoints + 1;
  //         awayteampoints = awayteampoints + 1;
  //     }
  //     console.log("localteampoints: " + localteampoints + "------" + "awayteampoints: " + awayteampoints)
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

    // const createMatchs = () => {
    //   // const token = localStorage.getItem("token");
    //   //   const decoded: any = jwt.decode(token);
    //   //   const UserId: number = decoded.UserId;

    //     fetch("http://localhost:8080/api/tournaments/createMatchs", {
    //       method: "POST",
    //       headers: {
    //         "Content-type": "application/json"
    //       },
    //       body: JSON.stringify({
    //         localTeamId: inputLeagueName,
    //         awayTeamId: inputLeagueSport,
    //         matchday: matchday,
    //         TournamentId: pathTournamentId
    //       })
    //     })
    //       .then(response => {
    //         if (response.ok) {
    //           response.json().then(m => {
    //             props.newMatch(m);
    //           });
    //         }
    //       })
    //       .catch(err => {
    //         console.log("Error," + err);
    //       });
    // };

  // ****** Styles *******
  const Wrapper = styled.div`
    box-shadow: 2px 2px 2px 2px #888888;
  `;
  const TableHead = styled.thead`
    font-family: "Roboto", sans-serif;
    color: #5e5e5e;
  `;
  const ImgBadge = styled.img`
    height: 28px;
  `;
  // *********************

  return (
    <>
      <div className="container-fluid text-dark">
        <div className="row mt-1 ">
          <Wrapper className="col p-3 m-1 text-center">
            <div className="row pb-3">
              <div className="col text-center">CALENDARIO</div>
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
                    <th>
                      <Button size="sm" onClick={handleShowEditMatchday}>
                        Editar jornada
                      </Button>
                    </th>
                  </tr>
                </TableHead>
                <tbody>
                  {props.matchs.map(m => (
                    <tr key={m.MatchId} className="tbody-matchday">
                      <td className="p-2 text-right team">{m.localTeam} </td>
                      <td className="p-2 badge">
                        <ImgBadge src={m.localbadge} alt="" />
                      </td>
                      <td className="p-2">
                        {m.localteam_score === null && m.awayteam_score === null
                          ? m.date
                          : m.localteam_score + "-" + m.awayteam_score}
                      </td>
                      <td className="p-2 badge">
                        <ImgBadge src={m.awaybadge} alt="" />
                      </td>
                      <td className="p-2 text-left team"> {m.awayTeam}</td>
                    </tr>
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
                    <th>Equipo</th>
                    <th>PT</th>
                    <th>PJ</th>
                    <th>PG</th>
                    <th>PE</th>
                    <th>PP</th>
                  </tr>
                </TableHead>
                <tbody>
                  <tr>
                    <td className="p-2">1</td>
                    <td className="p-2">Malaga CF</td>
                    <td className="p-2">28</td>
                    <td className="p-2">8</td>
                    <td className="p-2">4</td>
                    <td className="p-2">2</td>
                    <td className="p-2">2</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Wrapper>
        </div>
        <div className="row justify-content-center mt-4 p-2 bg-leagueList">
          Estadísticas
        </div>
      </div>
      <Modal size="lg" show={showEditMatchday} onHide={() => null}>
        <EditMatchdayModal handleCloseEditMatchday={handleCloseEditMatchday} />
      </Modal>
    </>
  );
};

const MapStateToProps = (state: IGlobalState) => ({
  matchs: state.matchs,
  leagueTeams: state.leagueTeams
});

const mapDispatchToProps = {
  setMatchs: action.setMatchs
};

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(LeagueDetailsGeneral);

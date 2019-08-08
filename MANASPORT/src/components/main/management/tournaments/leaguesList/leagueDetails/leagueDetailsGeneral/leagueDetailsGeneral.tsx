import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { IMatch } from "../../../../../../../interfaces";
import * as action from "../../../../../../../action";
import { IGlobalState } from "../../../../../../../reducers/reducers";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";

interface IProps { }

interface IpropsGlobal {
    setMatchs: (matchs: IMatch[]) => void;
    matchs: IMatch[];
}

const LeagueDetailsGeneral: React.FC<IProps & IpropsGlobal> = props => {
    
    const [count, setCount] = React.useState(1);
    const matchdayAdd = () => { setCount(count + 1) }
    const matchdaySub = () => { setCount(count > 1 ? count - 1: count) }

    const history = createBrowserHistory({});
    const path: any = history.location.pathname;
    let pathTournamentId = path.split(["/"]).slice(-1)[0];
    
    useEffect(() => {
        //FETCH LEAGUE´S TEAMS TO REDUX
        // const decoded: any = jwt.decode(token);
        // const UserId: number = decoded.UserId;
        fetch(
          "http://localhost:8080/api/tournaments/matchs/" + count + "/" +
          pathTournamentId,
          {
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
      }, [count]);

    return (
        <div className="container-fluid text-dark">
            <div className="row mt-1 ">
                <div className="col p-3 m-1 text-center bg-leagueList">
                    <div className="row pb-3">
                        <div className="col text-center">CALENDARIO</div>
                    </div>
                    <div className="row">


                        <Table responsive striped hover >
                            <thead className="style-tablehead-leagueList">
                                <tr>
                                    <th> <button onClick={matchdaySub}>anterior</button></th>
                                    <th>JORNADA {count}</th>
                                    <th> <button onClick={matchdayAdd}>próxima</button> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.matchs.map(m => (
                                    <tr key={m.MatchId}>
                                        <td className="p-2">{m.localTeam}</td>
                                        <td className="p-2">{m.localteam_score + "-" + m.awayteam_score}</td>
                                        <td className="p-2">{m.awayTeam}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>


                    </div>
                </div>
                <div className="col p-3 m-1 bg-leagueList">
                    <div className="row pb-3">
                        <div className="col text-center">CLASIFICACIÓN</div>
                    </div>
                    <div className="row">
                        <Table responsive striped hover >
                            <thead className="style-tablehead-leagueList">
                                <tr>
                                    <th></th>
                                    <th>Equipo</th>
                                    <th>PT</th>
                                    <th>PJ</th>
                                    <th>PG</th>
                                    <th>PE</th>
                                    <th>PP</th>
                                </tr>
                            </thead>
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

                </div>
            </div>
            <div className="row justify-content-center mt-4 p-2 bg-leagueList">
                Estadísticas
            </div>
        </div>
    );
}

const MapStateToProps = (state: IGlobalState) => ({
    matchs: state.matchs
})

const mapDispatchToProps = {
    setMatchs: action.setMatchs
  }

export default connect(MapStateToProps, mapDispatchToProps)(LeagueDetailsGeneral);
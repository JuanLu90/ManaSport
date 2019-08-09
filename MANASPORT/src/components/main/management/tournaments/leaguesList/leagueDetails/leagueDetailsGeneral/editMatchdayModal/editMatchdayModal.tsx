import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as action from "../../../../../../../../action";
import { IGlobalState } from "../../../../../../../../reducers/reducers";
import { Table } from "react-bootstrap";
import { ITournament, IMatch } from "../../../../../../../../interfaces";
import { createBrowserHistory } from "history";

interface IProps {
  leagues: ITournament[];
  handleCloseEditMatchday: () => void;
  putLeagueById: (LeagueId: number, league: ITournament) => void;
  DeleteLeagueId: number;
  matchs: IMatch[];
}

interface IPropsGLobal {
  // EditLeagueId: number;
  // editLeagueById: (LeagueId: number) => void;
}

const EditMatchdayModal: React.FC<IProps & IPropsGLobal> = props => {
  const history = createBrowserHistory({ forceRefresh: true });

  const [inputLocalScore, setInputLocalScore] = React.useState("");
  const [inputAwayScore, setInputAwayScore] = React.useState("");


  const updateLocalScore = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLocalScore(event.currentTarget.value);
  };
  const updateAwayScore = (event: any) => {
    setInputAwayScore(event.currentTarget.value);
  };

  const currentLeague = props.leagues.find(
    u => u.TournamentId === props.DeleteLeagueId
  );

  useEffect(() => {
    if (currentLeague) {
      setInputLocalScore(currentLeague.name);
      setInputAwayScore(currentLeague.category);
    }
  }, [currentLeague]);

  const editCurrentLeague = () => {
    //Evita que 'league' sea undefined
    if (!currentLeague) {
      return null;
    }
    fetch(
      "http://localhost:8080/api/tournaments/editTournament/" +
      currentLeague.TournamentId,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
          // Authorization: "Bearer " + props.token
        },
        body: JSON.stringify({
          Matchday: currentLeague.TournamentId,
          localteam_score: inputLocalScore,
          awayteam_score: inputAwayScore
        })
      }
    )
      .then(response => {
        if (response.ok) {
          const u: any = {
            Matchday: currentLeague.TournamentId,
            localteam_score: inputLocalScore,
            awayteam_score: inputAwayScore
          };
          response.json().then(u => {
            props.putLeagueById(currentLeague.TournamentId, u);
            history.push("/management");
          });
        }
      })
      .catch(err => {
        console.log("Error, " + err);
      });
  };

  return (
    <div className="modal-dialog-centered" role="document">
      <div className="modal-content bg-light text-dark">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalCenterTitle">
            Editando:
          </h5>
          <button
            type="button"
            className="close"
            onClick={props.handleCloseEditMatchday}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="row">
            <Table responsive striped hover >
              <thead className="style-tablehead-leagueList">
                <tr>
                  <th></th>
                  <th className="text-center">JORNADA "1"</th>
                  <th></th>
                </tr>
                <tr>
                </tr>
              </thead>
              <tbody>
                {props.matchs.map(m => (
                  <tr key={m.MatchId} className="text-center" >
                    <td className="p-2 ">{m.localTeam}  </td>
                    <td className="p-2">
                      <input
                        type="text"
                        className="form-control form-control-sm mt-0"
                        value={inputLocalScore}
                        onChange={updateLocalScore}
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        className="form-control form-control-sm mt-0"
                        value={inputAwayScore}
                        onChange={updateAwayScore}
                      />
                    </td>
                    <td className="p-2 "> {m.awayTeam}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="modal-footer no-border">
          <div className="col text-right">
            <button onClick={props.handleCloseEditMatchday}>Cancelar</button>
          </div>
          <div className="col">
            <button onClick={editCurrentLeague}>Enviar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  leagues: state.leagues,
  deleteLeagueById: action.deleteLeagueById,
  DeleteLeagueId: state.TournamentId,
  putLeagueById: action.putLeagueById,
  matchs: state.matchs
});

export default connect(mapStateToProps)(EditMatchdayModal);

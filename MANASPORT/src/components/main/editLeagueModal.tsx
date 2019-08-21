import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as action from "../../action";
import { IGlobalState } from "../../reducers/reducers";
import { InputGroup, Form } from "react-bootstrap";
import { ITournament } from "../../interfaces";
import { createBrowserHistory } from "history";

interface IProps {
  leagues: ITournament[];
  handleCloseEditLeague: () => void;
  putLeagueById: (LeagueId: number, league: ITournament) => void;
  DeleteLeagueId: number;
}

interface IPropsGLobal {
  // EditLeagueId: number;
  // editLeagueById: (LeagueId: number) => void;
}

const EditLeagueModal: React.FC<IProps & IPropsGLobal> = props => {
  const history = createBrowserHistory({ forceRefresh: true });

  const [inputLeagueName, setInputLeagueName] = React.useState("");
  const [inputLeagueSport, setInputLeagueSport] = React.useState("Futbol");
  const [inputLeagueCategory, setInputLeagueCategory] = React.useState(
    "Futbol 11"
  );

  const updateLeagueName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLeagueName(event.currentTarget.value);
  };
  const updateLeagueCategory = (event: any) => {
    setInputLeagueCategory(event.currentTarget.value);
  };

  const currentLeague = props.leagues.find(
    u => u.TournamentId === props.DeleteLeagueId
  );

  useEffect(() => {
    if (currentLeague) {
      setInputLeagueName(currentLeague.name);
      setInputLeagueCategory(currentLeague.category);
    }
  }, [currentLeague]);

      //Evita que 'league' sea undefined
      if (!currentLeague) {
        return null;
      }

  const editCurrentLeague = () => {
    fetch("http://localhost:8080/api/tournaments/editTournament/" +
        currentLeague.TournamentId,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
          // Authorization: "Bearer " + props.token
        },
        body: JSON.stringify({
          TournamentId: currentLeague.TournamentId,
          sport: inputLeagueSport,
          name: inputLeagueName,
          category: inputLeagueCategory
        })
      }
    )
      .then(response => {
        if (response.ok) {
          const u: any = {
            TournamentId: currentLeague.TournamentId,
            sport: inputLeagueSport,
            name: inputLeagueName,
            category: inputLeagueCategory
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
            onClick={props.handleCloseEditLeague}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-8">
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Nombre de la liga*
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <input
                  type="text"
                  className="form-control form-control-sm mt-0"
                  value={inputLeagueName}
                  onChange={updateLeagueName}
                />
              </InputGroup>
            </div>
            <div className="col-4">
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Categoría*
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  as="select"
                  value={inputLeagueCategory}
                  onChange={updateLeagueCategory}
                >
                  <option>Futbol 11</option>
                  <option>Futbol 7</option>
                  <option>Futbol Sala</option>
                  <option>Futbol(otros)</option>
                </Form.Control>
              </InputGroup>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="col text-right">
            <button onClick={props.handleCloseEditLeague}>Cancelar</button>
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
  putLeagueById: action.putLeagueById
});

export default connect(mapStateToProps)(EditLeagueModal);

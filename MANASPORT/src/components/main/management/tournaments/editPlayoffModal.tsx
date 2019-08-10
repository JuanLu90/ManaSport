import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as action from "../../../../action";
import { IGlobalState } from "../../../../reducers/reducers";
import { InputGroup, Form } from "react-bootstrap";
import { ITournament } from "../../../../interfaces";
import { createBrowserHistory } from "history";

interface IProps {
  playoffs: ITournament[];
  handleCloseEditPlayoff: () => void;
  putPlayoffById: (PlayoffId: number, playoff: ITournament) => void;
  DeletePlayoffId: number;
}

interface IPropsGLobal {
  // EditLeagueId: number;
  // editLeagueById: (LeagueId: number) => void;
}

const EditPlayoffModal: React.FC<IProps & IPropsGLobal> = props => {
  const history = createBrowserHistory({ forceRefresh: true });

  const [inputPlayoffName, setInputPlayoffName] = React.useState("");
  const [inputPlayoffSport, setInputPlayoffSport] = React.useState("Futbol");
  const [inputPlayoffCategory, setInputPlayoffCategory] = React.useState(
    "Futbol 11"
  );

  const updatePlayoffName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPlayoffName(event.currentTarget.value);
  };
  const updatePlayoffCategory = (event: any) => {
    setInputPlayoffCategory(event.currentTarget.value);
  };

  const currentPlayoff = props.playoffs.find(
    u => u.TournamentId === props.DeletePlayoffId
  );

  useEffect(() => {
    if (currentPlayoff) {
      setInputPlayoffName(currentPlayoff.name);
      setInputPlayoffCategory(currentPlayoff.category);

    }
  }, [currentPlayoff]);

  const editCurrentPlayoff = () => {
    //Evita que 'playoff' sea undefined
    if (!currentPlayoff) {
      return null;
    }
    fetch("http://localhost:8080/api/tournaments/editTournament/" + currentPlayoff.TournamentId, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
        // Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        TournamentId: currentPlayoff.TournamentId,
        sport: inputPlayoffSport,
        name: inputPlayoffName,
        category: inputPlayoffCategory
      })
    })
      .then(response => {
        if (response.ok) {
          const u: any = {
            PlayoffId: currentPlayoff.TournamentId,
            sport: inputPlayoffSport,
            name: inputPlayoffName,
            category: inputPlayoffCategory
          };
          response.json().then(u => {
            props.putPlayoffById(currentPlayoff.TournamentId, u);
            history.push("/management");
          });
        }
      })
      .catch(err => {
        console.log("Error, " + err);
      });
  }

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
            onClick={props.handleCloseEditPlayoff}
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
                  value={inputPlayoffName}
                  onChange={updatePlayoffName}
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
                <Form.Control as="select" value={inputPlayoffCategory} onChange={updatePlayoffCategory}>
                  <option>Futbol 11</option>
                  <option>Futbol 7</option>
                  <option>Futbol Sala</option>
                  <option>Futbol(otros)</option>
                </Form.Control>
              </InputGroup>
            </div>
          </div>
        </div>
        <div className="modal-footer no-border">
          <div className="col text-right">
            <button onClick={props.handleCloseEditPlayoff}>Cancelar</button>
          </div>
          <div className="col">
            <button onClick={editCurrentPlayoff}>Enviar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  playoffs: state.playoffs,
  deleteplayoffById: action.deletePlayoffById,
  DeletePlayoffId: state.TournamentId,
  putPlayoffById: action.putPlayoffById
});

export default connect(mapStateToProps)(EditPlayoffModal);

import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { sportsObject, competitionFormatsList, ageGroupsList, KnockoutRoundsList } from '../../../utils/competitionUtil';
import { getUserLocalStorage } from '../../../utils/localStorageUtil';
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  height: 30px;
  color: #D9D9DC;
  background-color: #242631;
  border: 1px solid gray;
  padding-left: 5px;
  margin-left: 10px;

  &:focus {
    outline: 0;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 30px;
  color: #D9D9DC;
  background-color: #242631;
  border: 1px solid gray;
  padding-left: 5px;
  margin-left: 10px;

  &:focus {
    outline: 0;
  }

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

const Span = styled.span`
  font-weight: 500;
  color: #D9D9DC;
`;

//----------------------------------------------------

interface IProps {
  showModal: any;
  setShowModal: any;
  newTournamentAction: any;
  tournamentsByUserAction: any;
}

interface IPropsGLobal { }

const CreateTournamentModal: React.FC<IProps & IPropsGLobal> = ({ showModal, setShowModal, newTournamentAction, tournamentsByUserAction }) => {

  const initialState = {
    name: '',
    sport: sportsObject[0].sport,
    category: sportsObject[0].category[0],
    ageGroup: ageGroupsList[0],
    format: competitionFormatsList[0],
    knockout: KnockoutRoundsList[0],
    consolation: false,
    createdate: new Date().toLocaleDateString(),
    UserId: getUserLocalStorage().id
  }

  const [newTournament, setNewTournament] = useState(initialState);


  const sendInfoNewTournament = () => {
    newTournamentAction(newTournament);
    tournamentsByUserAction(getUserLocalStorage().id);
    setShowModal(false);
  }

  const onChange = (e: any) => {
    let { name, value } = e.target;
    setNewTournament(prevState => ({ ...prevState, [name]: value }))
  }

  let sportSelected = sportsObject.filter(sportList => sportList.sport === newTournament.sport);

  useEffect(() => {
    setNewTournament(prevState => ({ ...prevState, category: sportSelected[0].category[0] }))
  }, [newTournament.sport]);

  return (
    <Modal
      size="lg"
      show={showModal}
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      className="createTournamentModal"
      centered
    >
      <Modal.Header className="bg-warning py-1 border-0" closeButton>
        <Modal.Title>
          Create tournament
        </Modal.Title>
        <button
          type="button"
          className="close"
          onClick={() => setShowModal(false)}
        >
        </button>
      </Modal.Header>
      <Modal.Body className="bg-dark py-1 pr-4">
        <div className="row my-3">
          <div className="col-3 d-flex align-items-center">
            <Span>Name:</Span>
          </div>
          <div className="col">
            <Input type="text" name="name" value={newTournament.name} onChange={onChange} />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 d-flex align-items-center">
            <Span>Sport:</Span>
          </div>
          <div className="col">
            <Select name="sport" onChange={onChange}>
              {sportsObject.map((sportList, i) =>
                <option key={i}>{sportList.sport} </option>
              )};
            </Select>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 d-flex align-items-center">
            <Span>Category:</Span>
          </div>
          <div className="col">
            <Select name="category" onChange={onChange}>
              {sportSelected[0].category.map((categoryList, i) =>
                <option key={i}>{categoryList} </option>
              )}
            </Select>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 d-flex align-items-center">
            <Span>Age Group:</Span>
          </div>
          <div className="col">
            <Select name="ageGroup" onChange={onChange}>
              {ageGroupsList.map((age, i) =>
                <option key={i}>{age} </option>
              )}
            </Select>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 d-flex align-items-center">
            <Span>Format:</Span>
          </div>
          <div className="col">
            <Select name="format" onChange={onChange}>
              {competitionFormatsList.map((format, i) =>
                <option key={i}>{format} </option>
              )}
            </Select>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 d-flex align-items-center">
            <Span>Knockout:</Span>
          </div>
          <div className="col">
            <Select name="knockout" onChange={onChange}>
              {KnockoutRoundsList.map((knockout, i) =>
                <option key={i}>{knockout} </option>
              )}
            </Select>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 d-flex align-items-center">
            <Span>Consolation:</Span>
          </div>
          {/* <div className="col">
            <Select name="format" onChange={onChange}>
                <option value={true}>true </option>
                <option value={false}>false </option>
            </Select>
          </div> */}
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-dark border-0">
        <div className="row">
          <div className="col text-right">
            <button className="btn btn-light"
              onClick={() => setShowModal(false)}
            >Cancelar</button>
          </div>
          <div className="col pr-0">
            <button className="btn btn-warning"
            onClick={sendInfoNewTournament}
            >
              Create
            </button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTournamentModal;

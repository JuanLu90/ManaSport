import React, { useEffect, useState } from "react";
import { sportsObject, competitionFormatsList, ageGroupsList, KnockoutRoundsList } from '../../../utils/competitionUtil';
import { getUserLocalStorage } from '../../../utils/localStorageUtil';
import {
  popoverCreateTournamentName,
  popoverCreateTournamentSport,
  popoverCreateTournamentCategory,
  popoverCreateTournamentAgeGroup,
  popoverCreateTournamentFormat,
  popoverCreateTournamentKnockout,
  popoverCreateTournamentConsolation
} from '../../../utils/popoversUtils';
import styled from "styled-components";
import { Modal, OverlayTrigger } from "react-bootstrap";

const Input = styled.input`
  width: 100%;
  height: 30px;
  color: #D9D9DC;
  background-color: #2D2F37;
  border: 1px solid gray;
  border-radius: 3px;
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
  background-color: #2D2F37;
  border: 1px solid gray;
  border-radius: 3px;
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
  color: #D9D9DC;
  font-weight: 500;
`;

const I = styled.i`
  color: #ffc107;
  opacity: 0.4;

  &:hover {
    opacity: 1;
  }
`;

const IClose = styled.i`
  cursor: pointer;

  &:hover {
    color: grey;
  }
`;

const CheckBoxWrapper = styled.div`
  position: relative;
  display: flex;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 20px;
  border-radius: 15px;
  background: #bebebe;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 20px;
  cursor: pointer;
  &:checked + ${CheckBoxLabel} {
    background: #ffc107;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 14px;
      height: 14px;
      margin-left: 25px;
      transition: 0.2s;
    }
  }
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
    let { name, value, type } = e.target;
    if (type === "checkbox") value = e.target.checked
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
      <Modal.Header className="bg-warning d-flex align-items-center py-1 border-0">
        <Modal.Title>
          CREATE TOURNAMENT
        </Modal.Title>
        <IClose className="fas fa-times" onClick={() => setShowModal(false)}></IClose>
      </Modal.Header>
      <Modal.Body className="bg-dark py-1 pr-4">
        <div className="row my-3">
          <div className="col-3 pr-0 d-flex justify-content-between align-items-center">
            <Span>Name:</Span>
            <OverlayTrigger placement="right" overlay={popoverCreateTournamentName}>
              <I className="fas fa-sm fa-question-circle"></I>
            </OverlayTrigger>
          </div>
          <div className="col pl-0">
            <Input type="text" name="name" value={newTournament.name} onChange={onChange} />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 pr-0 d-flex justify-content-between align-items-center">
            <Span>Sport:</Span>
            <OverlayTrigger placement="right" overlay={popoverCreateTournamentSport}>
              <I className="fas fa-sm fa-question-circle"></I>
            </OverlayTrigger>
          </div>
          <div className="col pl-0">
            <Select name="sport" onChange={onChange}>
              {sportsObject.map((sportList, i) =>
                <option key={i}>{sportList.sport} </option>
              )};
            </Select>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 pr-0 d-flex justify-content-between align-items-center">
            <Span>Category:</Span>
            <OverlayTrigger placement="right" overlay={popoverCreateTournamentCategory}>
              <I className="fas fa-sm fa-question-circle"></I>
            </OverlayTrigger>
          </div>
          <div className="col pl-0">
            <Select name="category" onChange={onChange}>
              {sportSelected[0].category.map((categoryList, i) =>
                <option key={i}>{categoryList} </option>
              )}
            </Select>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 pr-0 d-flex justify-content-between align-items-center">
            <Span>Age Group:</Span>
            <OverlayTrigger placement="right" overlay={popoverCreateTournamentAgeGroup}>
              <I className="fas fa-sm fa-question-circle"></I>
            </OverlayTrigger>
          </div>
          <div className="col pl-0">
            <Select name="ageGroup" onChange={onChange}>
              {ageGroupsList.map((age, i) =>
                <option key={i}>{age} </option>
              )}
            </Select>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 pr-0 d-flex justify-content-between align-items-center">
            <Span>Format:</Span>
            <OverlayTrigger placement="right" overlay={popoverCreateTournamentFormat}>
              <I className="fas fa-sm fa-question-circle"></I>
            </OverlayTrigger>
          </div>
          <div className="col pl-0">
            <Select name="format" onChange={onChange}>
              {competitionFormatsList.map((format, i) =>
                <option key={i}>{format} </option>
              )}
            </Select>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 pr-0 d-flex justify-content-between align-items-center">
            <Span>Knockout:</Span>
            <OverlayTrigger placement="right" overlay={popoverCreateTournamentKnockout}>
              <I className="fas fa-sm fa-question-circle"></I>
            </OverlayTrigger>
          </div>
          <div className="col pl-0">
            <Select name="knockout" onChange={onChange}>
              {KnockoutRoundsList.map((knockout, i) =>
                <option key={i}>{knockout} </option>
              )}
            </Select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-3 pr-0 d-flex justify-content-between align-items-center">
            <Span>Consolation:</Span>
            <OverlayTrigger placement="right" overlay={popoverCreateTournamentConsolation}>
              <I className="fas fa-sm fa-question-circle"></I>
            </OverlayTrigger>
          </div>
          <div className="col d-flex align-items-center">
            <CheckBoxWrapper>
              <CheckBox id="checkbox" name="consolation" type="checkbox" onChange={onChange} />
              <CheckBoxLabel htmlFor="checkbox" />
            </CheckBoxWrapper>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-dark border-0 mt-0">
        <div className="row">
          <div className="col text-right">
            <button className="btn btn-dark" 
              onClick={() => setShowModal(false)}
            >Cancel</button>
          </div>
          <div className="col pr-0">
            <button className="btn btn-warning font-weight-bold"
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

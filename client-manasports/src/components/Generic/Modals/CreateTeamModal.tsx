import React, { useState } from "react";
import {
  popoverCreateTournamentName,
  popoverCreateTournamentSport,
  popoverCreateTournamentCategory,
  popoverCreateTournamentAgeGroup,
  popoverCreateTournamentFormat,
  popoverCreateTournamentKnockout
} from '../../../utils/popoversUtils';
import styled from "styled-components";
import { Modal, OverlayTrigger } from "react-bootstrap";
import { localitiesList } from '../../../utils/listUtil';
import { createBrowserHistory } from "history";

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
  newTeamAction: any;
}

interface IPropsGLobal { }

const CreateTeamModal: React.FC<IProps & IPropsGLobal> = ({ showModal, setShowModal, newTeamAction }) => {

  const history = createBrowserHistory({});
  const path: any = history.location.pathname;
  let tournamentId = Number(path.split(["/"]).slice(-1)[0]);

  const initialState = {
    badge: null,
    name: '',
    locality: '',
    coach: '',
    coach2: '',
    contactEmail: '',
    contactPhone: '',
    TournamentId: tournamentId
  };

  const [newTeam, setNewTeam] = useState(initialState);

  const sendInfoNewTournament = () => {
    newTeamAction(newTeam);
    setShowModal(false);
  }

  const onChange = (e: any) => {
    let { name, value } = e.target;
    setNewTeam(prevState => ({ ...prevState, [name]: value }))
  }

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
        <i className="fas fa-lg fa-plus-circle"></i>
        <Modal.Title>
          CREATE TEAM
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
            <Input type="text" name="name" value={newTeam.name} onChange={onChange} />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 pr-0 d-flex justify-content-between align-items-center">
            <Span>Locality:</Span>
            <OverlayTrigger placement="right" overlay={popoverCreateTournamentSport}>
              <I className="fas fa-sm fa-question-circle"></I>
            </OverlayTrigger>
          </div>
          <div className="col pl-0">
            <Select name="locality" onChange={onChange}>
              {localitiesList.map((locality: any, index) =>
                <option value={locality} key={index}>{locality}</option>
              )}
            </Select>

          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 pr-0 d-flex justify-content-between align-items-center">
            <Span>Coach:</Span>
            <OverlayTrigger placement="right" overlay={popoverCreateTournamentCategory}>
              <I className="fas fa-sm fa-question-circle"></I>
            </OverlayTrigger>
          </div>
          <div className="col pl-0">
            <Input type="text" name="coach" value={newTeam.coach} onChange={onChange} />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 pr-0 d-flex justify-content-between align-items-center">
            <Span>Coach 2:</Span>
            <OverlayTrigger placement="right" overlay={popoverCreateTournamentAgeGroup}>
              <I className="fas fa-sm fa-question-circle"></I>
            </OverlayTrigger>
          </div>
          <div className="col pl-0">
            <Input type="text" name="coach2" value={newTeam.coach2} onChange={onChange} />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 pr-0 d-flex justify-content-between align-items-center">
            <Span>Email:</Span>
            <OverlayTrigger placement="right" overlay={popoverCreateTournamentFormat}>
              <I className="fas fa-sm fa-question-circle"></I>
            </OverlayTrigger>
          </div>
          <div className="col pl-0">
            <Input type="text" name="contactEmail" value={newTeam.contactEmail} onChange={onChange} />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 pr-0 d-flex justify-content-between align-items-center">
            <Span>Phone:</Span>
            <OverlayTrigger placement="right" overlay={popoverCreateTournamentKnockout}>
              <I className="fas fa-sm fa-question-circle"></I>
            </OverlayTrigger>
          </div>
          <div className="col pl-0">
            <Input type="text" name="contactPhone" value={newTeam.contactPhone} onChange={onChange} />
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

export default CreateTeamModal;

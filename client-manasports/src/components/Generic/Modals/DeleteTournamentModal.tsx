import React from "react";
import Modal from 'react-bootstrap/Modal';
import styled from "styled-components";

const IClose = styled.i`
  cursor: pointer;

  &:hover {
    color: grey;
  }
`;

const BodyModal = styled.div`
  line-height: 22px;
`;

//----------------------------------------------------

interface IProps {
  showModal: any;
  setShowModal: any;
  infoDeleteTournament: any;
  deleteTournamentAction: any;
}

interface IPropsGLobal { }

const DeleteTournamentModal: React.FC<IProps & IPropsGLobal> = ({ showModal, setShowModal, infoDeleteTournament, deleteTournamentAction }) => {

  const deleteTournamentAndClose = () => {
    deleteTournamentAction(infoDeleteTournament.id);
    setShowModal(false)
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="bg-danger text-white">
        <Modal.Title id="example-custom-modal-styling-title">
          Are you sure you want to delete it?
      </Modal.Title>
        <IClose className="fas fa-times" onClick={() => setShowModal(false)}></IClose>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <BodyModal>
          <p>
            The tournament <span className="text-warning">'{infoDeleteTournament.name}'</span> and all your data
        (equipment, statistics ...) will be permanently and irreversibly deleted.
        </p>
          <br />
          <p>
          Recommendation: If you have important information that you might need in the
        future (such as history of participating teams, or some other type of statistic),
        keep it.
        </p>
        </BodyModal>
      </Modal.Body>
      <Modal.Footer className="bg-dark text-white">
        <div className="row">
          <div className="col text-right">
            <button className="btn btn-dark"
              onClick={() => setShowModal(false)}
            >Cancel</button>
          </div>
          <div className="col pr-0">
            <button className="btn btn-danger"
              onClick={deleteTournamentAndClose}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTournamentModal;

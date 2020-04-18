import React from "react";
import Modal from 'react-bootstrap/Modal';

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
      <Modal.Header className="bg-danger text-white" closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          ¿Está seguro de eliminar esta liga?
      </Modal.Title>
        <button
          type="button"
          className="close"
          onClick={() => setShowModal(false)}
        >
        </button>
      </Modal.Header>
      <Modal.Body>
        La liga "<b>{infoDeleteTournament.name}</b>" y todos sus datos (equipos,
        estadísticas...) será eliminada de manera permanente e irreversible.
        <br /><br />
        <b>Recomendación:</b> Si tiene información importante que podría hacerle falta
        en un futuro(como historial de equipos participantes, o algún
        otro tipo de estadística), mantenla.
      </Modal.Body>
      <Modal.Footer>
        <div className="row">
          <div className="col text-right">
            <button className="btn btn-light"
              onClick={() => setShowModal(false)}
            >Cancelar</button>
          </div>
          <div className="col">
            <button className="btn btn-danger"
              onClick={deleteTournamentAndClose}
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTournamentModal;

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function TaskModel({show, onHide, title, desc}) {
  return (
    <Modal
      show = {show}
      onHide = {onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='modal-header'>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='modal-body'>
        {desc ? desc : "No description found, edit the task to add description"}
      </Modal.Body>
    </Modal>
  );
}




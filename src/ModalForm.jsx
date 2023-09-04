import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';

export default function ModalForm({show, onHide, title, desc, handleEdit}){
    const [formData, setFormData] = useState({
        title : title,
        desc : desc
    })

    useEffect(() => {
        setFormData({
          title: title,
          desc: desc
        });
      }, [title, desc]);

    const handleFormChange = (event) =>{
        setFormData(prevFormData =>{
            return(
                {...prevFormData,
                 [event.target.name] : event.target.value
                }
            )
        })
    }

    const handleFormSubmit = ()=>{
        handleEdit(formData, title)
        onHide()
    }

    return(
        <Modal
      show = {show}
      onHide = {onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='modal-header'>
        <Modal.Title id="contained-modal-title-vcenter">
          {formData.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input className="form-control" type="text" placeholder='enter task' name='title' value={formData.title} onChange={handleFormChange}/><br />
        <textarea className="form-control" placeholder="Enter description" name="desc" cols="5" rows="5" value={formData.desc} onChange={handleFormChange}></textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleFormSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
    )
}
import { Button ,Modal,ModalBody,} from 'reactstrap';
import React, { useEffect, useState }  from 'react';
import $ from 'jquery';
 const Confirmer=({handleValider,handleClose,show,titre,message,bouton})=> {
    //const [show, setShow] = useState(false);
  
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
  
   
    return (
      <>
    
        <Modal isOpen={show} toggle={handleClose} centered={true}>
          <Modal.Header >
            <Modal.Title>{titre}</Modal.Title>
          </Modal.Header>
        <ModalBody>{message}</ModalBody>
          <Modal.Footer>
            <button  class="btn btn-warning clsConf" onClick={handleClose}>
              Annuler
            </button>
            <button class="btn btn-danger" onClick={handleValider}>
              {bouton}
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
 export default Confirmer
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { useEffect, useState }  from 'react';
import $ from 'jquery';
 const Confirmer=(props)=> {
  const {
    handleValider,
    show,
    toggle
  } = props;

  // const [modal, setModal] = useState(false);

  // const toggle = () => setModal(!modal);
  
   
    return (
      <>
       {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      <Modal isOpen={show} toggle={toggle} >
        {/* <ModalHeader toggle={toggle}>Confirmation Suppression</ModalHeader> */}
        <ModalBody style={{textAlign:"center"}}>
         <h2>Voulez Vous Vraiment Supprimer?</h2>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleValider}>Supprimer</Button>{' '}
          <Button color="secondary" onClick={toggle}>Annuler</Button>
        </ModalFooter>
      </Modal>
      </>
    );
  }
  
 export default Confirmer
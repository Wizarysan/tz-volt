import React from 'react';
import Modal from 'react-responsive-modal';
import { Button } from 'react-bootstrap';

const DeleteCustomer = ({open, onCloseModal, onDeleteCustomer}) => {
    return (
        <Modal open={open} onClose={()=>{onCloseModal('deleteModal')}} center>
            <h3>Delete customer</h3>
            <p>Confirm Customer deletion?</p>
            <Button variant="danger" onClick={target=>{onDeleteCustomer(target)}}>Delete</Button>
            <Button variant="outline-primary" onClick={()=>{onCloseModal('deleteModal')}}>Cancel</Button>
        </Modal>
    );
}

export default DeleteCustomer;

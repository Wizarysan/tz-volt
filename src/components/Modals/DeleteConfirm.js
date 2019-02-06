import React from 'react';
import Modal from 'react-responsive-modal';
import { Button } from 'react-bootstrap';

const DeleteConfirm = ({title, open, onCloseModal, onDelete}) => {
    return (
        <Modal classNames={{modal: "modal-padded"}} open={open} onClose={()=>{onCloseModal('deleteModal')}} center>
            <h3>{title}</h3>
            <p>Confirm entry deletion?</p>
            <Button variant="danger" onClick={target=>{onDelete(target)}}>Delete</Button>
            <Button variant="outline-primary" onClick={()=>{onCloseModal('deleteModal')}}>Cancel</Button>
        </Modal>
    );
}

export default DeleteConfirm;

import React from 'react';
import PropTypes from 'prop-types';
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

DeleteConfirm.propTypes = {
    title: PropTypes.string,
    open: PropTypes.func,
    onCloseModal: PropTypes.func,
    onDelete: PropTypes.func,
}

export default DeleteConfirm;

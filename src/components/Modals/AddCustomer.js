import React from 'react';
import Modal from 'react-responsive-modal';
import { Button, Form } from 'react-bootstrap';

const AddCustomer = ({open, onCloseModal, onAddCustomer}) => {
    return (
        <Modal classNames={{modal: "modal-padded"}} open={open} onClose={()=>{onCloseModal('addModal')}} center>
            <h3>Add customer</h3>
            <Form className="modal-form" onSubmit={(e)=>{
                    e.preventDefault()
                    onAddCustomer(e.target);    
                }}>
                <Form.Group controlId="addFormName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter name" />
                </Form.Group>
                <Form.Group controlId="addFormAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" placeholder="Address" />
                </Form.Group>
                <Form.Group controlId="addFormPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" placeholder="Phone" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Modal>
    );
}

export default AddCustomer;

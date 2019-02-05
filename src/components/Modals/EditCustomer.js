import React from 'react';
import Modal from 'react-responsive-modal';
import { Button, Form } from 'react-bootstrap';

const EditCustomer = ({open, onCloseModal, onEditCustomerConfirm}) => {
    return (
        <Modal open={open} onClose={()=>{onCloseModal('editModal')}} center>
        <h3>Edit customer</h3>
        <Form onSubmit={(e)=>{
                e.preventDefault()
                onEditCustomerConfirm(e.target);    
            }} id="editForm">
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter name" />
            </Form.Group>
            <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" placeholder="Address" />
            </Form.Group>
            <Form.Group controlId="formPhone">
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

export default EditCustomer;

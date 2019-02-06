import React from 'react';
import Modal from 'react-responsive-modal';
import { Button, Form } from 'react-bootstrap';

const EditProduct = ({open, onCloseModal, onEditProductConfirm}) => {
    return (
        <Modal open={open} onClose={()=>{onCloseModal('editModal')}} center>
        <h3>Edit product</h3>
        <Form onSubmit={(e)=>{
                e.preventDefault()
                onEditProductConfirm(e.target);    
            }} id="editForm">
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter name" />
            </Form.Group>
            <Form.Group controlId="addFormPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" name="price" placeholder="Price" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </Modal>
    );
}

export default EditProduct;

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import { Button, Form } from 'react-bootstrap';

const AddProduct = ({open, onCloseModal, onAddProduct}) => {
    return (
        <Modal classNames={{modal: "modal-padded"}} open={open} onClose={()=>{onCloseModal('addModal')}} center>
            <h3>Add product</h3>
            <Form className="modal-form" onSubmit={(e)=>{
                    e.preventDefault()
                    onAddProduct(e.target);    
                }}>
                <Form.Group controlId="addFormName">
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

AddProduct.propTypes = {
    open: PropTypes.func,
    onCloseModal: PropTypes.func,
    onAddProduct: PropTypes.func,
}

export default AddProduct;
